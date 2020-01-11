import React, {Component} from 'react';
import axiosOrders from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderItem from "../../components/Order/OrderItem/OrderItem";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const response = await axiosOrders.get('/orders.json');

      if (!response.data) {
        return this.setState({loading: false});
      }

      const orders = Object.keys(response.data).map(id => {
        return {...response.data[id], id};
      });

      this.setState({orders, loading: false});
    } catch {
      this.setState({loading: false});
    }
  }

  render() {
    let orders = <Spinner/>;

    if (!this.state.loading) {
      orders = this.state.orders.reverse().map(order => (
          <ErrorBoundary key={order.id}>
            <OrderItem
                ingredients={order.ingredients}
                price={order.price}
            />
          </ErrorBoundary>
      ));
    }

    if (orders.length === 0) {
      orders = <p>No orders!</p>
    }

    return orders;
  }
}

export default withErrorHandler(Orders, axiosOrders);
