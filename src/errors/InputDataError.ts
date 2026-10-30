
export class InputDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InputDataError";
  }
}
