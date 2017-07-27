const Twitter = require('twitter');
const tweetIsValid = require('../../core/utils/tweet-is-valid');
const detectTeam = require('../../core/utils/detect-team');

class TwitterService {
  constructor() {
    this.teams = [];
  }

  setClient(params) {
    this.client = new Twitter(params);
  }

  initialize(teams, io) {
    this.io = io;
    const filter = teams.join(',');
    this.stream(filter,
      tweet => this.successCallback(tweet),
      error => this.errorCallback(error));
  }

  stream(track, success, error) {
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
    //console.log(event);
  }
}

module.exports = TwitterService;
