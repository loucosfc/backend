const dotenv = require('dotenv');
const Koa = require('koa');
const auth = require('./auth');
const user = require('./user');
const loadModules = require('../core/utils/load-modules');
const logger = require('../core/middlewares/logger');
const bodyParser = require('../core/middlewares/body-parser');
const sequelize = require('../core/lib/sequelize');

dotenv.config();
sequelize.sync();

const app = new Koa();
const port = process.env.PORT || 3010;

app.use(logger());
app.use(bodyParser());

loadModules(app, [
  auth,
  user,
]);

app.listen(port);
