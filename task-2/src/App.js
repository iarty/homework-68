import React from "react";
import "materialize-css";
import Todo from "./containers/Todo/Todo";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Todo />
    </div>
  );
};

export default App;
