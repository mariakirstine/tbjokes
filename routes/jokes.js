const express = require('express')
const router = express.Router()
const Joke = require('../models/Joke')

// Henter /jokes
router.get('/', async (request, response) => {
    const jokes = await Joke.find({})
    response.render('jokes', { jokes: jokes })
})

// Poster en ny joke
router.post('/', async (request, response) => {
    const setup = request.body.setup
    const punchline = request.body.punchline
    console.log(setup);
    console.log(punchline);
    try {
        if (setup != null && setup !== '' && punchline != null && punchline !== '') {
            const newJoke = new Joke({ setup: setup, punchline: punchline })
            newJoke.save()
            const jokes = await Joke.find({})
            response.render('jokes', { jokes: jokes })
        }
    } catch {

    }
})

module.exports = router