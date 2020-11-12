const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")

// Henter /othersites
router.get('/', async (request, response) => {
    try {
        let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        let data = await otherSites.json()
        response.render('othersites', { otherSites: data })
    } catch (error) {
        if (error.code === 'ENOTFOUND') {
            response.render('othersites', { otherSites: [], errorMessage: 'Server down' })
        } else {
            response.render('othersites', { otherSites: [], errorMessage: 'An incident occurred' })
        }
    }
})

// Henter noget fra en specifik ekstern side
router.get('/:site', async (request, response) => {
    let data = []
    try {
        let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        data = await otherSites.json()
        let sitename = request.params.site
        let url
        let element
        for (let i = 0; i < data.length; i++) {
            element = data[i];
            console.log(element.name, ' ', sitename);
            if (element.name && element.name.toLowerCase() === sitename.toLowerCase()) {
                url = element.address
                break
            }
        }
        // Hvis url aldrig bliver sat (der findes ikke en side med det navn)
        if (!url) {
            throw new Error('Site does not exist')
        }
        if (url.substr(-1) !== '/') {
            url = url + '/';
        }
        let chosenSite = await fetch(url + 'api/jokes')
        let chosenData = await chosenSite.json()
        response.render('jokes', { jokes: chosenData })
    } catch (error) {
        if (error.message === 'Site does not exist') {
            response.render('othersites', { otherSites: data, errorMessage: 'The chosen site does not exist' })
        } else {
            response.render('othersites', { otherSites: [], errorMessage: 'An incident occurred' })
        }
    }
})

module.exports = router