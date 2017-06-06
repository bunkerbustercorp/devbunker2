const Router = require('koa-router');

const router = new Router();

const controller = require('./controller');

router.post('/', controller.create);
router.patch('/:postId', controller.update);


module.exports = router;