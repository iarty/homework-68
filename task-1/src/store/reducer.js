import {
  INCREMENT,
  DECREMENT,
  ADD,
  SUBTRACT,
  FETCH_COUNTER_SUCCESS,
  FETCH_COUNTER_REQUEST,
  FETCH_COUNTER_ERROR
} from "./actions.js";

const initialState = {
  counter: 0,
  loader: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case DECREMENT:
      return { ...state, counter: state.counter - 1 };
    case ADD:
      return { ...state, counter: state.counter + action.amount };
    case SUBTRACT:
      return { ...state, counter: state.counter - action.amount };
    case FETCH_COUNTER_REQUEST:
      return { ...state, loader: true };
    case FETCH_COUNTER_SUCCESS:
      return { ...state, counter: action.counter, loader: false };
    case FETCH_COUNTER_ERROR:
      return { ...state, error: action.error, loader: false };
    default:
      return state;
  }
};

export default reducer;
