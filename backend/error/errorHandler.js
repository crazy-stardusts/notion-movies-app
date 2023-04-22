exports.errorHandler = (err, req, res, next) => {
    console.log(err.message);
    err.statusCode = err.statusCode || 500;
    let message = err.message;
    if (err.statusCode == 500) message = "Something went wrong";
    res.status(err.statusCode).json({
        status : 'failure',
        message : message
    });
};