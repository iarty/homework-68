import React from 'react';
import './BuildControls.css';
import BuildControl from "./BuildControl/BuildControl";

const ingredients = [
  {type: 'salad'},
  {type: 'bacon'},
  {type: 'cheese'},
  {type: 'meat'},
];

const BuildControls = props => {
  return (
    <div className="BuildControls">
      {ingredients.map(ing => (
        <BuildControl
          key={ing.type}
          type={ing.type}
          added={() => props.ingredientAdded(ing.type)}
          removed={() => props.ingredientRemoved(ing.type)}
          disabled={props.disabledInfo[ing.type]}
        />
      ))}
      <button
        className="OrderButton"
        disabled={!props.purchasable}
        onClick={props.purchaseHandler}
      >
        ORDER NOW
      </button>
    </div>
  )
};

export default BuildControls;