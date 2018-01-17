const Router = require('express').Router;
const userRouter = require('./routes');
const homeRouter = require('./home');

module.exports = function(app) {
    app.use('/api/todos', userRouter);
    app.use('/', homeRouter);
};