const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN_BOT);
const User = require('../../model/user');
const axios = require('axios');

const cron_dati_vaccino = async () => {
    try {
        console.info("INVIO RIEPILOGO DATI VACCINO");

        // Recupero tutti gli utenti da notificare
        let users = await User.find({});

        const URL_VACCINI_SUMMARY_LATEST = `https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/vaccini-summary-latest.json`;
        console.info("FILE => ", URL_VACCINI_SUMMARY_LATEST);

        let response = await axios.get(URL_VACCINI_SUMMARY_LATEST);

        let dati_vaccino_molise = response?.data?.data.find(regione => regione.codice_regione_ISTAT == process.env.CODICE_REG_MOLISE);
        console.log(dati_vaccino_molise);

        // Verifico che i dati della regione sono effettivamente presenti e notifico gli utenti
        if (dati_vaccino_molise) {
            const header = `🧪🧪 PIANO VACCINALE REGIONE MOLISE \n\n`;
            const subheader = `Dati aggiornati del piano vaccinale in Molise\n\n`;

            const dosi_consegnate = `📦️ <b>DOSI CONSEGNATE:</b> ${dati_vaccino_molise?.dosi_consegnate} \n`;
            const dosi_somministrate = `✅ <b>DOSI SOMMINISTRATE:</b> ${dati_vaccino_molise?.dosi_somministrate} \n`;
            const percentuale_somministrazione = `📊 <b>PERCENTUALE:</b> ${dati_vaccino_molise?.percentuale_somministrazione}% \n`;
            const ultimo_aggiornamento = `📅 <b>AGGIORNAMENTO:</b> ${dati_vaccino_molise?.ultimo_aggiornamento.split('T')[0]}`;

            await asyncForEach(users, async (user) => {
                try {
                    await bot.telegram.sendMessage(user.id_user, `${header}${subheader}${dosi_consegnate}${dosi_somministrate}${percentuale_somministrazione}${ultimo_aggiornamento}`, {parse_mode: 'HTML'});
                } catch (error) {
                    console.error("[ ERRORE MESSAGGIO RIEPILOGO DATI ] => ", error);
                    console.error("[ UTENTE NON NOTIFICATO ] => ", user);
                }
            });
        } else {
            await asyncForEach(users, async (user) => {
                try {
                    await bot.telegram.sendMessage(user.id_user, 'I dati della regione Molise non sono al momento disponibili. Puoi riprovare se vuoi o ci penserò direttamente io ad aggiornarti!');
                } catch (error) {
                    console.error("[ ERRORE MESSAGGIO DATI VACCINI NON DISPONIBILI ] => ", error);
                    console.error("[ UTENTE NON NOTIFICATO ] => ", user);
                }
            });
        }
    } catch (error) {
        console.error("[ ERRORE GENERICO DATI VACCINO ] => ", error);
    }
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = cron_dati_vaccino;
