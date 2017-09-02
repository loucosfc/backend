const Twitter = require('twitter');
const tweetIsValid = require('../../core/utils/tweet-is-valid');
const detectTeam = require('../../core/utils/detect-team');
const moment = require('moment');

class TwitterService {
  constructor() {
    this.teams = [];
  }

  initialize(teams, io, settings) {
    this.teams = teams;
    this.io = io;
    this.client = new Twitter(settings);
    this.connect();
  }

  connect() {
    this.setLatestConnection();
    this.stream(this.teams,
      tweet => this.successCallback(tweet),
      error => this.errorCallback(error));
  }

  reconnect() {
    const expirationDate = moment(this.latestConnection).add(1, 'hours');
    const currentDate = moment();
    if (currentDate.isAfter(expirationDate)) {
      this.connect();
    }
  }

  stream(teams, success, error) {
    const track = teams.join(',');
    const stream = this.client.stream('statuses/filter', { track });
    stream.on('data', (event) => {
      success(event);
    });
    stream.on('error', (event) => {
      error(event);
    });
    return stream;
  }

  successCallback(tweet) {
    if (tweetIsValid(tweet)) {
      const team = detectTeam(tweet);
      if (team) {
        this.io.sockets.in(team).emit('tweet', tweet);
      }
    }
  }

  // eslint-disable-next-line
  errorCallback(event) {
    // eslint-disable-next-line
    console.log('@@@ ERRO! @@@');
    // eslint-disable-next-line
    console.log(event);
  }

  setLatestConnection() {
    this.latestConnection = moment();
    return this.latestConnection;
  }
}

module.exports = TwitterService;
