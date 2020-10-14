import { createStore } from "@halka/state"; //lightweight global state solution for react with zero external dependencies and clean hooks API
import produce from "immer"; //Create the next immutable state tree by simply modifying the current tree
import { nanoid } from "nanoid"; //tiny, secure, URL-friendly, unique string ID generator for JavaScript
import { SHAPE_TYPES, DEFAULTS } from "./actions";

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
