// utils/errorHandler.js - Standardized error handling utility

/**
 * Standard error response format
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {*} details - Additional error details (optional)
 * @param {Error} error - Original error object for logging
 */
const sendErrorResponse = (res, statusCode, message, details = null, error = null) => {
  // Log error for debugging
  if (error) {
    console.error(`Error ${statusCode}:`, error.message);
    if (process.env.NODE_ENV === "development") {
      console.error("Stack trace:", error.stack);
    }
  }

  const response = {
    success: false,
    error: message,
    statusCode
  };

  // Add details in development mode or for validation errors
  if (details && (process.env.NODE_ENV === "development" || statusCode === 400)) {
    response.details = details;
  }

  res.status(statusCode).json(response);
};

/**
 * Handle Sequelize validation errors
 * @param {Object} res - Express response object
 * @param {Error} error - Sequelize validation error
 */
const handleValidationError = (res, error) => {
  if (error.name === "SequelizeValidationError") {
    const validationErrors = error.errors.map(err => ({
      field: err.path,
      message: err.message,
      value: err.value
    }));

    sendErrorResponse(res, 400, "Validation failed", validationErrors, error);
    return true;
  }
  return false;
};

/**
 * Handle Sequelize unique constraint errors
 * @param {Object} res - Express response object
 * @param {Error} error - Sequelize unique constraint error
 */
const handleUniqueConstraintError = (res, error) => {
  if (error.name === "SequelizeUniqueConstraintError") {
    const field = error.errors[0]?.path || "field";
    const value = error.errors[0]?.value || "value";

    sendErrorResponse(res, 409, `${field} '${value}' already exists`, { field, value }, error);
    return true;
  }
  return false;
};

/**
 * Handle Sequelize foreign key constraint errors
 * @param {Object} res - Express response object
 * @param {Error} error - Sequelize foreign key error
 */
const handleForeignKeyError = (res, error) => {
  if (error.name === "SequelizeForeignKeyConstraintError") {
    sendErrorResponse(res, 400, "Referenced record does not exist", null, error);
    return true;
  }
  return false;
};

/**
 * Generic error handler for controllers
 * @param {Object} res - Express response object
 * @param {Error} error - Error object
 * @param {string} defaultMessage - Default error message
 */
const handleControllerError = (res, error, defaultMessage = "Internal server error") => {
  console.error("Controller error:", error);

  // Handle specific Sequelize errors
  if (handleValidationError(res, error)) return;
  if (handleUniqueConstraintError(res, error)) return;
  if (handleForeignKeyError(res, error)) return;

  // Handle other known errors
  if (error.name === "CastError") {
    sendErrorResponse(res, 400, "Invalid ID format", null, error);
    return;
  }

  // Default error response
  sendErrorResponse(res, 500, defaultMessage, null, error);
};

/**
 * Success response format
 * @param {Object} res - Express response object
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default: 200)
 */
const sendSuccessResponse = (res, data, message = "Success", statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    statusCode
  });
};

/**
 * Async wrapper for route handlers to catch errors
 * @param {Function} fn - Async route handler function
 * @returns {Function} Express middleware function
 */
const asyncHandler = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  sendErrorResponse,
  handleValidationError,
  handleUniqueConstraintError,
  handleForeignKeyError,
  handleControllerError,
  sendSuccessResponse,
  asyncHandler
};
