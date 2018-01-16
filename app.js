const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

let todos = [];
let id = 0;
app.get('/', (req, res) =>{
    const errors = Object.assign({}, req.session.errors);
    req.session.errors = null;
    res.render('todo',{ todos, errors } );
});

app.post('/', (req, res)=>{
    req.checkBody('addtodo').notEmpty().withMessage("Todo is required");
    const errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        res.redirect('/');
    }
    else {
        id++;
        todos.push({
            todo: req.body.addtodo,
            _id: id});

        res.render('todo',{ todos, errors } );
    }
});


app.get('/edit/:_id', (req, res)=>{
    const errors = Object.assign({}, req.session.errors);
    req.session.errors = null;
    const todo = todos.filter(todo=>{
        return todo._id == req.params._id;
    })[0];
    res.render('edit', {todo, errors})
});
app.post('/edit/:_id', (req, res)=>{
    req.checkBody('edit').notEmpty().withMessage("Edit is required");
    const errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        res.redirect('/edit/:_id');
    }
    todos = todos.map(todo=>{
        if(todo._id==req.params._id)
            todo.todo = req.body.edit;
        return todo;
    });
    res.redirect('/');
});

app.post('/delete/:_id', (req, res)=>{
    todos=todos.filter(todo=>{
        return todo._id != req.params._id
    })
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('server started')
});