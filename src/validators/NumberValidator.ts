const NUMBER_PATTERN = /^-?\d+(\.\d+)?$/;

export class NumberValidator {
  static isValidNumber(value: string): boolean {
    return (
      NUMBER_PATTERN.test(value.trim()) &&
      Number.isFinite(Number(value))
    );
  }

  static areValidNumbers(values: string[]): boolean {
    return (
      values.length > 0 &&
      values.every((value) => this.isValidNumber(value))
    );
  }
}