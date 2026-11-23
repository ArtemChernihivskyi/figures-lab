import { RectangleFactory } from "./factories/RectangleFactory.js";
import { TetrahedronFactory } from "./factories/TetrahedronFactory.js";
import { ShapeFactory } from "./factories/ShapeFactory.js";
import { ShapeFileReader } from "./readers/ShapeFileReader.js";
import { ShapeService } from "./services/ShapeService.js";
import { InputDataError } from "./errors/InputDataError.js";
import { logger } from "./services/Logger.js";

async function main(): Promise<void> {
  const reader = new ShapeFileReader();
  const service = new ShapeService();

  const factories: {
    factory: ShapeFactory;
    filePath: string;
  }[] = [
    {
      factory: new RectangleFactory(),
      filePath: "data/rectangles.txt",
    },
    {
      factory: new TetrahedronFactory(),
      filePath: "data/tetrahedrons.txt",
    },
  ];

  for (const item of factories) {
    const data = await reader.readLines(item.filePath);

    for (const values of data) {
      try {
        const shape = item.factory.createShape(values);
        service.processShape(shape);
      } catch (error: unknown) {
        if (error instanceof InputDataError) {
          logger.warn(
            { values, error: error.message },
            "Invalid shape parameters",
          );
          continue;
        }

        throw error;
      }
    }
  }
}

main().catch((error: unknown) => {
  logger.error({ error }, "Application failed");
  process.exitCode = 1;
});