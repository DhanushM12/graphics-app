import React from "react";
import { Layer, Stage } from "react-konva"; //drawing complex canvas graphics using React
import { useShapes, createRectangle } from "../store";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "../actions";

function Canvas() {
  return (
    <main className="canvas">
      <Stage width={window.innerWidth - 400} height={window.innerHeight}>
        <Layer />
      </Stage>
    </main>
  );
}

export default Canvas;
