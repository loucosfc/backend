const dotenv = require('dotenv');
const http = require('http');
const IO = require('socket.io');
const Koa = require('koa');
// const loadModules = require('../core/utils/load-modules');
const logger = require('../core/middlewares/logger');
const bodyParser = require('../core/middlewares/body-parser');
const TwitterService = require('./twitter/twitter.service');
const teams = require('../teams');
const exitAllRooms = require('../core/utils/exit-all-rooms');

dotenv.config();

const app = new Koa();
const port = process.env.PORT || 3010;

app.use(logger());
app.use(bodyParser());

const httpServer = http.createServer(app.callback());
const io = new IO(httpServer);

const twitterSettings = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};
const twitterService = new TwitterService();
twitterService.initialize(teams, io, twitterSettings);

io.on('connection', (socket) => {
  socket.on('watch:stream', (team) => {
    twitterService.reconnect();
    exitAllRooms(socket);
    socket.join(team);
  });
});


httpServer.listen(port);
