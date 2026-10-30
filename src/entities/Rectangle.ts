
import { Point } from "./Point.js";

export class Rectangle {
  constructor(
    public readonly firstPoint: Point,
    public readonly secondPoint: Point,
    public readonly thirdPoint: Point,
  ) {}

  private getSides(): { sideA: Point; sideB: Point } {
    return {
      sideA: this.firstPoint.subtract(this.secondPoint),
      sideB: this.thirdPoint.subtract(this.secondPoint),
    };
  }

  area(): number {
    const { sideA, sideB } = this.getSides();

    return Math.abs(sideA.x * sideB.y - sideA.y * sideB.x);
  }

  perimeter(): number {
    const { sideA, sideB } = this.getSides();

    const lengthA = Math.hypot(sideA.x, sideA.y);
    const lengthB = Math.hypot(sideB.x, sideB.y);

    return 2 * (lengthA + lengthB);
  }

  isValid(): boolean {
    const { sideA, sideB } = this.getSides();

    const lengthA = Math.hypot(sideA.x, sideA.y);
    const lengthB = Math.hypot(sideB.x, sideB.y);

    const dotProduct = sideA.x * sideB.x + sideA.y * sideB.y;

    return (
      lengthA > 0 &&
      lengthB > 0 &&
      Math.abs(dotProduct) < 1e-10
    );
  }

  fourthPoint(): Point {
    return this.firstPoint
      .add(this.thirdPoint)
      .subtract(this.secondPoint);
  }

  isConvex(): boolean {
    return this.isValid() && this.area() > 0;
  }

  isSquare(): boolean {
    const { sideA, sideB } = this.getSides();

    return (
      this.isValid() &&
      Math.abs(
        Math.hypot(sideA.x, sideA.y) -
        Math.hypot(sideB.x, sideB.y),
      ) < 1e-10
    );
  }

  isRhombus(): boolean {
    return this.isSquare();
  }

  isTrapezoid(): boolean {
    // При строгом определении трапеция имеет ровно одну пару
    // параллельных сторон. У прямоугольника таких пар две.
    return false;
  }
}
