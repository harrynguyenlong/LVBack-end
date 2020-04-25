class HttpError extends Error {
    constructor(message, statusCode, field) {
        super(message, field);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.field = field;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = HttpError;
