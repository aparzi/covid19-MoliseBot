const cmd_modulo_spostamenti = async (ctx) => {
    try {
        const external_link = 'https://www.modulospostamento.it/index.html';
        await ctx.reply(`A questo link è possibile compilare il modulo relativo agli spostamenti direttamente online 📄📄 \n ${external_link} \n\n Ti ricordo che gli spostamenti sono consentiti solo per estrema necessità.`);
    } catch (error) {
        console.error("[ ERROR RICHISTA MODULO SPOSTAMENTI ] => ", error);
        return ctx.reply('Non è stato possibile recuperare informazioni per tale richiesta! Riprova con un altro comando');
    }
};

module.exports = cmd_modulo_spostamenti;
