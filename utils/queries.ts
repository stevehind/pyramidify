require('dotenv').config()
const Twit = require('twit')

interface findBestTweetsResult {
    found_tweets: boolean,
    content?: Array<string>,
    not_found_message?: string,
    error?: string
    tsdheo?: string
}

const T = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token: process.env.TWITTER_STEVEHIND_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_STEVEHIND_ACCESS_TOKEN_SECRET,
  })
  
const findBestTweets = (user_handle: string): Promise<findBestTweetsResult> => {
    
    if (user_handle != undefined) {
        user_handle = user_handle.toLowerCase();
        if (user_handle.charAt(0) === '@') {
            user_handle = user_handle.substring(1)
        }
    } 

    if (user_handle === "tsdheo") {
        return Promise.resolve({
            handle: user_handle,
            found_tweets: false,
            tsdheo: `Wow, that's weird, we can't find any good tweets by @${user_handle}. Checks out, I guess.`
        })
    }
    else if (user_handle) {
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
                    handle: user_handle,
                    found_tweets: false,
                    not_found_message: `@${user_handle} doesn't exist or has a private account. Check your spelling.`
                })
            } else {
                let best_tweets = statuses.filter(tweet => (
                    !tweet.retweeted_status && 
                    tweet.retweet_count > 0 ||
                    tweet.favorite_count > 0
                )).sort((a,b) => (
                    (a.favorite_count + a.retweet_count * 5) > (b.favorite_count + b.retweet_count * 5) // count a retweet as worth five likes when making the ranking
                ) ? 1 : -1).reverse()
        
                if (best_tweets.length > 0) {
                    let best_tweets_urls = best_tweets.map(tweet => {
                        return `https://twitter.com/${user_handle}/status/${tweet.id_str}`
                    })
            
                    return Promise.resolve({
                        handle: user_handle,
                        found_tweets: true,
                        content: best_tweets_urls
                    })
                } else {
                    return Promise.resolve({
                        handle: user_handle,
                        found_tweets: false,
                        error: "This user has no recent good tweets (at least as defined by the crowd...)."
                    })
                }
            }
        })
        .catch((err) => {
            return Promise.reject({
                handle: user_handle,
                found_tweets: false,
                error: err
            })
        })
    } else {
        return Promise.resolve({
            handle: user_handle,
            found_tweets: false,
            error: 'No input or undefined input.'
        })
    }

    
}

const queries = {
    findBestTweets: findBestTweets
}

module.exports = queries;