import { Point } from "../entities/Point.js";
import { Rectangle } from "../entities/Rectangle.js";

export class RectangleFactory {
  createRectangle(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
  ): Rectangle {
    return new Rectangle(
      new Point(x1, y1),
      new Point(x2, y2),
      new Point(x3, y3),
    );
  }
}