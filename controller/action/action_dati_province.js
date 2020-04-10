const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

const action_riepilogo_dati = async (ctx) => {
    try {
        console.info("RICHIESTA DATI PROVINCE");

        // Recuper i dati delle regioni e filtrandoli per la regione Molise
        const URL = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province-latest.json`;
        console.info("FILE => ", URL);
        let response = await axios.get(URL);
        let dati_prov_molise = response.data.filter(regione => regione.codice_regione == process.env.CODICE_REG_MOLISE);
        console.log(dati_prov_molise);

        if (dati_prov_molise) {
            let datiCampobasso = dati_prov_molise.find(prov => prov.codice_provincia == process.env.CODICE_PROV_CB);
            let datiIsernia = dati_prov_molise.find(prov => prov.codice_provincia == process.env.CODICE_PROV_IS);
            let datiOther = dati_prov_molise.find(prov => prov.codice_provincia == process.env.CODICE_PROV_OTHER);

            const header = `❕❗️ CASI TOTALI IN MOLISE ❕❗\n\n`;
            const subheader = `I casi totali registrati in Molise suddivisi per province\n\n`;

            const campobasso = `▫️ <b>CAMPOBASSO</b> ${datiCampobasso.totale_casi} \n`;
            const isernia = `▫️ <b>ISERNIA</b> ${datiIsernia.totale_casi} \n`;
            const other = `▫️ <b>ALTRE REGIONI</b> ${datiOther.totale_casi} \n\n`;

            const totale = `▫️ <b>TOTALE</b> ${datiCampobasso.totale_casi + datiIsernia.totale_casi + datiOther.totale_casi} \n`;

            await ctx.reply(`${header}${subheader}${campobasso}${isernia}${other}${totale}`, {parse_mode: 'HTML'});
            await ctx.reply(`Il bollettino di cui sopra 👆🏻👆🏻 è quello più recente che sono riuscito a recuperare, per quanto riguarda la suddivisione in province, dei casi registrati in Molise. 👍🏻👍🏻`);
        } else {
            await ctx.reply('I dati relativi alle province non sono al momento disponibili. Potrei inviarli in seguito');
        }

    } catch (error) {
        console.error("[ ERRORE GENERICO RICHIESTA PROV ] => ", error);
        await ctx.reply('Non è stato possibile recuperare i dati relativi alle province. Scusami!!!');
    }
};

module.exports = action_riepilogo_dati;
