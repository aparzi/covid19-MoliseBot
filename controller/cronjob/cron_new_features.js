const dotenv = require('dotenv');
dotenv.config();
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN_BOT);
const User = require('../../model/user');

const cron_new_features = async () => {
    try {
        console.info("------ [ ESEGUO CRONJOB NEW FEATURES ] ------");

        // Recupero tutti gli utenti da notificare
        let users = await User.find({});

        await asyncForEach(users, async (user) => {
            try {
                await bot.telegram.sendMessage(user.id_user, `Hey ${user.first_name} 👋🏻🤗 Volevo semplicemente avvisarti che da questo momento in poi ti aggiornerò anche sul piano vaccinale in Molise, inviandoti una notifica alle 12 e 30 🤗`, {parse_mode: 'HTML'});

            } catch (error) {
                console.error("[ ERRORE MESSAGGIO RIEPILOGO DATI ] => ", error);
                console.error("[ UTENTE NON NOTIFICATO ] => ", user);
            }
        });

    } catch (error) {
        console.error("[ ERRORE GENERICO NEW FEATURES ] => ", error);
    }
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = cron_new_features;
