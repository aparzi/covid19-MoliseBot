const cmd_help = async (ctx) => {
    try {
        const message = `Posso aiutarti a capire cosa è il nuovo coronavirus (Covid-19), quali sono le regole da rispettare e rimanere aggiornato sulla situazione per la regione Molise.
Ci penserò io ad aggiornarti, inviandoti delle notifiche nel momento in cui ci sono aggiornamenti rilevamenti. Inoltre, puoi controllarmi eseguendo questi comandi:
        
<b>INFO GENERALI</b>
/infovirus - Breve intro sul virus
/infosintomi - Descrizione dei sintomi più comuni
/infodiffusione - Diffusione del virus

<b>NORMATIVE</b>
/sintomi - Scopri cosa fare in caso di sintomi
/raccomandazioni - Leggi le raccomandazioni da seguire
/domandecomuni - Dai un'occhiata alle FAQ

Mi raccommando comportati da cittadino responsabile per vincere insieme questa battaglia 🇮🇹💪🏻`;

        return await ctx.replyWithHTML(message);
    } catch (error) {
        console.error("[ERROR] => ", error);
        return ctx.reply('Non è stato possibile recuperare informazioni per tale richiesta! Riprova con un altro comando');
    }
};

module.exports = cmd_help;
