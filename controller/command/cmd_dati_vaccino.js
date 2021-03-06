const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

const cmd_dati_vaccino = async (ctx) => {
    try {
        console.info("INVIO RIEPILOGO DATI VACCINO");

        const URL_VACCINI_SUMMARY_LATEST = `https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/vaccini-summary-latest.json`;
        console.info("FILE => ", URL_VACCINI_SUMMARY_LATEST);

        let response = await axios.get(URL_VACCINI_SUMMARY_LATEST);

        let dati_vaccino_molise = response.data.data.find(regione => regione.codice_regione_ISTAT == process.env.CODICE_REG_MOLISE);
        console.log(dati_vaccino_molise);

        if (dati_vaccino_molise) {
            const header = `🧪🧪 PIANO VACCINALE REGIONE MOLISE \n\n`;
            const subheader = `Dati aggiornati del piano vaccinale in Molise\n\n`;

            const dosi_consegnate = `📦️ <b>DOSI CONSEGNATE:</b> ${dati_vaccino_molise.dosi_consegnate} \n`;
            const dosi_somministrate = `✅ <b>DOSI SOMMINISTRATE:</b> ${dati_vaccino_molise.dosi_somministrate} \n`;
            const percentuale_somministrazione = `📊 <b>PERCENTUALE:</b> ${dati_vaccino_molise.percentuale_somministrazione}% \n`;
            const ultimo_aggiornamento = `📅 <b>AGGIORNAMENTO:</b> ${dati_vaccino_molise.ultimo_aggiornamento.split('T')[0]}`;

            await ctx.reply(`${header}${subheader}${dosi_consegnate}${dosi_somministrate}${percentuale_somministrazione}${ultimo_aggiornamento}`, {parse_mode: 'HTML'});

        } else {
            await ctx.reply('I dati della regione Molise non sono al momento disponibili. Puoi riprovare se vuoi o ci penserò direttamente io ad aggiornarti!');
        }
    } catch (error) {
        console.error("[ ERRORE GENERICO DATI VACCINO ] => ", error);
    }
};

module.exports = cmd_dati_vaccino;
