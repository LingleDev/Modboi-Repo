const mongoose = require('mongoose')

const schema = mongoose.Schema({
    guild_id: String,
    premium: { type: Boolean, default: false },
    prefix: { type: String, default: "m!" },
    locked: { type: Boolean, default: false },
    currencyEnabled: { type: Boolean, default: true }
})

module.exports = mongoose.model("guild", schema)