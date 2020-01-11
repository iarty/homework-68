import {
  ADD_NEW_TODO,
  CHANGE_TODO,
  CREATE_NEW_TODO,
  FETCH_TODO_ERROR,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  REMOVE_TODO
} from "../actions/actionTypes";

const initialState = {
  todos: [],
  todo: {},
  loader: false,
  error: null
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_TODO:
      return { ...state, todo: action };
    case ADD_NEW_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case CHANGE_TODO:
      return {
        ...state,
        todos: state.todos.map(el =>
          el.id === action.id ? { ...el, isCompleted: !el.isCompleted } : el
        )
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(el => el.id !== action.id)
      };
    case FETCH_TODO_REQUEST:
      return { ...state, loader: true };
    case FETCH_TODO_SUCCESS:
      return { ...state, todos: action.payload, loader: false };
    case FETCH_TODO_ERROR:
      return { ...state, error: action.error, loader: false };
    default:
      return state;
  }
};
