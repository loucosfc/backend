const jwt = require('../../core/middlewares/jwt');
const Router = require('koa-router');
const UserService = require('./user.service');

const router = new Router({
  prefix: '/user',
});

router.get('/', jwt, (ctx, next) => {
  ctx.body = 'Users';
  next();
});

router.post('/', async (ctx, next) => {
  const response = await UserService.create({ ctx });
  ctx.body = response.success ? response.data : '';
  ctx.status = response.success ? 200 : 403;
  next();
});

module.exports = {
  router,
};
