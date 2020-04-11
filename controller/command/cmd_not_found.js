const cmd_not_found = async (ctx) => {
    try {
        await ctx.reply(`Mi dispiace non riesco a capire cosa desideri. Digita il comando /help per vedere in cosa posso aiutarti. Grazie 🤞🏻🤗`);
    } catch (error) {
        console.error("[ ERROR GENERICO COMMAND NOT FOUND ] => ", error);
        return ctx.reply('Non è stato possibile inviare una risposta per tale comando');
    }
};

module.exports = cmd_not_found;
