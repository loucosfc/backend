const dotenv = require('dotenv');
const http = require('http');
const IO = require('socket.io');
const Koa = require('koa');
// const loadModules = require('../core/utils/load-modules');
const logger = require('../core/middlewares/logger');
const bodyParser = require('../core/middlewares/body-parser');
const TwitterService = require('./twitter/twitter.service');

dotenv.config();

const app = new Koa();
const port = process.env.PORT || 3010;

app.use(logger());
app.use(bodyParser());

const httpServer = http.createServer(app.callback());
const io = new IO(httpServer);

io.on('connection', () => {
  // eslint-disable-next-line
  console.log('Usuário abriu o Loucos FC!');
});

const twitterService = new TwitterService();

twitterService.setClient({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

twitterService.stream('flamengo', (event) => {
  // eslint-disable-next-line
  console.log(event && event.text);
}, (event) => {
  // eslint-disable-next-line
  console.log(event);
});

httpServer.listen(port);
