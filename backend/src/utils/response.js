/**
 * Standardized API response helpers
 */

const sendSuccess = (res, data = null, statusCode = 200, message = 'Success') => {
  const response = {
    success: true,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

const sendError = (res, message = 'Something went wrong', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

const sendPaginated = (res, data, pagination, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message: 'Success',
    data,
    pagination,
  });
};

module.exports = { sendSuccess, sendError, sendPaginated };
