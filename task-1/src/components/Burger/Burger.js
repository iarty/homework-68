import React from 'react';
import './Burger.css';
import Ingredient from "./Ingredient/Ingredient";

const Burger = props => {
  let ingredients = [];

  Object.keys(props.ingredients).forEach(ingKey => {
    let amount = props.ingredients[ingKey];
    for (let i = 0; i < amount; i++) {
      ingredients.push(<Ingredient key={ingKey + i} type={ingKey} />);
    }
  });

  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className="Burger">
      <Ingredient type="bread-top" />
      {ingredients}
      <Ingredient type="bread-bottom" />
    </div>
  )
};

export default Burger;