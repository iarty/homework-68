import React, { useState } from "react";

const InputTodo = ({ add }) => {
  const [value, setValue] = useState("");

  const valueChanger = e => {
    setValue(e.target.value);
  };

  const onSubmit = (event, value) => {
    add(event, value);
    setValue("");
  };

  return (
    <form
      className="input-group mb-3"
      onSubmit={event => onSubmit(event, value)}
    >
      <input
        type="text"
        className="form-control"
        placeholder="text"
        aria-label="Recipient's username"
        onChange={valueChanger}
        value={value}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default InputTodo;
