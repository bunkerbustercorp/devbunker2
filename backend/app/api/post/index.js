const Router = require('koa-router');

const router = new Router();

const controller = require('./controller');

router.get('/', controller.getpost);
router.get('/userid/:userId', controller.getpostbyuserid);
router.get('/postid/:postId', controller.getpostbypostid);
router.delete('/:postId', controller.deletepost);

module.exports = router;