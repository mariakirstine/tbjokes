const express = require('express')
const router = express.Router()

// Henter /othersites
router.get('/', (request, response) => {
    response.send('Get Other Sites')
})

// Henter noget fra en specifik ekstern side
router.get('/:site', (request, response) => {
    response.send(request.params.site)
})

module.exports = router