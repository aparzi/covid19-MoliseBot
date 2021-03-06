const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN_BOT);
const User = require('../../model/user');
const urlExist = require("url-exist");

const cron_asrem_seriestorica = async () => {
    try {
        console.info("INVIO RISORSA ASREM SERIE STORICA");

        const date = new Date().toISOString().split('T')[0].replace(/-/g, "");
        const file = `https://raw.githubusercontent.com/aparzi/covid19-MoliseBot/master/dati-asrem/serie-storica/seriestorica_${date}.jpg`;

        console.info("DATA => ", date);
        console.info("FILE => ", file);

        const checkUrl = await urlExist(file);
        if (checkUrl) {
            let users = await User.find({});
            await asyncForEach(users, async (user) => {
                try {
                    await bot.telegram.sendDocument(user.id_user, file);
                    await bot.telegram.sendMessage(user.id_user, "Il documento inviato mostra la serie storica sull'andamento contagi in Molise. I dati sono rilasciati direttamente dall' ASREM (Azienda Sanitatia Regionale del Molise). 📊🏨");
                } catch (error) {
                    console.error("[ ERRORE INVIO SERIE STORICA ] => ", error);
                    console.error("[ UTENTE NON NOTIFICATO ] => ", user);
                }
            });
        } else {
            console.info(` [CRON RISORSA ASREM SERIE STORICA] => Il file ${file} non è disponibile!!`)
        }

    } catch (error) {
        console.error("[ ERRORE GENERICO ASREM SERIE STORICA ] => ", error);
    }
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = cron_asrem_seriestorica;
