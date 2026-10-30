
import { Point } from "./Point.js";

export class Tetrahedron {
  constructor(
    public readonly firstPoint: Point,
    public readonly secondPoint: Point,
    public readonly thirdPoint: Point,
    public readonly fourthPoint: Point,
  ) {}

  private triangleArea(a: Point, b: Point, c: Point): number {
    const ab = a.subtract(b);
    const ac = a.subtract(c);

    const crossX = ab.y * ac.z - ab.z * ac.y;
    const crossY = ab.z * ac.x - ab.x * ac.z;
    const crossZ = ab.x * ac.y - ab.y * ac.x;

    return Math.sqrt(
      crossX ** 2 + crossY ** 2 + crossZ ** 2,
    ) / 2;
  }

  volume(): number {
    const a = this.secondPoint.subtract(this.firstPoint);
    const b = this.thirdPoint.subtract(this.firstPoint);
    const c = this.fourthPoint.subtract(this.firstPoint);

    const crossX = b.y * c.z - b.z * c.y;
    const crossY = b.z * c.x - b.x * c.z;
    const crossZ = b.x * c.y - b.y * c.x;

    const determinant =
      a.x * crossX +
      a.y * crossY +
      a.z * crossZ;

    return Math.abs(determinant) / 6;
  }

  surfaceArea(): number {
    return (
      this.triangleArea(this.firstPoint, this.secondPoint, this.thirdPoint) +
      this.triangleArea(this.firstPoint, this.secondPoint, this.fourthPoint) +
      this.triangleArea(this.firstPoint, this.thirdPoint, this.fourthPoint) +
      this.triangleArea(this.secondPoint, this.thirdPoint, this.fourthPoint)
    );
  }

  isValid(): boolean {
    return this.volume() > 0;
  }

  hasBaseOnXYPlane(): boolean {
    return (
      this.firstPoint.z === 0 &&
      this.secondPoint.z === 0 &&
      this.thirdPoint.z === 0
    );
  }

  hasBaseOnXZPlane(): boolean {
    return (
      this.firstPoint.y === 0 &&
      this.secondPoint.y === 0 &&
      this.thirdPoint.y === 0
    );
  }

  hasBaseOnYZPlane(): boolean {
    return (
      this.firstPoint.x === 0 &&
      this.secondPoint.x === 0 &&
      this.thirdPoint.x === 0
    );
  }

  volumeRatioAfterCut(
    plane: "XY" | "XZ" | "YZ",
  ): { firstPart: number; secondPart: number } | null {
    const EPSILON = 1e-10;

    const points = [
      this.firstPoint,
      this.secondPoint,
      this.thirdPoint,
      this.fourthPoint,
    ];

    const getCoordinate = (point: Point): number => {
      if (plane === "XY") return point.z;
      if (plane === "XZ") return point.y;
      return point.x;
    };

    const positiveCount = points.filter(
      (point) => getCoordinate(point) > EPSILON,
    ).length;

    const negativeCount = points.filter(
      (point) => getCoordinate(point) < -EPSILON,
    ).length;

    if (positiveCount === 0 || negativeCount === 0) {
      return null;
    }

    const samePoint = (a: Point, b: Point): boolean =>
      Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < EPSILON;

    const uniquePoints = (vertices: Point[]): Point[] =>
      vertices.filter(
        (point, index) =>
          vertices.findIndex((other) => samePoint(point, other)) === index,
      );

    const faces: Point[][] = [
      [points[0], points[1], points[2]],
      [points[0], points[1], points[3]],
      [points[0], points[2], points[3]],
      [points[1], points[2], points[3]],
    ];

    const getIntersection = (a: Point, b: Point): Point => {
      const coordinateA = getCoordinate(a);
      const coordinateB = getCoordinate(b);
      const ratio = coordinateA / (coordinateA - coordinateB);

      return new Point(
        a.x + ratio * (b.x - a.x),
        a.y + ratio * (b.y - a.y),
        a.z + ratio * (b.z - a.z),
      );
    };

    const calculateClippedVolume = (keepPositive: boolean): number => {
      const intersections: Point[] = [];

      const clipFace = (face: Point[]): Point[] => {
        const result: Point[] = [];

        for (let index = 0; index < face.length; index += 1) {
          const current = face[index];
          const next = face[(index + 1) % face.length];

          const currentValue = getCoordinate(current);
          const nextValue = getCoordinate(next);

          const currentInside = keepPositive
            ? currentValue >= -EPSILON
            : currentValue <= EPSILON;

          if (currentInside) {
            result.push(current);
          }

          if (
            (currentValue > EPSILON && nextValue < -EPSILON) ||
            (currentValue < -EPSILON && nextValue > EPSILON)
          ) {
            const intersection = getIntersection(current, next);
            result.push(intersection);
            intersections.push(intersection);
          }
        }

        return uniquePoints(result);
      };

      const clippedFaces = faces
        .map(clipFace)
        .filter((face) => face.length >= 3);

      const cutPoints = uniquePoints([
        ...points.filter(
          (point) => Math.abs(getCoordinate(point)) <= EPSILON,
        ),
        ...intersections,
      ]);

      if (cutPoints.length >= 3) {
        const cutCenter = new Point(
          cutPoints.reduce((sum, point) => sum + point.x, 0) / cutPoints.length,
          cutPoints.reduce((sum, point) => sum + point.y, 0) / cutPoints.length,
          cutPoints.reduce((sum, point) => sum + point.z, 0) / cutPoints.length,
        );

        const getAngle = (point: Point): number => {
          if (plane === "XY") {
            return Math.atan2(
              point.y - cutCenter.y,
              point.x - cutCenter.x,
            );
          }

          if (plane === "XZ") {
            return Math.atan2(
              point.z - cutCenter.z,
              point.x - cutCenter.x,
            );
          }

          return Math.atan2(
            point.z - cutCenter.z,
            point.y - cutCenter.y,
          );
        };

        cutPoints.sort((a, b) => getAngle(a) - getAngle(b));
        clippedFaces.push(cutPoints);
      }

      const vertices = uniquePoints(clippedFaces.flat());

      if (vertices.length < 4) {
        return 0;
      }

      const center = new Point(
        vertices.reduce((sum, point) => sum + point.x, 0) / vertices.length,
        vertices.reduce((sum, point) => sum + point.y, 0) / vertices.length,
        vertices.reduce((sum, point) => sum + point.z, 0) / vertices.length,
      );

      let resultVolume = 0;

      for (const face of clippedFaces) {
        for (let index = 1; index < face.length - 1; index += 1) {
          const a = face[0].subtract(center);
          const b = face[index].subtract(center);
          const c = face[index + 1].subtract(center);

          const crossX = b.y * c.z - b.z * c.y;
          const crossY = b.z * c.x - b.x * c.z;
          const crossZ = b.x * c.y - b.y * c.x;

          resultVolume += Math.abs(
            a.x * crossX + a.y * crossY + a.z * crossZ,
          ) / 6;
        }
      }

      return resultVolume;
    };

    const firstVolume = calculateClippedVolume(true);
    const secondVolume = calculateClippedVolume(false);
    const totalVolume = firstVolume + secondVolume;

    if (totalVolume < EPSILON) {
      return null;
    }

    return {
      firstPart: firstVolume / totalVolume,
      secondPart: secondVolume / totalVolume,
    };
  }
}
