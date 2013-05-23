var twitterlib = require('../twitterlib'),
    t = require('tap');

t.test('access tokens', function (t) {

  t.test('can be set', function (t) {
    twitterlib.setAccessToken('abc123');
    t.equal(twitterlib.accessToken, 'abc123', 'Token is set ok');
    t.end();
  });

  t.test('are added to getUrl', function (t) {
    twitterlib.setAccessToken('abc123');
    var url = twitterlib.getUrl('search');
    t.ok(url.indexOf('access_token=abc123') > -1, 'URL contains access token');
    t.end();
  });

});