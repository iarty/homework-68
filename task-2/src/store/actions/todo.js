import {
  ADD_NEW_TODO,
  CHANGE_TODO,
  FETCH_TODO_ERROR,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  REMOVE_TODO
} from "./actionTypes";
import axiosTodo from "../../axiosTodo";

export const fetchTodoRequest = () => {
  return {
    type: FETCH_TODO_REQUEST
  };
};
export const fetchTodoSuccess = todo => {
  return {
    type: FETCH_TODO_SUCCESS,
    payload: todo
  };
};
export const fetchTodoError = error => {
  return {
    type: FETCH_TODO_ERROR,
    error
  };
};

export const fetchingTodos = () => {
  return async dispatch => {
    dispatch(fetchTodoRequest());
    try {
      const response = await axiosTodo("/todos.json");
      if (response.data) {
        const data = Object.keys(response.data).map(el => ({
          id: el,
          ...response.data[el]
        }));
        dispatch(fetchTodoSuccess(data));
      }
    } catch (e) {
      dispatch(fetchTodoError(e));
    }
  };
};

export const postNewTodo = (event, value) => {
  event.preventDefault();
  return async dispatch => {
    dispatch(fetchTodoRequest());
    try {
      const todo = {
        title: value,
        isCompleted: false
      };
      const response = await axiosTodo.post("/todos.json", todo);
      dispatch({
        type: ADD_NEW_TODO,
        payload: { ...todo, id: response.data.name }
      });
    } catch (error) {
      dispatch(fetchTodoError(error));
    }
  };
};

export const changeTodo = (id, title, isCompleted) => {
  return async dispatch => {
    try {
      await axiosTodo.patch(`/todos/${id}.json`, {
        isCompleted: !isCompleted,
        title: title
      });
      dispatch({ type: CHANGE_TODO, id });
    } catch (e) {
      dispatch(fetchTodoError(e));
    }
  };
};

export const removeTodo = id => {
  return async dispatch => {
    try {
      await axiosTodo.delete(`/todos/${id}.json`);
      dispatch({ type: REMOVE_TODO, id });
    } catch (e) {
      dispatch(fetchTodoError(e));
    }
  };
};
