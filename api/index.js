var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '1733547356:AAEOX7oG_z09vS34M-DUHOm5YCPsXYDXohg'
const bot = new TelegramBot(token, {polling: true});


// bots
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /predict`
    );   
});

//input requires i and v
state = 0;
bot.onText(/\/predict/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `Masukan nilai i|v. Contohnya 6|2`
    );
    state = 1;
});

// routers
r.get('/prediction/:i/:r', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.i), // string to float
            parseFloat(req.params.r)
        ]
    ).then((jres)=>{
        res.json(jres);
    })
});

module.exports = r;
