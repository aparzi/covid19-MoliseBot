const cmd_infosintomi = async (ctx) => {
    try {
        await ctx.reply('I sintomi più comuni di sono febbre, stanchezza e tosse secca. Alcuni pazienti possono presentare indolenzimento e dolori muscolari, congestione nasale, naso che cola, mal di gola o diarrea. ' +
            'Questi sintomi sono generalmente lievi e iniziano gradualmente. Nei casi più gravi, l\'infezione può causare polmonite, sindrome respiratoria acuta grave, insufficienza renale e persino la morte.');
    } catch (error) {
        console.error("[ERROR] => ", error);
        return ctx.reply('Non è stato possibile recuperare informazioni per tale richiesta! Riprova con un altro comando');
    }
};

module.exports = cmd_infosintomi;
