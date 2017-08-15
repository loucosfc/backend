const dotenv = require('dotenv');
const http = require('http');
const IO = require('socket.io');
const Koa = require('koa');
// const loadModules = require('../core/utils/load-modules');
const logger = require('../core/middlewares/logger');
const bodyParser = require('../core/middlewares/body-parser');
const TwitterService = require('./twitter/twitter.service');
const teams = require('../teams');

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

twitterService.initialize(teams, io);

const exitAllRooms = (socket) => {
  Object.keys(socket.rooms).forEach((v) => {
    const room = socket.rooms[v];
    socket.leave(room);
  });
};

io.on('connection', (socket) => {
  socket.on('watch:stream', (team) => {
    exitAllRooms(socket);
    socket.join(team);
  });
});


httpServer.listen(port, '0.0.0.0');
