const dotenv = require('dotenv');
const Koa = require('koa');
// const loadModules = require('../core/utils/load-modules');
const logger = require('../core/middlewares/logger');
const bodyParser = require('../core/middlewares/body-parser');
const sequelize = require('../core/lib/sequelize');
const TwitterService = require('./twitter/twitter.service');

dotenv.config();
sequelize.sync();

const app = new Koa();
const port = process.env.PORT || 3010;

app.use(logger());
app.use(bodyParser());

app.listen(port);

TwitterService.setClient();
TwitterService.stream('flamengo', (event) => {
  console.log(event && event.text);
}, (event) => {
  console.log(event);
});
