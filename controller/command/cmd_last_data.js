const Telegraf = require('telegraf');
const { Markup } = Telegraf;
const action = require('../../enums/action');

const inlineMessageDatiKeyboard = Markup.inlineKeyboard([
    Markup.callbackButton('Dati nazionali', action.NATIONAL_DATA),
    Markup.callbackButton('Dati regionali', action.REGIONAL_DATA)
]).extra();

const cmd_last_data = async (ctx) => {
    try {
        await ctx.reply('Seleziona, tra le seguenti opzioni disponibili, quali dati vuoi che ti mostro', inlineMessageDatiKeyboard);
    } catch (error) {
        console.error("[ERROR] => ", error);
        return ctx.reply('Non è stato possibile recuperare informazioni per tale richiesta! Scusami');
    }
};

module.exports = cmd_last_data;
