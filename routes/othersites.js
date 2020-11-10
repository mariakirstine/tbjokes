const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")

// Henter /othersites
router.get('/', async (request, response) => {
    try {
        let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        let data = await otherSites.json()
        response.render('othersites', { otherSites: data })
    } catch {
        response.render('othersites', { otherSites: [], errorMessage: 'An incident occurred' })
    }
})

// Henter noget fra en specifik ekstern side
router.get('/:site', async (request, response) => {
    try {
        let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        let data = await otherSites.json()
        let sitename = request.params.site
        let url
        let element
        for (let i = 0; i < data.length; i++) {
            element = data[i];
            if (element.name === sitename) {
                url = element.address
                break
            }
        }
        // Hvis url aldrig bliver sat (der findes ikke en side med det navn)
        if (!url) {
            throw new Error()
        }
        let chosenSite = await fetch(url + 'api/jokes')
        let chosenData = await chosenSite.json()
        console.log(chosenData);
        response.render('jokes', { jokes: chosenData })
    } catch (error) {
        let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        let data = await otherSites.json()
        response.render('othersites', { otherSites: data, errorMessage: 'An incident occurred' })
    }
})

module.exports = router