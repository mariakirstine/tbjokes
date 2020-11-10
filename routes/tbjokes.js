const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
    response.redirect('/jokes')
})

module.exports = router