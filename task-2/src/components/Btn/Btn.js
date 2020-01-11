import React, { Fragment } from "react";

const Btn = ({ onClick, type }) => {
  return (
    <Fragment>
      <i
        className="tiny material-icons"
        onClick={onClick}
        style={
          type === "delete"
            ? { marginLeft: "1rem", cursor: "pointer" }
            : { cursor: "pointer" }
        }
      >
        {type}
      </i>
    </Fragment>
  );
};

export default Btn;
