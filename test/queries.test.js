const { timeStamp } = require('console')
const { hasUncaughtExceptionCaptureCallback } = require('process')
const queries = require('../utils/queries')

test('returns list of best tweets as of 2020-12-20', async() => {
    expect(
        await queries.findBestTweets('stevehind')
        .then(result => {return result[0]})
        .catch(error => {return error})
    ).toBe("https://twitter.com/stevehind/status/1337858090427842562");
})