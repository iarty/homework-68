import axios from "../axios-orders";

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const ADD = "ADD";
export const SUBTRACT = "SUBTRACT";

export const FETCH_COUNTER_REQUEST = "FETCH_COUNTER_REQUEST";
export const FETCH_COUNTER_SUCCESS = "FETCH_COUNTER_SUCCESS";
export const FETCH_COUNTER_ERROR = "FETCH_COUNTER_ERROR";

export const fetchCounterRequest = () => {
  return { type: FETCH_COUNTER_REQUEST };
};

export const fetchCounterSuccess = counter => {
  return { type: FETCH_COUNTER_SUCCESS, counter };
};

export const fetchCounterError = error => {
  return { type: FETCH_COUNTER_ERROR, error };
};

export const fetchCounter = () => {
  return dispatch => {
    dispatch(fetchCounterRequest());
    axios.get("/counter.json").then(
      response => {
        const data = Object.keys(response.data || {}).map(
          el => response.data[el]
        );
        dispatch(fetchCounterSuccess(data[data.length - 1]));
      },
      error => {
        dispatch(fetchCounterError(error));
      }
    );
  };
};

export const postCounter = () => {
  return (dispatch, getState) => {
    const counter = getState().counter;
    dispatch(fetchCounterRequest());
    try {
      axios.post("/counter.json", counter);
      dispatch(fetchCounterSuccess(counter));
    } catch (error) {
      dispatch(fetchCounterError(error));
    }
  };
};

export const increment = () => {
  return { type: INCREMENT };
};

export const decrement = () => {
  return { type: DECREMENT };
};

export const add = amount => {
  return { type: ADD, amount };
};

export const sub = amount => {
  return { type: SUBTRACT, amount };
};

export const incrementCounter = () => {
  return dispatch => {
    dispatch(increment());
    dispatch(postCounter());
  };
};

export const decrementCounter = () => {
  return dispatch => {
    dispatch(decrement());
    dispatch(postCounter());
  };
};

export const addCounter = amount => {
  return dispatch => {
    dispatch(add(amount));
    dispatch(postCounter());
  };
};

export const subtract = amount => {
  return dispatch => {
    dispatch(sub(amount));
    dispatch(postCounter());
  };
};
