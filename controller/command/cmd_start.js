const User = require('../../model/user');

const cmd_start = async (ctx) => {
    try {

        const user = new User({
            id_user: ctx.from.id,
            first_name: ctx.from.first_name,
            last_name: ctx.from.last_name,
            username: ctx.from.username,
            language_code: ctx.from.language_code,
            is_bot: ctx.from.is_bot,
        });

        const filter = { id_user: user.id_user };
        let userUpdated =  await User.findOneAndUpdate(filter, { upsert: true, new: true });

        console.info(`Started ${ctx.from.username}:`, ctx.from.id);
        return ctx.reply(`Ciao ${ctx.from.username}, posso aiutarti a rimanere aggiornato sulla situazione COVID-19 nella regione Molise. Scropri cosa posso fare /help` );

    } catch (error) {
        console.error("[ERROR] => ", error);
        return ctx.reply('Non è stato possibile recuperare informazioni per tale richiesta! Riprova con un altro comando');
    }
};

module.exports = cmd_start;
