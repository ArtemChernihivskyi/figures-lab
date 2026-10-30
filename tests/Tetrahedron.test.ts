
import { Point } from "../src/entities/Point.js";
import { Tetrahedron } from "../src/entities/Tetrahedron.js";

describe("Tetrahedron", () => {
  const tetrahedron = new Tetrahedron(
    new Point(0, 0, 0),
    new Point(2, 0, 0),
    new Point(0, 2, 0),
    new Point(0, 0, 2),
  );

  test("calculates volume", () => {
    expect(tetrahedron.volume()).toBeCloseTo(4 / 3);
    expect(tetrahedron.isValid()).toBe(true);
  });

  test("calculates surface area", () => {
    expect(tetrahedron.surfaceArea()).toBeCloseTo(
      6 + 2 * Math.sqrt(3),
    );
    expect(tetrahedron.surfaceArea()).toBeGreaterThan(0);
  });

  test("checks base on XY plane", () => {
    expect(tetrahedron.hasBaseOnXYPlane()).toBe(true);
    expect(tetrahedron.isValid()).toBe(true);
  });

  test("rejects degenerate tetrahedron", () => {
    const invalid = new Tetrahedron(
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(2, 0, 0),
      new Point(3, 0, 0),
    );

    expect(invalid.isValid()).toBe(false);
    expect(invalid.volume()).toBe(0);
  });
   test("calculates volume ratio after cutting by XY plane", () => {
    const cutTetrahedron = new Tetrahedron(
      new Point(0, 0, 2),
      new Point(0, 0, -1),
      new Point(1, 0, -1),
      new Point(0, 1, -1),
    );

    const result = cutTetrahedron.volumeRatioAfterCut("XY");

    if (result === null) {
      throw new Error("Expected the plane to split the tetrahedron");
    }

    expect(result.firstPart).toBeCloseTo(8 / 27);
    expect(result.secondPart).toBeCloseTo(19 / 27);
  });
    test("calculates volume ratio when two vertices are on each side", () => {
    const splitTetrahedron = new Tetrahedron(
      new Point(0, 0, 1),
      new Point(1, 0, 1),
      new Point(0, 1, -1),
      new Point(0, 0, -1),
    );

    const result = splitTetrahedron.volumeRatioAfterCut("XY");

    if (result === null) {
      throw new Error("Expected the plane to split the tetrahedron");
    }

    expect(result.firstPart).toBeCloseTo(0.5);
    expect(result.secondPart).toBeCloseTo(0.5);
    expect(result.firstPart + result.secondPart).toBeCloseTo(1);
  });
});
