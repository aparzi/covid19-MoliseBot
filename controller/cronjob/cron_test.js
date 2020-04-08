const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN_BOT);
const User = require('../../model/user');
const axios = require('axios');

const cron_test = async () => {
    let userIndex = undefined;

    try {
        console.info("INVIO RIEPILOGO DATI");

        // Recuper tutti gli utenti da notificare
        let users = await User.find({});

        // Recuper i dati delle regioni e filtrandoli per la regione Molise
        const URL = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json`;
        console.info("FILE => ", URL);
        let response = await axios.get(URL);
        let dati_molise = response.data.find(regione => regione.codice_regione == process.env.CODICE_REG_MOLISE);
        console.log(dati_molise);

        // Verifico che i dati della regione sono effettivamente presenti e notifico gli utenti
        if (dati_molise) {
            const header = `❕❗️ BOLLETTINO MOLISE ORE 18 (Protezione Civile) ❕❗\n\n`;
            const subheader = `Nelle ultime 24 ore nella regione Molise\n\n`;
            const totali = `🛑 <b>CASI TOTALI</b> ${dati_molise.totale_casi} \n ⭕️ <b>ATTUALMENTE POSITIVI</b> ${dati_molise.totale_positivi} \n 🧪 <b>TAMPONI EFFETTUATI</b> ${dati_molise.tamponi} \n 🆕 <b>NUOVI CASI</b> ${dati_molise.nuovi_positivi}`;

            const hr = `\n--------------------------------------\n`;

            const guariti = `✅ <b>DIMESSI E GUARITI</b> ${dati_molise.dimessi_guariti} \n`;
            const deceduti = `⚰️ <b>DECESSI</b> ${dati_molise.deceduti}`;

            const ricoverati_sintomi = `🤒<b>RICOVERATI CON SINTOMI</b> ${dati_molise.ricoverati_con_sintomi} \n`;
            const terapia_intensiva = `🔴<b>TERAPIA INTENSIVA</b> ${dati_molise.terapia_intensiva} \n`;
            const tot_ospedalizzati = `🏨<b>TOTALE OSPEDALIZZATI</b> ${dati_molise.totale_ospedalizzati} \n`;
            const is_domiciliare = `🏠<b>ISOLAMENTO DOMICILIARE</b> ${dati_molise.isolamento_domiciliare}`;

            await asyncForEach(users, async (user) => {
                userIndex = user;
                await bot.telegram.sendMessage(process.env.CHATID_TEST, `${header}${subheader}${totali}${hr}${guariti}${deceduti}${hr}${ricoverati_sintomi}${terapia_intensiva}${tot_ospedalizzati}${is_domiciliare}`, {parse_mode: 'HTML'});
            });
        } else {
            await asyncForEach(users, async (user) => {
                userIndex = user;
                await bot.telegram.sendMessage(process.env.CHATID_TEST, 'I dati della regione Molise non sono al momento disponibile. Potrei inviarli in seguito');
            });
        }

    } catch (error) {
        console.error("[ERROR] => ", error);
        await bot.telegram.sendMessage(process.env.CHATID_TEST, 'Non è stato possibile recuperare il bollettino regionale odierno. Scusami!!');
    }
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = cron_test;
