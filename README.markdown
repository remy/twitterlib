# Twitter Lib

**Stand alone Twitter library for open API calls using JavaScript**

twitterlib.js allows you to run a number of common API calls to Twitter, set the options in a standard format, and pass a filtering search string if required.

Live example of this library being used in anger is the [Full Frontal JavaScript Conference 2009 twitter wall](http://2009.full-frontal.org/screen/). This example combines search and list calls in to one constant stream.

## API methods

All API methods are called with:

    twitterlib[METHOD](subject, options, callback)

Note that the twitterlib library returns itself in all the API methods (and the <code>next</code> method) so you can chain calls.

* favs - favourites for a user
* list - status for members of list, *subject* is in the format: screen\_name/list\_id
* search - calls a search request (limited by Twitter to 10 days), with all the result fields normalised to match the "twitter API"
* status - single status for a user, result is in an array
* timeline - timeline for a user
* retweets - retweets by a particular user

### Options

* filter - Twitter search filter syntax, e.g. '-RT OR -via', filters against the results
* limit - numerical, limit the number of results the API returns
* page - numerical, the page of results

### Callback

The API call with only run if a callback is passed.  Once the API call has finished, it will execute the callback passing in the results from Twitter in an array format.

The context of the callback is set to the twitterlib library (so logging out <code>this</code> will show the <code>twitterlib</code> object).

The second argument to the callback is the options being used on the method call.

    twitterlib.timeline('rem', { filter: 'snapbird OR "snap bird"' }, function (tweets, options) {
      document.querySelector('#tweet').innerHTML = twitterlib.render(tweets[0]);
      alert('This is page ' + options.page + ', using filter: ' + options.filter);

      if (options.page == 1) {
        this.next(); // repeats the call
      }
    });


## Utility Methods:

* refresh - re-executes the last twitterlib request - useful for updating a static block of tweets
* next - executes the last method called incrementing the page number and firing the same callback
* filter - stand alone filter based on Twitter's search filter syntax
* ify - object to linkify and "at"ify tweets, example usage below
* render - returns HTML &lt;li&gt; markup in a common format based on twitter.com's list of tweets
* reset - removes the next method, and removes all debug settings
* time - to access relative help formatting the twitter time to a relative time
* debug - see debugging section

## Example

    var count = 0, limit = 2;
    twitterlib.timeline('rem', { limit: 5 }, function (tweets) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(this.ify.clean(tweets[i].text));
      }

      count++;
      if (count < limit) {
        this.next();
      }
    });

## Debugging

Twitterlib includes a <code>debug</code> method to redirect API calls to your own test data, useful if you need to repetitively test your code and you don't want to get rate blocked by Twitter.

You can redirect each of the API methods (<code>favs</code>, <code>list</code>, <code>search</code>, <code>status</code> and <code>timeline</code>) by passing an object to the <code>debug</code> method.  The key is the method you wish to override, and the value is the URL to replace the call with.

For example, this repository includes some test data in the <code>test</code> directory.  Included are 9 search result hits named search1.json, search2.json and so on.

Within the files the result is being passed to a predefined callback called <code>callback</code>, i.e. 

    <strong>callback</strong>({"results":[{"profile_image_url":"http://a3.twimg.com/profile_images/.....

Note that the number in the filename match the page numbers, so this can be a variable in our debug URL.

To override the <code>search</code> call with our own predefined data (as seen the <code>test/api.html</code> example), I use:

    twitterlib.debug({ search: 'test-data/search%page%.json?callback=callback' });

Now search method calls will return search1.json for the first page, then search2.json for the second page, and so on.

To change another method, I can call the <code>debug</code> method again, or I can do it all at once:

    twitterlib.debug({ 
      search: 'test-data/search%page%.json?callback=callback',
      list: 'test-data/list%page%.json?callback=callback' 
    });

If I've finished debugging and need to switch from debug mode to live mode during runtime (this is unlikely during production, but perhaps useful during development), you call the <code>reset</code> method:

    twitterlib.reset();








