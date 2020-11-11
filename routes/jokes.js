const express = require('express')
const router = express.Router()
const Joke = require('../models/Joke')

// Henter /jokes
router.get('/', async (request, response) => {
    try {
        const jokes = await Joke.find({})
        response.render('jokes', { jokes: jokes })
    } catch {
        response.render('jokes', { jokes: [], errorMessage: 'Jokes could not be loaded' })
    }
})

// Poster en ny joke
router.post('/', async (request, response) => {
    const setup = request.body.setup
    const punchline = request.body.punchline
    const newJoke = new Joke({ setup: setup, punchline: punchline })
    try {
        await newJoke.save()
        const jokes = await Joke.find({})
        response.render('jokes', { jokes: jokes })
    } catch (error) {
        const jokes = await Joke.find({})
        response.render('jokes', { jokes: jokes, errorMessage: 'Your joke had the wrong format' })
    }
})

// Fanger alle forkert stavede versioner af sidens extension
router.get('/:site', (request, response) => {
    response.redirect('/')
})

module.exports = router