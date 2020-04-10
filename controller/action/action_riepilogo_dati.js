const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

const action_riepilogo_dati = async (ctx) => {
    try {
        console.info("RICHIESTA RIEPILOGO DATI");

        // Recupero i dati delle regioni e filtrandoli per la regione Molise
        const URL_REGIONI = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json`;
        console.info("FILE => ", URL_REGIONI);

        // Recupero i dati delle province e filtrandoli per la regione Molise
        const URL_PROVINCE = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province-latest.json`;
        console.info("FILE => ", URL_PROVINCE);
        
        let response_regioni = await axios.get(URL_REGIONI);
        let response_province = await axios.get(URL_PROVINCE);
        
        let dati_reg_molise = response_regioni.data.find(regione => regione.codice_regione == process.env.CODICE_REG_MOLISE);
        console.log(dati_reg_molise);

        let dati_prov_molise = response_province.data.filter(regione => regione.codice_regione == process.env.CODICE_REG_MOLISE);
        console.log(dati_prov_molise);

        // Verifico che i dati della regione sono effettivamente presenti e notifico gli utenti
        if (dati_reg_molise && dati_prov_molise) {
            const header = `❕❗️ BOLLETTINO DEI DATI ORE 18 (Protezione Civile) ❕❗\n\n`;
            const subheader = `I dati aggiornati relativi alla regione Molise\n\n`;
            const totali = `🛑 <b>CASI TOTALI</b> ${dati_reg_molise.totale_casi} (+${dati_reg_molise.nuovi_positivi}) \n ⭕️ <b>ATTUALMENTE POSITIVI</b> ${dati_reg_molise.totale_positivi} \n 🧪 <b>TAMPONI EFFETTUATI</b> ${dati_reg_molise.tamponi}`;

            const hr = `\n--------------------------------------\n`;

            const guariti = `✅ <b>DIMESSI E GUARITI</b> ${dati_reg_molise.dimessi_guariti} \n`;
            const deceduti = `⚰️ <b>DECESSI TOTALI</b> ${dati_reg_molise.deceduti}`;

            const ricoverati_sintomi = `🤒<b>RICOVERATI CON SINTOMI</b> ${dati_reg_molise.ricoverati_con_sintomi} \n`;
            const terapia_intensiva = `🔴<b>TERAPIA INTENSIVA</b> ${dati_reg_molise.terapia_intensiva} \n`;
            const tot_ospedalizzati = `🏨<b>TOTALE OSPEDALIZZATI</b> ${dati_reg_molise.totale_ospedalizzati} \n`;
            const is_domiciliare = `🏠<b>ISOLAMENTO DOMICILIARE</b> ${dati_reg_molise.isolamento_domiciliare}`;

            let datiCampobasso = dati_prov_molise.find(prov => prov.codice_provincia == process.env.CODICE_PROV_CB);
            let datiIsernia = dati_prov_molise.find(prov => prov.codice_provincia == process.env.CODICE_PROV_IS);
            let datiOther = dati_prov_molise.find(prov => prov.codice_provincia == process.env.CODICE_PROV_OTHER);

            const campobasso = `▫️ <b>CAMPOBASSO</b> ${datiCampobasso.totale_casi} \n`;
            const isernia = `▫️ <b>ISERNIA</b> ${datiIsernia.totale_casi} \n`;
            const other = `▫️ <b>ALTRE REGIONI</b> ${datiOther.totale_casi} \n\n`;

            await ctx.reply(`${header}${subheader}${totali}${hr}${guariti}${deceduti}${hr}${ricoverati_sintomi}${terapia_intensiva}${tot_ospedalizzati}${is_domiciliare}${hr}${campobasso}${isernia}${other}`, {parse_mode: 'HTML'});
            await ctx.reply(`Il bollettino di cui sopra 👆🏻👆🏻 è quello più recente che sono riuscito a recuperare per quanto riguarda la regione Molise. 👍🏻👍🏻`);
            await ctx.answerCbQuery();

        } else {
            await ctx.reply('I dati della regione Molise non sono al momento disponibile. Potrei inviarli in seguito');
            await ctx.answerCbQuery();
        }

    } catch (error) {
        console.error("[ERROR] => ", error);
        await ctx.reply('Non è stato possibile recuperare l\'ultimo bollettino regionale. Scusami!!!');
        await ctx.answerCbQuery();
    }
};

module.exports = action_riepilogo_dati;
