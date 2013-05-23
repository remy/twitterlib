var twitterlib = require('../twitterlib'),
    t = require('tap');

t.test('access tokens', function (t) {

  t.test('can be set', function (t) {
    twitterlib.setAccessToken('abc123');
    t.equal(twitterlib.accessToken, 'abc123', 'Token is set ok');
    t.end();
  });

  t.test('are added to getUrl', function (t) {
    twitterlib.setAccessToken('xyz234');
    var url = twitterlib.getUrl('search');
    t.ok(url.indexOf('access_token=xyz234') > -1, 'URL contains access token');
    t.end();
  });

  t.test('are not added to getUrl when falsey', function (t) {
    twitterlib.setAccessToken(null);
    var url = twitterlib.getUrl('search');
    t.ok(url.indexOf('access_token') == -1, 'URL does not contain access token');
    t.end();
  });

});