const Router = require('koa-router');

const router = new Router();

const controller = require('./controller');

router.get('/login/:provider', controller.login);

module.exports = router;