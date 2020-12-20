require('dotenv').config();
var Twit = require('twit');
var T = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token: process.env.TWITTER_STEVEHIND_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_STEVEHIND_ACCESS_TOKEN_SECRET
});
var findBestTweets = function (user_handle) {
    var user_string = "from:" + user_handle;
    return T.get('search/tweets', {
        q: user_string,
        count: 100
    }).then(function (result) {
        var statuses = result.data.statuses;
        var best_tweets = statuses.filter(function (tweet) { return (!tweet.retweeted_status &&
            tweet.retweet_count > 0 ||
            tweet.favorite_count > 0); }).sort(function (a, b) { return ((a.favorite_count + a.retweet_count * 5) > (b.favorite_count + b.retweet_count * 5) // count a retweet as worth five likes when making the ranking
        ) ? 1 : -1; }).reverse();
        var best_tweets_urls = best_tweets.map(function (tweet) {
            return "https://twitter.com/" + user_handle + "/status/" + tweet.id_str;
        });
        return Promise.resolve(best_tweets_urls);
    })["catch"](function (err) {
        return Promise.reject({
            error: err
        });
    });
};
var queries = {
    findBestTweets: findBestTweets
};
module.exports = queries;
