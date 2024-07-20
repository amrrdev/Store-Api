const sendErrorDevelopment = function (error, res) {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        error,
        stack: error.stack,
    });
};

export default (error, req, res, next) => {
    error.statusCode ||= 500;
    error.status ||= 'error';
    if (process.env.NODE_ENV === 'development') sendErrorDevelopment(error, res);
};
