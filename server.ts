
const express = require('express')
const app = express()
const port = process.env.port || 3000
const path = require('path')

// Import functions
const utils_queries = require('./utils/queries');

// Bodyparser middleware
const bodyParser = require('body-parser');
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());

// Set up pug templating engine
app.set('view engine', 'pug')
app.use(express.static(__dirname + "/public"))

app.get('/', function (req, res) {
    res.render('index')
})

//Return the three best tweets for a given user
app.post('/lookup', function (req, res) {
    let handle = req.body.handle

    utils_queries.findBestTweets(handle).then(result => {
        if (result.found_tweets) {
            let urls = result.content;

            res.render('name', {
                title: `@${handle}'s best tweets`,
                message: `@${handle}'s best recent tweets are...`,
                tweet_url_1: `${urls[0]}`,
                tweet_url_2: `${urls[1]}`,
                tweet_url_3: `${urls[2]}`
            })
        } else if (result.not_found_message) {
            res.render('name', {
                title: 'Try someone else',
                message: `${result.not_found_message}`
            })
        } else if (result.tsdheo) {
            res.render('name', ({
                title: 'Doug only does bad tweets',
                message: `${result.tsdheo}`
            }))
        } else if (result.error) {
            res.render('name', {
                title: 'Try again',
                message: "We couldn't recongize that input. Try again!"
            })
        }
    })
    .catch(err => { console.error(err)})
})

// Run the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})