
import { Rectangle } from "../entities/Rectangle.js";
import { Tetrahedron } from "../entities/Tetrahedron.js";
import { logger } from "./Logger.js";

export class ShapeService {
  processRectangle(rectangle: Rectangle): void {
    if (!rectangle.isValid()) {
      logger.warn("Invalid rectangle");
      return;
    }

    logger.info({
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
