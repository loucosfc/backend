const Twitter = require('twitter');

class TwitterService {
  setClient() {
    this.client = new Twitter({
      consumer_key: 'OCplIcZKLEwrkytPMAPBcA',
      consumer_secret: 'IOsoNGcwoj0lEDIRWzopyIjLtSlWhaDdnOc2LhpUXw',
      access_token_key: '42153578-hWNPJjQBq7bCqiQHpvi8bVAGRdlDQSHk0NlGYSNiT',
      access_token_secret: 'lmL2sLPUJSPQCmnsctIWGE01NUkvSXe6CiIPUjNecw',
    });
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

module.exports = new TwitterService();
