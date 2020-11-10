const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const Joke = require('../models/Joke')

// Henter api (JSON) af vores jokes
router.get('/jokes', async (request, response) => {
    const jokes = await Joke.find({})
    const jokesJSON = JSON.stringify(jokes)
    response.send(jokesJSON)
})

// Henter api (JSON) af alle andre sites
router.get('/othersites', async (request, response) => {
    let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
    console.log(otherSites);
    let data = await otherSites.json()
    let dataJSON = JSON.stringify(data)
    response.send(dataJSON)
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
            // IF ELEMENT.NAME == ''
            if (element.name.toLowerCase() === sitename.toLowerCase()) {
                url = element.address
                console.log(url);
                break
            }
            // response.send('Fejl') // Skal have oprettet en fejlside
        }
        console.log(url)
        // if url = null
        let chosenSite = await fetch(url + '/api/jokes')
        let chosenData = await chosenSite.json()
        let chosenDataJSON = JSON.stringify(chosenData)
        response.send(chosenDataJSON)
    } catch (error) {
        console.log(error)
    }
})

router.post('/api/jokes', async (request, response) => {
    // SPØRG KAJ
})

module.exports = router