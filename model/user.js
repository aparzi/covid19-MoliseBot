const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

// Schema per un utente
const EventSchema = new Schema({
    id_user: {type: Number, required: true}, // id dell'utente e chat
    first_name: {type: String, required: true}, // nome dell'utente
    last_name: {type: String, required: true}, // cognome dell'utente
    username: {type: String, required: true}, // username dell'utente
    language_code: {type: String, required: true}, // language_code dell'utente
    is_bot: {type: Boolean, required: true} // se è un bot o un utente
}, {
    timestamps: {createdAt: true, updatedAt: true}
});

module.exports = mongoose.model("User", EventSchema);
