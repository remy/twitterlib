var twitterlib = require('../twitterlib');

console.log(twitterlib.version);

twitterlib.favs('rem', function (tweets) {
  // console.log(tweets[0]);
});


twitterlib.list('rem', function (tweets) {
  // console.log(tweets[0]);
});

twitterlib.timeline('rem', function (tweets) {
  // console.log(tweets[0]);
});


twitterlib.search('rem', function (tweets) {
  // console.log(tweets[0]);
});

twitterlib.retweets('rem', function (tweets) {
  // console.log(tweets[0]);
});
