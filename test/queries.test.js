const { timeStamp } = require('console')
const { hasUncaughtExceptionCaptureCallback } = require('process')
const queries = require('../utils/queries')

test('returns the best tweet from the list as of 2020-12-20', async() => {
    expect(
        await queries.findBestTweets('stevehind')
        .then(result => {return result.content[0]})
        .catch(error => {return error})
    ).toBe("https://twitter.com/stevehind/status/1341227705207910400");
})


test("returns found_tweet false and not_found_message if user doesn't exist", async() => {
    expect(
        await queries.findBestTweets('stevehindzz')
        .then(result => {
            return result
        })
        .catch(error => {
            return error
        })
    ).toStrictEqual({
        found_tweets: false,
        not_found_message: "@stevehindzz doesn't exist or has a private account. Check your spelling."
    })
})

test('returns found_tweets as false if user input is undefined', async() => {
    expect(
        await queries.findBestTweets('')
        .then(result => {
            return result
        })
        .catch(error => {
            return error
        })
    ).toStrictEqual({
        found_tweets: false,
        error: 'No input or undefined input.'
    })
})

test('makes fund of doug is the user is tsdheo', async() => {
    expect(
        await queries.findBestTweets('tsdheo')
        .then(result => {
            return result
        })
        .catch(error => {
            return error
        })
    ).toStrictEqual({
        found_tweets: false,
        tsdheo: "Wow, that's weird, we can't find any good tweets by @tsdheo. Checks out, I guess."
    })
})

test('returns a private account response for a private account', async() => {
    expect(
        await queries.findBestTweets('davidtrinh')
        .then(result => {
            return result
        })
        .catch(error => {
            return error
        })
    ).toStrictEqual({
        found_tweets: false,
        not_found_message: "@davidtrinh doesn't exist or has a private account. Check your spelling."
    })
})

test('returns found_tweets false and error when user is {space}', async() => {
    expect(
        await queries.findBestTweets(' ')
        .then(result => {
            return result
        })
        .catch(error => {
            return error
        })
    ).toStrictEqual({
        found_tweets: false,
        error: "This user has no recent good tweets (at least as defined by the crowd...)."
    })
})

