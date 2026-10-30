
import { Point } from "../src/entities/Point.js";
import { Rectangle } from "../src/entities/Rectangle.js";

describe("Point", () => {
  test("subtracts two points", () => {
    const result = new Point(4, 0, 0).subtract(new Point(0, 0, 0));

    expect(result.x).toBe(4);
    expect(result.y).toBe(0);
    expect(result.z).toBe(0);
  });

  test("calculates dot product", () => {
    const result = new Point(1, 2, 3).dotProduct(
      new Point(4, 5, 6),
    );

    expect(result).toBe(32);
  });

  test("checks perpendicular vectors", () => {
    const first = new Point(4, 0, 0);
    const second = new Point(0, 3, 0);

    expect(first.isPerpendicular(second)).toBe(true);
    expect(first.isPerpendicular(new Point(2, 0, 0))).toBe(false);
  });

  test("adds two points", () => {
    const result = new Point(1, 2, 0).add(new Point(3, 4, 0));

    expect(result.x).toBe(4);
    expect(result.y).toBe(6);
    expect(result.z).toBe(0);
  });
});

describe("Rectangle", () => {
  test("calculates area", () => {
    const rectangle = new Rectangle(
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
    );

    expect(rectangle.area()).toBe(12);
    expect(rectangle.isValid()).toBe(true);
  });

  test("calculates perimeter", () => {
    const rectangle = new Rectangle(
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
    );

    expect(rectangle.perimeter()).toBe(14);
    expect(rectangle.area()).toBe(12);
  });

  test("rejects a rectangle with a zero-length side", () => {
    const rectangle = new Rectangle(
      new Point(0, 0),
      new Point(0, 0),
      new Point(0, 3),
    );

    expect(rectangle.isValid()).toBe(false);
    expect(rectangle.area()).toBe(0);
  });

  test("identifies a square", () => {
    const square = new Rectangle(
      new Point(0, 0),
      new Point(2, 0),
      new Point(2, 2),
    );

    expect(square.isSquare()).toBe(true);
    expect(square.isValid()).toBe(true);
  });

  test("does not identify a non-square as a square", () => {
    const rectangle = new Rectangle(
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
    );

    expect(rectangle.isSquare()).toBe(false);
    expect(rectangle.isValid()).toBe(true);
  });

  test("identifies a square as a rhombus", () => {
    const square = new Rectangle(
      new Point(0, 0),
      new Point(2, 0),
      new Point(2, 2),
    );

    expect(square.isRhombus()).toBe(true);
    expect(square.isSquare()).toBe(true);
  });

  test("does not identify a non-square rectangle as a rhombus", () => {
    const rectangle = new Rectangle(
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
    );

    expect(rectangle.isRhombus()).toBe(false);
    expect(rectangle.isSquare()).toBe(false);
  });

  test("does not identify a rectangle as a strict trapezoid", () => {
    const rectangle = new Rectangle(
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
    );

    expect(rectangle.isTrapezoid()).toBe(false);
    expect(rectangle.isValid()).toBe(true);
  });
});
