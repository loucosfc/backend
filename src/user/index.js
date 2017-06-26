const Router = require('koa-router');
const router = new Router({
  prefix: '/user',
});

router.post('/', (ctx, next) => {
  ctx.body = 'Sign Up!';
  console.log(ctx.request.body);
});

module.exports = {
  router,
};
