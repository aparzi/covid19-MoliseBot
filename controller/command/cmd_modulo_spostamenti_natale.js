const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN_BOT);

const cmd_modulo_spostamenti_natale = async (ctx) => {
    try {
        const file = 'https://static.gedidigital.it/repubblica/pdf/2020/politica/modello_autodichiarazione_editabile_ottobre_2020.pdf';
        await ctx.reply(`Ecco il nuovo modulo per gli spostamenti, in versione pdf editabile, valido per le vacanze natalizie. 😄🎄`);
        return await bot.telegram.sendDocument(ctx.from.id, file);
    } catch (error) {
        console.error("[ ERROR RICHISTA MODULO SPOSTAMENTI NATALE ] => ", error);
        return ctx.reply('Non è stato possibile recuperare informazioni per tale richiesta! Riprovare grazie!');
    }
};

module.exports = cmd_modulo_spostamenti_natale;
