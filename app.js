// Hvis vi ikke er i produktionsmiljøet, skal der køres med lokale env-variable
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Joke = require('./models/Joke')

// Skal slettes
let joke2 = new Joke({ setup: 'Hvad er det sjoveste dyr?', punchline: 'En HAre' })
joke2.save()
let joke3 = new Joke({ setup: 'Hvad er det største dyr?', punchline: 'En orm' })
joke3.save()

// Starter Mongoose database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Gør det muligt at læse kroppen fra HTML
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Sætter PUG som grafisk flade
app.set('view engine', 'pug')

// De forskellige routes
const jokesRouter = require('./routes/jokes')
app.use('/jokes', jokesRouter)
const otherSitesRouter = require('./routes/othersites')
app.use('/othersites', otherSitesRouter)

// Sætter server online
app.listen(process.env.PORT, console.log('Server running'))