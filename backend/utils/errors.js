export class IncorrectPasswordError extends Error {
  constructor(message) {
    super(message);
    this.name = "IncorrectPasswordError";
    this.statusCode = 401;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}
