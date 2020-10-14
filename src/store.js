import { createStore } from "@halka/state"; //lightweight global state solution for react with zero external dependencies and clean hooks API
import produce from "immer"; //Create the next immutable state tree by simply modifying the current tree
import { nanoid } from "nanoid"; //tiny, secure, URL-friendly, unique string ID generator for JavaScript
import clamp from "clamp"; //a value between two other values
import { SHAPE_TYPES, DEFAULTS, LIMITS } from "./actions";

const baseState = {
  selected: null,
  shapes: {},
};

export const useShapes = createStore(baseState);
const setState = (fn) => useShapes.set(produce(fn));

export const createRectangle = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.RECT,
      width: DEFAULTS.RECT.WIDTH,
      height: DEFAULTS.RECT.HEIGHT,
      fill: DEFAULTS.RECT.FILL,
      stroke: DEFAULTS.RECT.STROKE,
      rotation: DEFAULTS.RECT.ROTATION,
      x,
      y,
    };
  });
};

export const selectShape = (id) => {
  setState((state) => {
    state.selected = id;
  });
};

export const clearSelection = () => {
  setState((state) => {
    state.selected = null;
  });
};

export const moveShape = (id, event) => {
  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = event.target.x();
      shape.y = event.target.y();
    }
  });
};
export const transformRectangleShape = (node, id, event) => {
  // transformer is changing scale of the node
  // and NOT its width or height
  // but in the store we have only width and height
  // to match the data better we will reset scale on transform end
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  // we will reset the scale back
  node.scaleX(1);
  node.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = node.x();
      shape.y = node.y();

      shape.rotation = node.rotation();

      shape.width = clamp(
        // increase the width in order of the scale
        node.width() * scaleX,
        // should not be less than the minimum width
        LIMITS.RECT.MIN,
        // should not be more than the maximum width
        LIMITS.RECT.MAX
      );
      shape.height = clamp(
        node.height() * scaleY,
        LIMITS.RECT.MIN,
        LIMITS.RECT.MAX
      );
    }
  });
};
