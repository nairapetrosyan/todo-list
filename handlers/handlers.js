let todos = [];
let id = 0;
function getTodos(req, res){
    const errors = Object.assign({}, req.session.errors);
    req.session.errors = null;
    res.render('todo',{ todos, errors } );
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

function deleteTodo(req, res) {
    todos=todos.filter(todo=>{
        return todo._id != req.params._id;
    })
    res.redirect('/');
};

module.exports = {
    getTodos,
    addTodo,
    getEditPage,
    editTodo,
    deleteTodo,
};