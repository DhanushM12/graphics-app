import { createStore } from "@halka/state"; //lightweight global state solution for react with zero external dependencies and clean hooks API
import produce from "immer"; //Create the next immutable state tree by simply modifying the current tree

import { SHAPE_TYPES, DEFAULTS } from "./actions";

const initialState = {
  selected: null,
  shapes: {},
};

export const useShapes = createStore(initialState);
const setState = (fn) => useShapes.set(produce(fn));
