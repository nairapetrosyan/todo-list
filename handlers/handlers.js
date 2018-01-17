let todos = [];
let id = 0;
function getTodos(req, res){
    const errors = Object.assign({}, req.session.errors);
    req.session.errors = null;
    res.sendFile('./index.html');
};

function getApiTodos(req, res){
    const errors={};
    res.json({errors, todos});
};


function addTodo(req, res){
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
};


function addApiTodo(req, res){

    req.checkBody('addtodo').notEmpty().withMessage("Todo is required");
    const errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        res.json({errors, todos});
    }
    else {
        id++;
        todos.push({
            todo: req.body.addtodo,
            _id: id});
        res.json({todos});
    }
};

function getEditPage(req, res){
    const todo = todos.filter(todo=>{
        return todo._id == req.params._id;
    })[0];
    const errors = Object.assign({}, req.session.errors);
    req.session.errors = null;
    res.render('edit', {todo, errors});
};


function editTodo(req, res) {
    req.checkBody('edit').notEmpty().withMessage("Edit is required");
    const errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        res.redirect('/edit/'+req.params._id);
    }
    else {
        todos = todos.map(todo => {
            if (todo._id == req.params._id)
                todo.todo = req.body.edit;
            return todo;
        });
        res.redirect('/');
    }
};

function editApiTodo(req, res) {
    req.checkBody('addtodo').notEmpty().withMessage("Edit is required");
    const errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        res.json({errors, todos})
          }
    else {
        todos = todos.map(todo => {
            if (todo._id == req.params._id)
                todo.todo = req.body.addtodo;
            return todo;
        });
        res.json({todos});
    }
};

function deleteTodo(req, res) {
    todos=todos.filter(todo=>{
        return todo._id != req.params._id;
    })
    res.json({todos});
};

module.exports = {
    getTodos,
    addTodo,
    editTodo,
    getApiTodos,
    addApiTodo,
    editApiTodo,
    deleteTodo
};