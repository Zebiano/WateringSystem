// Require: Packages
require('dotenv').config()
const cleanup = require('node-cleanup')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const fs = require('fs')

// TODO: Put message strings inside the wateringSystem variable to easily edit them, instead of hard-coding them
// TODO: Implement home.openweathermap.org for weather forecast to control rain automatically (https://findanyanswer.com/how-much-mm-of-rain-is-a-lot)

// Export server
module.exports = server

// Load config.json into global scope
global.wateringSystem = JSON.parse(fs.readFileSync(`./config.json`, 'utf8'))

// Require: Lib
const scream = require(`./src/lib/scream`)
const toggle = require(`./src/toggleStates`)
if (process.env.WS_ENV == 'prod' || process.env.WS_ENV == 'production') require(`./src/hardware`)

// Set everything to false
toggle.allFalse()

// Read Floater states
// toggle.readAllFloaters()

// Middleware
app.use('/', require(`./src/routes`))
app.use('/bootstrap', express.static(`./node_modules/bootstrap/dist`))
app.use('/bootstrap-icons', express.static(`./node_modules/bootstrap-icons/icons`))
app.use('/axios', express.static(`./node_modules/axios/dist`))
app.use('/frontend', express.static(`./src/frontend`))

// Require: Files
require(`./src/sockets`)
require(`./src/logic`)

// Start server
server.listen(process.env.WS_PORT, () => {
    scream.info('Please run me with sudo.')
    scream.success(`Listening on http://localhost:${process.env.WS_PORT}/test`)
})

// When exiting, turn off relays
cleanup(() => { toggle.allFalse() })
