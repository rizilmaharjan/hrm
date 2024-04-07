class appError extends Error {
  statusCode: number;
  data: unknown;
  isOperational: boolean;
  constructor(
    statusCode: number,
    message: string | Record<string, string> = "Something went wrong"
  ) {
    if (typeof message === "object") {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { appError };
