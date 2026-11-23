import { Rectangle } from "../entities/Rectangle.js";
import { Tetrahedron } from "../entities/Tetrahedron.js";
import { Shape } from "../entities/Shape.js";
import { logger } from "./Logger.js";

export class ShapeService {
  processShape(shape: Shape): void {
    if (shape instanceof Rectangle) {
      this.processRectangle(shape);
      return;
    }

    if (shape instanceof Tetrahedron) {
      this.processTetrahedron(shape);
      return;
    }

    logger.warn({ name: shape.name }, "Unknown shape type");
  }

  processRectangle(rectangle: Rectangle): void {
    if (!rectangle.isValid()) {
      logger.warn("Invalid rectangle");
      return;
    }

    logger.info({
      name: rectangle.name,
      area: rectangle.area(),
      perimeter: rectangle.perimeter(),
      isConvex: rectangle.isConvex(),
      isSquare: rectangle.isSquare(),
      isRhombus: rectangle.isRhombus(),
      isTrapezoid: rectangle.isTrapezoid(),
    }, "Rectangle processed");
  }

  processTetrahedron(tetrahedron: Tetrahedron): void {
    if (!tetrahedron.isValid()) {
      logger.warn("Invalid tetrahedron");
      return;
    }

    logger.info({
      name: tetrahedron.name,
      volume: tetrahedron.volume(),
      surfaceArea: tetrahedron.surfaceArea(),
      hasBaseOnXYPlane: tetrahedron.hasBaseOnXYPlane(),
      hasBaseOnXZPlane: tetrahedron.hasBaseOnXZPlane(),
      hasBaseOnYZPlane: tetrahedron.hasBaseOnYZPlane(),
      cutByXY: tetrahedron.volumeRatioAfterCut("XY"),
      cutByXZ: tetrahedron.volumeRatioAfterCut("XZ"),
      cutByYZ: tetrahedron.volumeRatioAfterCut("YZ"),
    }, "Tetrahedron processed");
  }
} 