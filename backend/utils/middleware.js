export const unknownEndpoint = (request, response) => {
  return response.status(404).json({
    error: "404 unknown endpoint",
  });
};

export const errorHandler = (error, request, response, next) => {
  console.log(error.name, error.message);

  if (error.statusCode && error.name) {
    return response.status(error.statusCode).json({
      error: error.message,
    });
  }
  if (error.name === "CastError") {
    return response.status(400).json({
      error: "malformatted id",
    });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message,
    });
  }
  if (error.name === "MongoServerError" && error.code === 11000) {
    return response.status(409).json({
      error: "email must be unique",
    });
  } else {
    next(error);
  }
};
