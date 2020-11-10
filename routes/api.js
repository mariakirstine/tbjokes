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
        // VÆLG EN
        response.status(408).send({ error: error.details })
        response.status(408).json({ error: error.details })
    }
})

// Henter api (JSON) af alle andre sites
router.get('/othersites', async (request, response) => {
    try {
        let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        if (otherSites.status >= 200 && otherSites.status <= 399) {
            let data = await otherSites.json()
            let dataJSON = JSON.stringify(data)
            response.send(dataJSON)
        } else {
            throw new Error(otherSites)
        }
    } catch (error) {
        // VÆLG EN
        response.status(error.status).send({ error: error.details })
        response.status(error.status).json({ error: error.details })
    }
})

// Henter api (JSON) for et andet sites jokes
router.get('/othersites/:site', async (request, response) => {
    try {
        let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        if (otherSites.status >= 200 && otherSites.status <= 399) {
            let data = await otherSites.json()
            let sitename = request.params.site
            let url
            let element
            for (let i = 0; i < data.length; i++) {
                element = data[i];
                if (element.name.toLowerCase() === sitename.toLowerCase()) {
                    url = element.address
                    break
                }
            }
            console.log(url)
            if (!url) {
                throw new Error()
            }
            let chosenSite = await fetch(url + 'api/jokes')
            let chosenData = await chosenSite.json()
            let chosenDataJSON = JSON.stringify(chosenData)
            response.send(chosenDataJSON)
        } else {
            throw new Error(otherSites)
        }
    } catch (error) {
        // VÆLG EN
        response.status(error.status).send({ error: error.details })
        response.status(error.status).json({ error: error.details })
    }
})

router.post('/api/jokes', async (request, response) => {
    // SPØRG KAJ
})

module.exports = router