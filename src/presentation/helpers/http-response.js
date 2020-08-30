"use strict";

class HttpResponse {
  static ok(body) {
    return {
      statusCode: 200,
      body,
    };
  }

  static badRequest(error) {
    return {
      statusCode: 400,
      body: {
        message: "NotFoundError",
        error: error.message,
      },
    };
  }

  static unauthorizedError(mensaje) {
    return {
      statusCode: 401,
      body: {
        message: "unauthorizedError",
        error: mensaje,
      },
    };
  }

  static serverSideError(error) {
    return {
      statusCode: 500,
      body: {
        message: "ServerSideError",
        error: error.message,
      },
    };
  }
}

module.exports = HttpResponse;
