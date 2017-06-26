const AuthService = require('./auth.service');
const Router = require('koa-router');
const router = new Router({
  prefix: '/auth',
});

router.post('/sign-in', async (ctx, next) => {
  const params = ctx.request.body;
  const username = params.username ? params.username : '';
  const password = params.password ? params.password : '';
  const response = await AuthService.signIn({ username, password });

  ctx.body = response.success ? response.data : '';
  ctx.status = response.success ? 200 : 402;
});

module.exports = {
  router,
};
