# Foreword

I've *only* just written this library and have not yet tested it in detail. Use it at your own risk - but do send me feedback if you do! :)

I'll be removing this section after I've completed some tests.  Initial tests show it working (though I've not checked <code>search</code> yet).

# Twitter Lib

**Stand alone Twitter library for open API calls using JavaScript**

twitterlib.js allows you to run a number of common API calls to Twitter, set the options in a standard format, and pass a filtering search string if required.

This is a quick overview of what's in Twitterlib - further documentation to come.

## API methods

All API methods are called with:

<pre><code>twitterlib[METHOD](subject, options, callback)</code></pre>

*Note that within the callback, <code>this</code> is the twitterlib object allowing you to call utility methods within the callback.*

* status - single status for a user, result is in an array
* timeline - timeline for a user
* list - status for members of list, *subject* is in the format: screen\_name/list\_id
* favs - favourites for a user
* search

### Options

* limit - numerical
* page - numerical
* filter - Twitter search filter syntax, e.g. '-RT OR -via'

## Utility Methods:

* next - executes the last method called incrementing the page number and firing the same callback
* ify - object to linkify and "at"ify tweets, example usage below
* time - to access relative help formatting the twitter time to a relative time
* filter - stand alone filter based on Twitter's search filter syntax

## Example

<pre><code>var count = 0, limit = 2;
twitterlib.timeline('rem', { limit: 5 }, function (tweets) {
  for (var i = 0; i < tweets.length; i++) {
    console.log(this.ify.clean(tweets[i].text));
  }

  count++;
  if (count < limit) {
    this.next();
  }
});</code></pre>