
import { writeFile, unlink } from "node:fs/promises";
import { ShapeFileReader } from "../src/readers/ShapeFileReader.js";

describe("ShapeFileReader", () => {
  const filePath = "data/test-input.txt";
  const reader = new ShapeFileReader();

  afterEach(async () => {
    try {
      await unlink(filePath);
    } catch {
      // Файл мог не создаться.
    }
  });

  test("reads valid numeric lines", async () => {
    await writeFile(filePath, "1 2 3\n4 5 6", "utf-8");

    const result = await reader.readLines(filePath);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual([1, 2, 3]);
    expect(result[1]).toEqual([4, 5, 6]);
  });

  test("skips invalid lines and continues reading", async () => {
    await writeFile(
      filePath,
      "1 2 3\nwrong data\n4 5 6",
      "utf-8",
    );

    const result = await reader.readLines(filePath);

    expect(result).toHaveLength(2);
    expect(result[1]).toEqual([4, 5, 6]);
  });
});
