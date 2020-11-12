const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const Joke = require('../models/Joke')

// Henter api (JSON) af vores jokes
router.get('/jokes', async (request, response) => {
    try {
        const jokes = await Joke.find({})
        const jokesJSON = JSON.stringify(jokes)
        response.send(jokesJSON)
    } catch (error) {
        response.status(408).json({ error: error.details })
    }
})

// Henter api (JSON) af alle andre sites
router.get('/othersites', async (request, response) => {
    try {
        let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        let data = await otherSites.json()
        let dataJSON = JSON.stringify(data)
        response.send(dataJSON)
    } catch (error) {
        response.status(error.status).json({ error: error.details })
    }
})

// Henter api (JSON) for et andet sites jokes
router.get('/otherjokes/:site', async (request, response) => {
    try {
        let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        let data = await otherSites.json()
        let sitename = request.params.site
        let url
        let element
        for (let i = 0; i < data.length; i++) {
            element = data[i];
            if (element.name && element.name.toLowerCase() === sitename.toLowerCase()) {
                url = element.address
                break
            }
        }
        // Hvis url aldrig bliver sat (der findes ikke en side med det navn)
        if (!url) {
            throw new Error()
        }
        if (url.substr(-1) !== '/') {
            url = url + '/';
        }
        let chosenSite = await fetch(url + 'api/jokes')
        let chosenData = await chosenSite.json()
        let chosenDataJSON = JSON.stringify(chosenData)
        response.send(chosenDataJSON)
    } catch (error) {
        response.status(error.status).json({ error: error.details })
    }
})

// Poster via API requests
router.post('/jokes', async (request, response) => {
    const newJoke = new Joke({
        setup: request.body.setup,
        punchline: request.body.punchline,
    })
    try {
        await newJoke.save();
        const jokes = await Joke.find({})
        response.status(201).json(newJoke)
    } catch (error) {
        if (error.status < 500) {
            response.status(error.status).json({ error: error.details })
        } else {
            response.status(error.status).json({ message: 'forkert format' })
        }
    }
})

module.exports = router