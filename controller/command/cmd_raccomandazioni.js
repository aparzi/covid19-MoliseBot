const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN_BOT);

const cmd_sintomi = async (ctx) => {
    try {
        const file = 'http://www.salute.gov.it/imgs/C_17_opuscoliPoster_443_allegato.pdf';
        await ctx.reply('Il seguente documento illustra alcune raccomandazioni che vanno assolutamente rispettate. 🤗🤗');
        return await bot.telegram.sendDocument(ctx.from.id, file);
    } catch (error) {
        console.error("[ERROR] => ", error);
        return ctx.reply('Non è stato possibile recuperare informazioni per tale richiesta! Riprova con un altro comando');
    }
};

module.exports = cmd_sintomi;
