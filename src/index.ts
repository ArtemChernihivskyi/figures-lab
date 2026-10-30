
import { RectangleFactory } from "./factories/RectangleFactory.js";
import { TetrahedronFactory } from "./factories/TetrahedronFactory.js";
import { ShapeFileReader } from "./readers/ShapeFileReader.js";
import { ShapeService } from "./services/ShapeService.js";
import { logger } from "./services/Logger.js";

async function main(): Promise<void> {
  const reader = new ShapeFileReader();
  const service = new ShapeService();

  const rectangleFactory = new RectangleFactory();
  const tetrahedronFactory = new TetrahedronFactory();

  const rectangleData = await reader.readLines("data/rectangles.txt");

  for (const values of rectangleData) {
    if (values.length !== 6) {
      logger.warn({ values }, "Invalid rectangle parameters");
      continue;
    }

    const rectangle = rectangleFactory.createRectangle(
      values[0], values[1],
      values[2], values[3],
      values[4], values[5],
    );

    service.processRectangle(rectangle);
  }

  const tetrahedronData = await reader.readLines("data/tetrahedrons.txt");

  for (const values of tetrahedronData) {
    if (values.length !== 12) {
      logger.warn({ values }, "Invalid tetrahedron parameters");
      continue;
    }

    const tetrahedron = tetrahedronFactory.createTetrahedron(
      values[0], values[1], values[2],
      values[3], values[4], values[5],
      values[6], values[7], values[8],
      values[9], values[10], values[11],
    );

    service.processTetrahedron(tetrahedron);
  }
}

main().catch((error: unknown) => {
  logger.error({ error }, "Application failed");
  process.exitCode = 1;
});
