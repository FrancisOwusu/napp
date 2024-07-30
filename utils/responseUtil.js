"use strict";

module.exports = {
  sendResponse: (
    res,
    statusCode,
    success = false,
    message,
    data = null,
    pagination=null,
    error = null
  ) => {
    const response = {
      success,
      message,
    };

    if (data) {
      response.data = data;
    }
    if (pagination) {
      response.pagination = pagination;
    }
    if (error) {
      response.error = error;
    }

    res.status(statusCode).json(response);
  },
};
