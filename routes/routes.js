const Router = require('express').Router;
const handlers = require('../handlers/handlers');

const router = Router();

/*router.get('/', handlers.getTodos);
router.post('/', handlers.addTodo);
router.get('/edit/:_id', handlers.getEditPage);
router.post('/edit/:_id', handlers.editTodo);
router.post('/delete/:_id', handlers.deleteTodo);*/

router.get('/', handlers.getApiTodos);
router.post('/', handlers.addApiTodo);
router.put('/:_id', handlers.editApiTodo);
router.delete('/:_id', handlers.deleteTodo);

module.exports = router;