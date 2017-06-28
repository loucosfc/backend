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

io.on('connection', (socket) => {
  let streaming = {};

  socket.on('begin:stream', (teamSlug) => {
    streaming = twitterService.stream(teamSlug, (event) => {
      if (tweetIsValid(event)) {
        socket.emit('tweet', event);
      }
    }, () => {});
  });

  socket.on('end:stream', () => {
    if (typeof streaming.destroy === 'function') {
      streaming.destroy();
    }
  });

  socket.on('disconnect', () => {
    if (typeof streaming.destroy === 'function') {
      streaming.destroy();
    }
  });
});


httpServer.listen(port, '0.0.0.0');
