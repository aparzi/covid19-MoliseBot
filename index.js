const telegraf = require('telegraf');
const command = require('./enums/command');
const {TOKEN_BOT} = require('./config');
const bot = new telegraf(TOKEN_BOT);

/** INFO COMMANDS **/
bot.command(command.INFOVIRUS, require('./controller/cmd_infovirus'));
bot.command(command.INFOSINTOMI, require('./controller/cmd_infosintomi'));
bot.command(command.INFODIFFUSIONE, require('./controller/cmd_infodiffusione'));


/** NORME COMMANDS **/
bot.command(command.CMD_SINTOMI, require('./controller/cmd_sintomi'));
bot.command(command.CMD_RACCOMANDAZIONI, require('./controller/cmd_raccomandazioni'));
bot.command(command.CMD_FAQ, require('./controller/cmd_faq'));


/** GENERAL COMMANDS **/
bot.command(command.CMD_HELP, require('./controller/cmd_help'));

console.log(" ------------- SERVER START -------------  ");

bot.start((message) => {
    console.info(`Started ${message.from.username}:`, message.from.id);
    return message.reply(`Ciao ${message.from.username}, posso aiutarti a rimanere aggiornato sulla situazione COVID-19 nella regione Molise. Scropri cosa posso fare /help` );
});

bot.startPolling();
