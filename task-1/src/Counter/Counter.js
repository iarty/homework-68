import React, { Component } from "react";
import "./Counter.css";
import { connect } from "react-redux";
import {
  addCounter,
  decrementCounter,
  incrementCounter,
  subtract,
  fetchCounter
} from "../store/actions";
import Spinner from "../components/UI/Spinner/Spinner";

class Counter extends Component {
  componentDidMount() {
    this.props.fetchCounter();
  }

  render() {
    return this.props.loader ? (
      <Spinner />
    ) : this.props.error ? (
      <div className="Counter">
        <h1>Error!!</h1>
      </div>
    ) : (
      <div className="Counter">
        <h1>{this.props.counter}</h1>
        <button onClick={this.props.increaseCounter}>Increase</button>
        <button onClick={this.props.decreaseCounter}>Decrease</button>
        <button onClick={this.props.addCounter}>Increase by 5</button>
        <button onClick={this.props.subtractCounter}>Decrease by 5</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter,
    loader: state.loader,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increaseCounter: () => dispatch(incrementCounter()),
    decreaseCounter: () => dispatch(decrementCounter()),
    addCounter: () => dispatch(addCounter(5)),
    subtractCounter: () => dispatch(subtract(5)),
    fetchCounter: () => dispatch(fetchCounter())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
