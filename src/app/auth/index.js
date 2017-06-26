const AuthService = require('./auth.service');
const Router = require('koa-router');

const router = new Router({
  prefix: '/auth',
});

router.post('/sign-in', async (ctx) => {
  const response = await AuthService.signIn({ ctx });
  ctx.body = response.success ? response.data : '';
  ctx.status = response.success ? 200 : 402;
});

module.exports = {
  router,
};
