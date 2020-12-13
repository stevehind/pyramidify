require('dotenv').config();
var Twit = require('twit');
var T = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token: process.env.TWITTER_STEVEHIND_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_STEVEHIND_ACCESS_TOKEN_SECRET
});
T.get('search/tweets', {
    q: 'from:stevehind',
    count: 100
}, function (err, data, response) {
    //console.log(data)
    var statuses = data.statuses;
    console.log("All tweets: " + statuses.length);
    var to_delete = statuses.filter(function (tweet) { return (tweet.in_reply_to_status_id === null &&
        tweet.retweet_count === 0 &&
        tweet.favorite_count === 0); });
    console.log("Length of tweets to delete: " + to_delete.length);
    to_delete.forEach(function (tweet) {
        console.log("Would have deleted tweet id: https://twitter.com/stevehind/status/" + tweet.id_str);
    });
    return to_delete;
}).then(function (targets) {
    console.log("Targets: %o", targets);
    targets.forEach(function (target) {
        T.post('statuses/destroy/:id', {
            id: target.id_str
        }, function (err, data, response) {
            console.log(data);
        });
    });
});
