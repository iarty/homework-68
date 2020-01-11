import React from "react";
import Btn from "../Btn/Btn";

const TodoItem = ({ title, checked, complete, deleteTodo }) => {
  return (
    <li className="collection-item d-flex justify-content-between align-items-center">
      <span style={checked ? { textDecoration: "line-through" } : null}>
        {title}
      </span>
      <div>
        <Btn onClick={complete} type="check" />
        <Btn onClick={deleteTodo} type="delete" />
      </div>
    </li>
  );
};
export default TodoItem;
