const logger = require('koa-logger');
const Koa = require('koa');
const app = new Koa();
const modules = [
  'auth',
  'user',
];

require('dotenv').config();

const port = process.env.PORT || 3010;

app.use(logger());

modules.forEach((v) => {
  const router = require(`./${v}`).router;
  app.use(router.routes());
  app.use(router.allowedMethods());
});

app.listen(port);
