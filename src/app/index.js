const dotenv = require('dotenv');
const http = require('http');
const IO = require('socket.io');
const Koa = require('koa');
// const loadModules = require('../core/utils/load-modules');
const logger = require('../core/middlewares/logger');
const bodyParser = require('../core/middlewares/body-parser');
const tweetIsValid = require('../core/utils/tweet-is-valid');
const TwitterService = require('./twitter/twitter.service');

dotenv.config();

const app = new Koa();
const port = process.env.PORT || 3010;
const twitterService = new TwitterService();

twitterService.setClient({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

app.use(logger());
app.use(bodyParser());

const httpServer = http.createServer(app.callback());
const io = new IO(httpServer);
const clients = [];

io.on('connection', (_socket) => {
  const socket = _socket;
  socket.streaming = twitterService.stream('flamengo', (event) => {
    if (tweetIsValid(event)) {
      console.log('ae');
      io.emit('tweet', event);
    }
  }, () => {});
  clients.push(socket);

  socket.on('disconnect', () => {
    console.log(socket.streaming);
    socket.streaming.destroy();
    const i = clients.indexOf(socket);
    clients.splice(i, 1);
  });
});


httpServer.listen(port);
