export abstract class Shape {
  constructor(public readonly name: string) {}

  abstract isValid(): boolean;
}