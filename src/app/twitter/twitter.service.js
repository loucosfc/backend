const Twitter = require('twitter');

class TwitterService {
  setClient(params) {
    this.client = new Twitter(params);
  }

  getClient() {
    return this.client;
  }

  stream(track, success, error) {
    const stream = this.getClient().stream('statuses/filter', { track });

    stream.on('data', (event) => {
      success(event);
    });

    stream.on('error', (event) => {
      error(event);
    });
  }
}

module.exports = TwitterService;
