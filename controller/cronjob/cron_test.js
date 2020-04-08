const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN_BOT);

const cron_test = async () => {
    try {
        console.info("------ [ ESEGUO CRONJOB DI TEST ] ------");
        await bot.telegram.sendMessage(process.env.CHATID_TEST, "Il documento inviato rappresenta il bollettino regionale nazionale. I dati sono rilasciati direttamente dalla Protezione Civile. 🤞🏻🤞🏻");
        await bot.telegram.sendMessage(process.env.CHATID_TEST, "Messagio per testare il cronjob. 🤞🏻🤞🏻");
    } catch (error) {
        console.error("[ERROR] => ", error);
        await bot.telegram.sendMessage(process.env.CHATID_TEST, 'Non è stato possibile recuperare informazioni per tale richiesta! Riprova con un altro comando');
    }
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = cron_test;
