import React, {Component, Fragment} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 5,
  cheese: 20,
  meat: 50,
  bacon: 30
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 20,
    purchasable: false,
    purchasing: false,
  };

  addIngredientHandler = type => {
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type]++;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] === 0) {
      return;
    }

    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type]--;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;

    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients) // ['bacon', 'salad', 'meat', 'cheese']
      .map(igKey => ingredients[igKey])  // [ 1, 2, 0, 3]
      .reduce((sum, el) => sum + el, 0); // 6

    this.setState({purchasable: sum > 0});
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  componentDidMount() {
    console.log(this.props);
  }

  purchaseContinueHandler = () => {
    const queryParams = Object.keys(this.state.ingredients).map(ingName => {
      return encodeURIComponent(ingName) + '=' +
             encodeURIComponent(this.state.ingredients[ingName]);
    });

    queryParams.push('price=' + this.state.totalPrice);

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render() {
    const disabledInfo = {...this.state.ingredients};

    Object.keys(disabledInfo).forEach(key => {
      disabledInfo[key] = disabledInfo[key] === 0
    });

    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          purchasable={this.state.purchasable}
          purchaseHandler={this.purchaseHandler}
        />
        <Modal
          show={this.state.purchasing}
          close={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseContinueHandler={this.purchaseContinueHandler}
            purchaseCancelHandler={this.purchaseCancelHandler}
          />
        </Modal>
      </Fragment>
    )
  }
}

export default BurgerBuilder;
