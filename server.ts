
const express = require('express')
const app = express()
const port = process.env.port || 3000
const path = require('path')
import getGeneratedResponse from './response'

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

// Return the prompt and its result
app.get('/prompt/', function (req, res) {
    let prompt: string = req.query.prompt;

    getGeneratedResponse(prompt).then((result) => {
        let displayResult = result;
        res.render('result', {prompt: prompt, result: displayResult})
    })
    .catch((err) => {
        console.log(err.message);
        res.render('result', {prompt: prompt, result: "Error"})
    })
})

// Run the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})