const logger = require('koa-logger');
const auth = require('./auth');
const user = require('./user');
const dotenv = require('dotenv');
const Koa = require('koa');
const loadModules = require('../core/utils/load-modules');
const sequelize = require('../core/lib/sequelize');

dotenv.config();
sequelize.sync();

const app = new Koa();
const port = process.env.PORT || 3010;

app.use(logger());

loadModules(app, [
  auth,
  user,
]);

app.listen(port);
