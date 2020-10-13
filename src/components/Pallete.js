import React from "react";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "../actions";

//to handle the drag of rectangle
const handleDragStart = (event) => {
  const type = event.target.dataset.shape;

  if (type) {
    // x,y coordinates of the mouse pointer relative to the position of the padding edge of the target node
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    // dimensions of the node on the browser
    const clientWidth = event.target.clientWidth;
    const clientHeight = event.target.clientHeight;

    const dragPayload = JSON.stringify({
      type,
      offsetX,
      offsetY,
      clientWidth,
      clientHeight,
    });

    event.nativeEvent.dataTransfer.setData(DRAG_DATA_KEY, dragPayload);
  }
};

function Pallete() {
  return (
    <aside className="pallete">
      <h2>Shape</h2>
      <div
        className="shape"
        data-shape={SHAPE_TYPES.RECT}
        draggable
        onDragStart={handleDragStart}
      />
    </aside>
  );
}

export default Pallete;
