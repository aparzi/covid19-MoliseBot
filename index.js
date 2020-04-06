const telegraf = require('telegraf');
const command = require('./enums/command');
const {TOKEN_BOT} = require('./config');
const dotenv = require('dotenv');
const cron = require('node-cron');
const mongoose = require('mongoose');
dotenv.config();

const bot = new telegraf(TOKEN_BOT);

const express = require('express');
const app = express();

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/test', function (req, res) {
    res.send('------------- SERVER START -------------')
});

app.listen(process.env.PORT || 3000, function(){
    console.log("------------- SERVER START -------------");
});

/** INFO COMMANDS **/
bot.command(command.INFOVIRUS, require('./controller/command/cmd_infovirus'));
bot.command(command.INFOSINTOMI, require('./controller/command/cmd_infosintomi'));
bot.command(command.INFODIFFUSIONE, require('./controller/command/cmd_infodiffusione'));


/** NORME COMMANDS **/
bot.command(command.CMD_SINTOMI, require('./controller/command/cmd_sintomi'));
bot.command(command.CMD_RACCOMANDAZIONI, require('./controller/command/cmd_raccomandazioni'));
bot.command(command.CMD_FAQ, require('./controller/command/cmd_faq'));


/** GENERAL COMMANDS **/
bot.command(command.CMD_HELP, require('./controller/command/cmd_help'));

/** CRONJOB **/
cron.schedule('30 17 * * *', require('./controller/cronjob/cron_scheda_riepilogativa'));

bot.start((message) => {
    console.info(`Started ${message.from.username}:`, message.from.id);
    return message.reply(`Ciao ${message.from.username}, posso aiutarti a rimanere aggiornato sulla situazione COVID-19 nella regione Molise. Scropri cosa posso fare /help` );
});

bot.startPolling();
