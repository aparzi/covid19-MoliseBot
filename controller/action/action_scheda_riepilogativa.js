const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN_BOT);
const urlExist = require("url-exist");

const action_scheda_riepilogativa = async (ctx) => {
    try {
        console.info("RICHIESTA SCHEDA RIEPILOGATIVA");

        let date = new Date().toISOString().split('T')[0].replace(/-/g, "");
        console.info("DATA => ", date);

        let file = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/schede-riepilogative/regioni/dpc-covid19-ita-scheda-regioni-${date}.pdf`;
        console.info("FILE => ", file);

        const checkUrl = await urlExist(file);
        if (checkUrl) {
            await bot.telegram.sendDocument(ctx.from.id, file);
        } else {
            // remove a day
            let yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday = yesterday.toISOString().split('T')[0].replace(/-/g, "");
            let file = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/schede-riepilogative/regioni/dpc-covid19-ita-scheda-regioni-${yesterday}.pdf`;
            await bot.telegram.sendDocument(ctx.from.id, file);
        }

        await bot.telegram.sendMessage(ctx.from.id, "Il documento inviato rappresenta l'ultimo bollettino nazionale registrato direttamente dalla protezione civile 🤞🏻🤞🏻");
        await ctx.answerCbQuery();

    } catch (error) {
        console.error("[ERROR] => ", error);
        await bot.telegram.sendMessage(ctx.from.id, 'Non è stato possibile recuperare il bollettino nazionale odierno. Scusami!!!');
        await ctx.answerCbQuery();
    }
};

module.exports = action_scheda_riepilogativa;
