// useful references
// https://blog.dennisokeeffe.com/blog/2020-07-11-twitter-bot/
// https://github.com/ttezel/twit
// https://developer.twitter.com/en/portal/projects/1338226004934893568/apps/19563410/keys
// https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/guides/standard-operators

require('dotenv').config()
const Twit = require('twit')

const T = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token: process.env.TWITTER_STEVEHIND_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_STEVEHIND_ACCESS_TOKEN_SECRET,
  })

T.get(
    'search/tweets',
    {
        q: 'from:stevehind',
        count: 100
    },
    function(err, data, response): Array<any> {
        //console.log(data)
        let statuses: Array<any> = data.statuses

        console.log(`All tweets: ${statuses.length}`);

        let to_delete = statuses.filter(tweet => (
            tweet.in_reply_to_status_id === null &&
            tweet.retweet_count === 0 &&
            tweet.favorite_count === 0
        ))

        console.log(`Length of tweets to delete: ${to_delete.length}`)

        to_delete.forEach(tweet => {
            console.log(`Would have deleted tweet id: https://twitter.com/stevehind/status/${tweet.id_str}`)
        })
        
        return to_delete
    }
).then(targets => {
    console.log(targets)
    
    targets.forEach(target => {
        T.post(
            'statuses/destroy/:id',
            {
                id: target.id_str
            },
            function(err, data, response) {
                console.log(data)
            }
        )
    });
})