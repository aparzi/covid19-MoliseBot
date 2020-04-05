const cmd_infovirus = async (ctx) => {
    try {
        await ctx.reply('La malattia provocata dal nuovo Coronavirus ha un nome: “COVID-19” (dove "CO" sta per corona, "VI" per virus, "D" per disease e "19" indica l\'anno in cui si è manifestata). ' +
            'Lo ha annunciato, l’11 febbraio 2020, nel briefing con la stampa durante una pausa del Forum straordinario dedicato al virus, il Direttore generale dell’Oms Tedros Adhanom Ghebreyesus.');
    } catch (error) {
        console.error("[ERROR] => ", error);
        return ctx.reply('Non è stato possibile recuperare informazioni per tale richiesta! Riprova con un altro comando');
    }
};

module.exports = cmd_infovirus;
