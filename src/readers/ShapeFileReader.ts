import { readFile } from "node:fs/promises";
import { NumberValidator } from "../validators/NumberValidator.js";
import { logger } from "../services/Logger.js";

const LINE_SEPARATOR_PATTERN = /\r?\n/;
const VALUE_SEPARATOR_PATTERN = /[\s,;]+/;

export class ShapeFileReader {
  async readLines(filePath: string): Promise<number[][]> {
    const content = await readFile(filePath, "utf-8");
    const lines = content.split(LINE_SEPARATOR_PATTERN);
    const validData: number[][] = [];

    for (const [index, line] of lines.entries()) {
      const trimmedLine = line.trim();

      if (trimmedLine.length === 0) {
        continue;
      }

      const values = trimmedLine.split(VALUE_SEPARATOR_PATTERN);

      if (!NumberValidator.areValidNumbers(values)) {
        logger.warn(
          { lineNumber: index + 1, line },
          "Invalid input data",
        );
        continue;
      }

      validData.push(values.map(Number));
    }

    return validData;
  }
}