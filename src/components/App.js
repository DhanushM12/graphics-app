import React from "react";
import Pallete from "./Pallete";
import Canvas from "./Canvas";
import Properties from "./Properties";

function App() {
  return (
    <div className="App">
      <h1>Design a rectangle</h1>
      <Pallete />
      <Canvas />
      <Properties />
    </div>
  );
}

export default App;
