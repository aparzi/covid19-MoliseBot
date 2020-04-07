const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN_BOT);
const User = require('../../model/user');

const cron_scheda_riepilogativa = async () => {
    let userIndex = undefined;

    try {
        console.info("INVIO SCHEDA RIEPILOGATIVA");

        const date = new Date().toISOString().split('T')[0].replace(/-/g, "");
        const file = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/schede-riepilogative/regioni/dpc-covid19-ita-scheda-regioni-${date}.pdf`;

        console.info("DATA => ", date);
        console.info("FILE => ", file);

        let users = await User.find({});
        await asyncForEach(users, async (user) => {
            userIndex = user;
            await bot.telegram.sendDocument(user.id_user, file);
            await bot.telegram.sendMessage(user.id_user, "Il documento inviato rappresenta il bollettino nazionale. I dati sono rilasciati direttamente dalla Protezione Civile. 🤞🏻🤞🏻");
        });

    } catch (error) {
        console.error("[ERROR] => ", error);
        await bot.telegram.sendMessage(userIndex.id_user, 'Non è stato possibile recuperare il bollettino nazionale odierno. Scusami!!!');
    }
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = cron_scheda_riepilogativa;
