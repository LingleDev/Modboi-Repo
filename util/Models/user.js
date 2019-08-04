const mongoose = require('mongoose')

const schema = mongoose.Schema({
    user_id: String,
    coins: Number,
    blacklisted: {type: Boolean, default: false}
})

module.exports = mongoose.model("user", schema)