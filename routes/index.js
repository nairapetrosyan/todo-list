const Router = require('express').Router;
const userRouter = require('./routes');

module.exports = function(app) {
    app.use('/', userRouter);
};