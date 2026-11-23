import { Point } from "../entities/Point.js";
import { Tetrahedron } from "../entities/Tetrahedron.js";
import { Shape } from "../entities/Shape.js";
import { ShapeFactory } from "./ShapeFactory.js";
import { InputDataError } from "../errors/InputDataError.js";

export class TetrahedronFactory extends ShapeFactory {
  createShape(values: number[]): Shape {
    if (values.length !== 12) {
      throw new InputDataError(
        "Tetrahedron requires exactly 12 coordinates",
      );
    }

    return new Tetrahedron(
      new Point(values[0], values[1], values[2]),
      new Point(values[3], values[4], values[5]),
      new Point(values[6], values[7], values[8]),
      new Point(values[9], values[10], values[11]),
    );
  }
}