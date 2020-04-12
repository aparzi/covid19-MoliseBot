const cmd_attivita_aperte = async (ctx) => {
    try {
        const external_link = 'https://www.confcommercio.it/-/elenco-attivita-aperte';
        await ctx.reply(`Per visualizzare la lista delle attività aperte puoi far riferimento al seguente link 👍🏻👍🏻 ${external_link}`);
    } catch (error) {
        console.error("[ ERROR RICHIESTA ATTIVITA APERTE ] => ", error);
        return ctx.reply('Non è stato possibile recuperare informazioni per tale richiesta! Riprova con un altro comando');
    }
};

module.exports = cmd_attivita_aperte;
