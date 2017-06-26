const Router = require('koa-router');

const router = new Router({
  prefix: '/user',
});

router.post('/', (ctx, next) => {
  ctx.body = 'Sign Up!';
  next();
});

module.exports = {
  router,
};
