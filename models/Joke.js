const mongoose = require('mongoose')
const jokeSchema = new mongoose.Schema({
    setup: {
        type: String,
        required: true
    },
    punchline: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Joke', jokeSchema)