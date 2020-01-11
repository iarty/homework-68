import React, { Component } from "react";
import TodoItem from "../../components/TodoItem/TodoItem";
import InputTodo from "../../components/InputTodo/InputTodo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchingTodos,
  postNewTodo,
  removeTodo,
  changeTodo
} from "../../store/actions/todo";

class Todo extends Component {
  componentDidMount() {
    this.props.fetchingTodos();
  }

  render() {
    return this.props.error ? (
      <div className="container">
        <h1 className="text-center mt-5">Error!!!</h1>
      </div>
    ) : (
      <div className="container">
        <h1 className="mt-5">TODO</h1>
        <InputTodo add={this.props.postNewTodo} />
        {this.props.todos.length ? (
          <ul className="collection">
            {this.props.todos.map(todo => (
              <TodoItem
                key={todo.id}
                checked={todo.isCompleted}
                title={todo.title}
                complete={() =>
                  this.props.changeTodo(todo.id, todo.title, todo.isCompleted)
                }
                deleteTodo={() => this.props.removeTodo(todo.id)}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center font-weight-bold">No todos</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  todo: state.todo,
  loading: state.loading,
  error: state.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { fetchingTodos, postNewTodo, changeTodo, removeTodo },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
