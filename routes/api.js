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
    } catch {
        response.status(408).send({ error: err.details })
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
        // MANGLER
    }
})

// Henter api (JSON) for et andet sites jokes
router.get('/othersites/:site', async (request, response) => {
    try {
        let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
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
    } catch (error) {
        // MANGLER
    }
})

router.post('/api/jokes', async (request, response) => {
    // SPØRG KAJ
})

module.exports = router