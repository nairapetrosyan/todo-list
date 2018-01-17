const Router = require('express').Router;
const handlers = require('../handlers/handlers');

const router = Router();
router.get('/', handlers.getTodos);

module.exports = router;