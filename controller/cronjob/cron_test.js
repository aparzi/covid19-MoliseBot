const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN_BOT);

const cron_test = async () => {
    try {
        console.info("------ [ ESEGUO CRONJOB DI TEST ] ------");
        await bot.telegram.sendMessage(process.env.CHATID_TEST, "Messagio per testare il cronjob. 🤞🏻🤞🏻");
    } catch (error) {
        console.error("[ERROR] => ", error);
        await bot.telegram.sendMessage(process.env.CHATID_TEST, 'Non è stato possibile recuperare informazioni per tale richiesta! Riprova con un altro comando');
    }
};

module.exports = cron_test;
