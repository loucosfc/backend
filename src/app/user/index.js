const jwt = require('../../core/middlewares/jwt');
const Router = require('koa-router');

const router = new Router({
  prefix: '/user',
});

router.get('/', jwt, (ctx, next) => {
  ctx.body = 'Users';
  next();
});

router.post('/', (ctx, next) => {
  ctx.body = 'Sign Up!';
  next();
});

module.exports = {
  router,
};
