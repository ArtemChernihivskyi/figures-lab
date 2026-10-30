import { Point } from "../entities/Point.js";
import { Tetrahedron } from "../entities/Tetrahedron.js";

export class TetrahedronFactory {
  createTetrahedron(
    x1: number, y1: number, z1: number,
    x2: number, y2: number, z2: number,
    x3: number, y3: number, z3: number,
    x4: number, y4: number, z4: number,
  ): Tetrahedron {
    return new Tetrahedron(
      new Point(x1, y1, z1),
      new Point(x2, y2, z2),
      new Point(x3, y3, z3),
      new Point(x4, y4, z4),
    );
  }
}