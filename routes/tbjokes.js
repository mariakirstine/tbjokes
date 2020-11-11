const express = require('express')
const router = express.Router()

// Redirecter fra hovedsiden til jokes
router.get('/', (request, response) => {
    response.redirect('/jokes')
})

module.exports = router