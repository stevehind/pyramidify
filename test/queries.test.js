const { timeStamp } = require('console')
const { hasUncaughtExceptionCaptureCallback } = require('process')
const queries = require('../utils/queries')

test('returns the best tweet from the list as of 2020-12-20', async() => {
    expect(
        await queries.findBestTweets('stevehind')
        .then(result => {return result.content[0]})
        .catch(error => {return error})
    ).toBe("https://twitter.com/stevehind/status/1337858090427842562");
})

test('returns a special message if user does not exist', async() => {
    expect(
        await queries.findBestTweets('stevehindzz')
        .then(result => {
            return result.content
        })
        .catch(error => {
            return error
        })
    ).toBe(
        "@stevehindzz doesn't exist or has a private account. Check your spelling."
        )
})

test('returns found_tweets as false if user string is provided but user does not exist', async() => {
    expect(
        await queries.findBestTweets('stevehindzz')
        .then(result => {
            return result.found_tweets
        })
        .catch(error => {
            return error
        })
    ).toBe(false)
})

test('returns found_tweets as false if user input is blank', async() => {
    expect(
        await queries.findBestTweets('')
        .then(result => {
            result.found_tweets
        })
        .catch(error => {
            console.log("Error is: %o", error)
            return error
        })
    ).toBe(false)
})

