require('dotenv').config()
const Twit = require('twit')

interface findTweetErrorObject {
    error: string
}

const T = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token: process.env.TWITTER_STEVEHIND_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_STEVEHIND_ACCESS_TOKEN_SECRET,
  })
  
const findBestTweets = (user_handle: string): Promise<Array<string>> | Promise<findTweetErrorObject> => {
    
    var user_string:string =  `from:${user_handle}`;

    return T.get(
        'search/tweets',
        {
            q: user_string,
            count: 100
        }
    ).then(result => {
        let statuses: Array<any> = result.data.statuses

        if (statuses.length === 0) {
            return Promise.resolve({
                found_tweets: false,
                content: `@${user_handle} doesn't exist or has a private account. Check your spelling.`
            })
        } else {
            let best_tweets = statuses.filter(tweet => (
                !tweet.retweeted_status && 
                tweet.retweet_count > 0 ||
                tweet.favorite_count > 0
            )).sort((a,b) => (
                (a.favorite_count + a.retweet_count * 5) > (b.favorite_count + b.retweet_count * 5) // count a retweet as worth five likes when making the ranking
            ) ? 1 : -1).reverse()
    
            let best_tweets_urls = best_tweets.map(tweet => {
                return `https://twitter.com/${user_handle}/status/${tweet.id_str}`
            })
    
            return Promise.resolve({
                found_tweets: true,
                content: best_tweets_urls
            })
        }
    })
    .catch((err) => {
        return Promise.reject({
            found_tweets: false,
            error: err
        })
    })
}

const queries = {
    findBestTweets: findBestTweets
}

module.exports = queries;