const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const command = require('./enums/command');
const cron = require('node-cron');
const mongoose = require('mongoose');
const axios = require('axios');

const bot = new telegraf(process.env.TOKEN_BOT);

const express = require('express');
const app = express();

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
    console.info('Mongoose is connected!!!!')
});

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
bot.start(require('./controller/command/cmd_start'));

/** CRONJOB **/
cron.schedule('30 17 * * *', require('./controller/cronjob/cron_scheda_riepilogativa'));
cron.schedule('* * * * *', async function () {
    console.info("----- ESEGUITO JOB [CHIAMATA TEST] ------");
    await axios.get('https://bot-covid19-molise.herokuapp.com/test');
});

bot.startPolling();
