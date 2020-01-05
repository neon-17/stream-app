const path = require('path');
const notificationRouteHandlers = require(path.join(__dirname, 'routes', 'notification'));

const notFoundHandler = (req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
}

const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).send({
        message: err.message,
    });
}

module.exports = (app) => {
    app.use('/notification', notificationRouteHandlers)
    app.use(notFoundHandler); // catch 404 and forward to error handler
    app.use(errorHandler); //error_handler
}

process.on('unhandledRejection', function(err) {
    console.log(err);
});