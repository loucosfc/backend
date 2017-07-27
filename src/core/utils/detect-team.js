const teams = require('../../teams');

const detectTeam = (tweet) => {
  const checkString = (str, substr) => str.toLowerCase().indexOf(substr.toLowerCase()) !== -1;
  let valid = false;
  let team = '';

  teams.forEach((t) => {
    if (checkString(tweet.retweeted_status.text, t)) {
      valid = true;
      team = t;
    }
    if (checkString(tweet.retweeted_status.user.name, t)) {
      valid = true;
      team = t;
    }
    if (checkString(tweet.retweeted_status.user.screen_name, t)) {
      valid = true;
      team = t;
    }
  });

  return valid ? team.toLowerCase() : false;
};

module.exports = detectTeam;
