const cmd_sintomi = async (ctx) => {
    try {
        const external_link = 'http://www.governo.it/it/articolo/decreto-iorestoacasa-domande-frequenti-sulle-misure-adottate-dal-governo/14278';
        await ctx.reply(`Per visualizzare le risposte a domande più comuni puoi procedere visualizzando questo link 👍🏻👍🏻 ${external_link}`);
    } catch (error) {
        console.error("[ERROR] => ", error);
        return ctx.reply('Non è stato possibile recuperare informazioni per tale richiesta! Riprova con un altro comando');
    }
};

module.exports = cmd_sintomi;
