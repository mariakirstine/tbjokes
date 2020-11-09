const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")

// Henter /othersites
router.get('/', async (request, response) => {
    let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
    let data = await otherSites.json()
    response.render('othersites', { otherSites: data })
    try {

    } catch {

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
                console.log(url);
                break
            }
            // response.send('Fejl') // Skal have oprettet en fejlside
        }
        console.log(url)
        // if url = null
        let chosenSite = await fetch(url + '/api/jokes')
        let chosenData = await chosenSite.json()
        response.render('jokes', { jokes: chosenData })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router