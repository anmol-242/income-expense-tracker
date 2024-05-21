const globalErrorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode = err.statusCode || 500
    const status = err.status = err.status || 'error'
    const messsage = err.messsage
    const stack = err.stack

    res.status(statusCode).json({
        status,
        messsage,
        stack
    })
}

module.exports=globalErrorHandler;