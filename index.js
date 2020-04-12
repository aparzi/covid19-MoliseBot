const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const command = require('./enums/command');
const action = require('./enums/action');
const cron = require('node-cron');
const mongoose = require('mongoose');
const axios = require('axios');

const bot = new telegraf(process.env.TOKEN_BOT);

const express = require('express');
const app = express();


/** MONGO CONNECTION **/
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
    console.info('Mongoose is connected!!!!')
});

/** EXPRESS API **/
app.get('/test', function (req, res) {
    res.send('------------- SERVER START -------------')
});

app.get('/bot/trigger/newfeature', require('./controller/cronjob/cron_new_features'));

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
bot.command(command.CMD_MODULO_SPOSTAMENTI, require('./controller/command/cmd_modulo_spostamenti'));
bot.command(command.CMD_ATTIVITA_APERTE, require('./controller/command/cmd_attivita_aperte'));


/** GENERAL COMMANDS **/
bot.command(command.CMD_HELP, require('./controller/command/cmd_help'));
bot.start(require('./controller/command/cmd_start'));

/** DATA COMMANDS **/
bot.command(command.DATA_LAST, require('./controller/command/cmd_last_data'));

/** CRONJOB - mm hh **/
cron.schedule('15 09 * * *', require('./controller/cronjob/cron_test'));
cron.schedule('20 18 * * *', require('./controller/cronjob/cron_riepilogo_dati'));
cron.schedule('30 18 * * *', require('./controller/cronjob/cron_scheda_riepilogativa'));
cron.schedule('00 13 * * *', require('./controller/cronjob/cron_asrem_riepilodati_mattina'));
cron.schedule('15 20 * * *', require('./controller/cronjob/cron_asrem_riepilopaesi'));
if (process.env.NODE_ENV == 'production') {
    cron.schedule('* * * * *', async function () {
        console.info("----- ESEGUITO JOB [CHIAMATA TEST] ------");
        await axios.get('https://bot-covid19-molise.herokuapp.com/test');
    });
}

/** ACTION REGISTRER **/
bot.action(action.NATIONAL_DATA, require('./controller/action/action_scheda_riepilogativa'));
bot.action(action.REGIONAL_DATA, require('./controller/action/action_riepilogo_dati'));
bot.action(action.PROVINCE_DATA, require('./controller/action/action_dati_province'));

// Default response
bot.on('text', ctx => ctx.reply('Mi dispiace ma non riesco a capire cosa desideri. Prova il comando /help per visualizzare in cosa posso aiutarti. Grazie'));

bot.startPolling();
