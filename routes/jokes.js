const express = require('express')
const router = express.Router()
const Joke = require('../models/Joke')

// Henter /jokes
router.get('/', async (request, response) => {
    try {
        const jokes = await Joke.find({})
        response.render('jokes', { jokes: jokes })
    } catch {
        response.render('jokes', { jokes: [], errorMessage: 'An incident occurred' })
    }
})

// Poster en ny joke
router.post('/', async (request, response) => {
    try {
        const setup = request.body.setup
        const punchline = request.body.punchline
        if (setup != null && setup !== '' && punchline != null && punchline !== '') {
            const newJoke = new Joke({ setup: setup, punchline: punchline })
            newJoke.save()
            const jokes = await Joke.find({})
            response.render('jokes', { jokes: jokes })
        }
    } catch {
        const jokes = await Joke.find({})
        response.render('jokes', { jokes: jokes, errorMessage: 'An incident occurred' })
    }
})

// Fanger alle forkert stavede versioner af sidens extension
router.get('/:site', (request, response) => {
    response.redirect('/')
})

module.exports = router