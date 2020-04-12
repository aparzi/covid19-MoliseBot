const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN_BOT);
const User = require('../../model/user');
const urlExist = require("url-exist");

const cron_scheda_riepilogativa = async () => {
    try {
        console.info("INVIO RISORSA ASREM RIEPILOGO PAESI");

        const date = new Date().toISOString().split('T')[0].replace(/-/g, "");
        const file = `https://raw.githubusercontent.com/aparzi/covid19-MoliseBot/master/dati-asrem/paesi-contagiati/riepilogopaesi_20200411.jpg`;

        console.info("DATA => ", date);
        console.info("FILE => ", file);

        const checkUrl = await urlExist(file);
        if (checkUrl) {
            let users = await User.find({});
            await asyncForEach(users, async (user) => {
                try {
                    await bot.telegram.sendDocument(process.env.CHATID_TEST, file);
                    await bot.telegram.sendMessage(process.env.CHATID_TEST, "Il documento inviato rappresenta il riepilogo dei contagi nei comuni molisani. I dati sono rilasciati direttamente dall' ASREM (Azienda Sanitatia Regionale del Molise). 📊🏨");
                } catch (error) {
                    console.error("[ ERRORE INVIO SCHEDA RIEPILOGATIVA ] => ", error);
                    console.error("[ UTENTE NON NOTIFICATO ] => ", user);
                }
            });
        } else {
            console.info(` [CRON RISORSA ASREM RIEPILOGO PAESI] => Il file ${file} non è disponibile!!`)
        }

    } catch (error) {
        console.error("[ ERRORE GENERICO SCHEDA RIEPILOGATIVA ] => ", error);
    }
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = cron_scheda_riepilogativa;
