const cmd_diffusione = async (ctx) => {
    try {
        return await ctx.reply(`Il nuovo coronavirus è un virus respiratorio che si diffonde principalmente attraverso il contatto con le goccioline del respiro delle persone infette, ad esempio quando starnutiscono o tossiscono o si soffiano il naso. 
        È importante perciò che le persone ammalate applichino misure di igiene quali starnutire o tossire in un fazzoletto o con il gomito flesso e gettare i fazzoletti utilizzati in un cestino chiuso immediatamente dopo l'uso e lavare le mani frequentemente con acqua e sapone o usando soluzioni alcoliche.`);
    } catch (error) {
        console.error("[ERROR] => ", error);
        return ctx.reply('Non è stato possibile recuperare informazioni per tale richiesta! Riprova con un altro comando');
    }
};

module.exports = cmd_diffusione;
