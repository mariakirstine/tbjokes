const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const Joke = require('../models/Joke')

router.get('/jokes', async (request, response) => {
    const jokes = await Joke.find({})
    const jokesJSON = JSON.stringify(jokes)
    response.send(jokesJSON)
})

router.get('/othersites', async (request, response) => {
    let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
    console.log(otherSites);
    let data = await otherSites.json()
    let dataJSON = JSON.stringify(data)
    response.send(dataJSON)
})

module.exports = router