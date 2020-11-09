const express = require('express')
const router = express.Router()
const Joke = require('../models/Joke')

// Henter /jokes
router.get('/', async (request, response) => {
    const jokes = await Joke.find({})
    response.render('jokes', { jokes: jokes })
})

// Poster en ny joke
router.post('/', (request, response) => {
    response.send('Post Jokes')
})

module.exports = router