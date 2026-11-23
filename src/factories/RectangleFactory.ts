import { Point } from "../entities/Point.js";
import { Rectangle } from "../entities/Rectangle.js";
import { Shape } from "../entities/Shape.js";
import { ShapeFactory } from "./ShapeFactory.js";
import { InputDataError } from "../errors/InputDataError.js";

export class RectangleFactory extends ShapeFactory {
  createShape(values: number[]): Shape {
    if (values.length !== 6) {
      throw new InputDataError(
        "Rectangle requires exactly 6 coordinates",
      );
    }

    return new Rectangle(
      new Point(values[0], values[1]),
      new Point(values[2], values[3]),
      new Point(values[4], values[5]),
    );
  }
}