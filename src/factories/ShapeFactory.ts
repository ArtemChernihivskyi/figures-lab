import { Shape } from "../entities/Shape.js";

export abstract class ShapeFactory {
  abstract createShape(values: number[]): Shape;
}   