import React, {Fragment} from 'react';
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{' '}
        {props.ingredients[igKey]}
      </li>
    ));

  return (
    <Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total Price: {props.price} KGS</strong></p>
      <p>Continue to checkout?</p>
      <Button
        onClick={props.purchaseCancelHandler}
        type="Danger"
      >CANCEL</Button>
      <Button
        onClick={props.purchaseContinueHandler}
        type="Success"
      >CONTINUE</Button>
    </Fragment>
  );
};

export default OrderSummary;