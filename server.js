'use strict'
const log = console.log;
const express = require('express');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');

// Express
const app = express();
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')// middleware for parsing HTTP body from client
app.use(bodyParser.json());
/* version   version: '2018-11-08' */
const assistant = new AssistantV1({
    version: '2019-01-26',
    username: 'apikey',
    password: 'LkSfRednXKSAAJtDgOoVc3ij-NbRdpdHt-XvNWtGzMhf'
    // url: 'https://gateway.watsonplatform.net/assistant/api/v1/workspaces/fc5cf9a5-7654-4871-85a5-d44cc8d59ead/message'
  });

// To fix the 'TypeError: Origin http://localhost:3000 is not allowed by Access-Control-Allow-Origin.' Error
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


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
    // res.send(input);
    assistant.message({
        workspace_id: 'fc5cf9a5-7654-4871-85a5-d44cc8d59ead',
        input: {'text': input},
        headers: {
        'Custom-Header': 'custom',
        'Accept-Language': 'custom'
        }
    },  function(err, result, response) {
        if (err)
            res.status(404).send(err);
        else
            // res.send(result);
            res.send(JSON.stringify(result.output.text[0], null, 2))
    });
})

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
