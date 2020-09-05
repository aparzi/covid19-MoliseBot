const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN_BOT);

const cmd_autocertificazione_campionati_dilettanti = async (ctx) => {
    try {
        const file = 'http://www.angeloparziale.it/documenti/autocertificazione_campionati_dilettanti.pdf';
        await bot.telegram.sendDocument(ctx.from.id, file);
        return await ctx.reply('Il seguente documento rappresenta l\'autocertificazione per quanto riguarda i campionati dilettantistici 👍🏻👍🏻');
    } catch (error) {
        console.error("[ERROR] => ", error);
        return ctx.reply('Non è stato possibile recuperare il modulo richiesto 😕 Riprovare! 🤞🏻🤞🏻');
    }
};

module.exports = cmd_autocertificazione_campionati_dilettanti;
