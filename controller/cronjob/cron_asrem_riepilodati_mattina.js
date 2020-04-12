const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN_BOT);
const User = require('../../model/user');
const urlExist = require("url-exist");

const cron_asrem_riepilogodati_mattina = async () => {
    try {
        console.info("INVIO RISORSA ASREM RIEPILOGO DATI MATTINA");

        const date = new Date().toISOString().split('T')[0].replace(/-/g, "");
        const file = `https://raw.githubusercontent.com/aparzi/covid19-MoliseBot/master/dati-asrem/riepilogo-dati/riepilogodati_${date}.jpg`;

        console.info("DATA => ", date);
        console.info("FILE => ", file);

        const checkUrl = await urlExist(file);
        if (checkUrl) {
            let users = await User.find({});
            await asyncForEach(users, async (user) => {
                try {
                    await bot.telegram.sendDocument(user.id_user, file);
                    await bot.telegram.sendMessage(user.id_user, "Il documento inviato rappresenta il riepilogo dati del Molise delle ore 11. I dati sono rilasciati direttamente dall' ASREM (Azienda Sanitatia Regionale del Molise). 📊🏨");
                } catch (error) {
                    console.error("[ ERRORE INVIO ASREM RIEPILOGO DATI MATTINA ] => ", error);
                    console.error("[ UTENTE NON NOTIFICATO ] => ", user);
                }
            });
        } else {
            console.info(` [CRON RISORSA ASREM RIEPILOGO DATI MATTINA] => Il file ${file} non è disponibile!!`)
        }

    } catch (error) {
        console.error("[ ERRORE GENERICO ASREM RIEPILOGO DATI MATTINA ] => ", error);
    }
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = cron_asrem_riepilogodati_mattina;
