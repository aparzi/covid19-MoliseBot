const telegraf = require('telegraf');
const {TOKEN_BOT} = require('../../config');
const bot = new telegraf(TOKEN_BOT);
const User = require('../../model/user');

const cron_scheda_riepilogativa = async (ctx) => {
    try {
        const date = new Date().toISOString().split('T')[0].replace(/-/g, "");
        const file = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/4591a825a0dae36635f4da3cc4e2f6247dd21958/schede-riepilogative/regioni/dpc-covid19-ita-scheda-regioni-${date}.pdf`;

        let users = await User.find({});
        await asyncForEach(users, async (user) => {
            await bot.telegram.sendMessage(user.id_user, "Il seguente pdf rappresenta il bollettino nazionale, in cui è presente ovviamente il Molise. I dati sono rilasciati direttamente dalla Protezione Civile. 🤞🏻🤞🏻");
            await bot.telegram.sendDocument(user.id_user, file);
        });

    } catch (error) {
        console.error("[ERROR] => ", error);
        return ctx.reply('Non è stato possibile recuperare informazioni per tale richiesta! Riprova con un altro comando');
    }
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = cron_scheda_riepilogativa;
