export class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number = 0,
  ) {}

  subtract(other: Point): Point {
    return new Point(
      this.x - other.x,
      this.y - other.y,
      this.z - other.z,
    );
  }

  dotProduct(other: Point): number {
    return (
      this.x * other.x +
      this.y * other.y +
      this.z * other.z
    );
  }
  isPerpendicular(other: Point): boolean {
  return this.dotProduct(other) === 0;
}
add(other: Point): Point {
  return new Point(
    this.x + other.x,
    this.y + other.y,
    this.z + other.z,
  );
}
}