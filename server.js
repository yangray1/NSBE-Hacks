'use strict'
const log = console.log;
const express = require('express');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const path = require('path')

// Express
const app = express();
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')// middleware for parsing HTTP body from client
app.use(bodyParser.json());

const assistant = new AssistantV1({
    version: '2019-02-16',
    username: 'apikey',
    // password: 'LkSfRednXKSAAJtDgOoVc3ij-NbRdpdHt-XvNWtGzMhf' // old chat bot.
    password: "WIjn8JzSAE2gFKnDjhd3A48apUCMfTr1SJ0RSF2ff4VI"
  });

// To fix the 'TypeError: Origin http://localhost:3000 is not allowed by Access-Control-Allow-Origin.' Error
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


/** 
 * For heroku.
 * 
 * Upon building react app, creates a 'build' folder in react-app.
 * Set the static page to that
 */
app.use(express.static(path.resolve(__dirname, 'react-app/build')));

/** 
 * For heroku. 
 * 
 * Go to react's index.html page if we recieve any request that we havent specified.
 * React app: - upon building- creates a 'build' folder under react-app.
 *            - build folder contains index.html
 */
app.get('/*',(req,res) => {
    // Need this, need build script + react-scripts dependency installed. (on both server.js and react module). Only on express?
    // res.send("DSAFDDFGSA")
    // app.use(express.static(path.resolve(__dirname, 'react-app/build')));
    res.sendFile(path.join(__dirname+'/react-app/build/index.html'));
})


/**
  Request body expects:
    {
        "input": <message input>
    }
 */
app.post('/api/sendMessage', (req,res) => {
    const input = req.body.input;
    
    if (!input){
        res.status(404).send();
    }
    assistant.message({
        // workspace_id: 'fc5cf9a5-7654-4871-85a5-d44cc8d59ead', // old workspace id
        workspace_id: '1387f8e1-faa1-4ded-b7af-9f5d262358a4',
        input: {'text': input},
        headers: {
        'Custom-Header': 'custom',
        'Accept-Language': 'custom'
        }
    },  function(err, result, response) {
        if (err)
            res.status(494).send(err);
        else
            res.send(JSON.stringify(result.output.text[0], null, 2))
    });
})

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
