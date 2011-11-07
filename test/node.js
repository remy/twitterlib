var twitterlib = require('../twitterlib');

twitterlib.status('rem', function (tweets) {
  console.log(tweets[0].text);
});
