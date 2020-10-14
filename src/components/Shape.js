import React, { useCallback } from "react";
import { SHAPE_TYPES } from "../actions";
import { useShapes } from "../store";
import { Rectangle } from "./Rectangle";
export function Shape({ shape }) {
  const isSelectedSelector = useCallback(
    (state) => state.selected === shape.id,
    [shape]
  );
  const isSelected = useShapes(isSelectedSelector);

  if (shape.type === SHAPE_TYPES.RECT) {
    return <Rectangle {...shape} isSelected={isSelected} />;
  }

  return null;
}
