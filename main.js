// Require: Packages
require('dotenv').config()
const cleanup = require('node-cleanup')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const fs = require('fs')

// TODO: Implement home.openweathermap.org for weather forecast to control rain automatically
// TODO: Create max time for manual mode
// TODO: Max time for valves 1 to 4 is 2 mins. Valve 6 and 7 max 20. If is over before action is done, turn off whole system (which is basically turn on manual mode with everything in false), should only be usable in Manual mode

// Export server
module.exports = server

// Load config.json into global scope
global.wateringSystem = JSON.parse(fs.readFileSync(`./config.json`, 'utf8'))

// Require: Lib
const scream = require(`./src/lib/scream`)
const toggle = require(`./src/lib/toggleStates`)
if (process.env.WS_ENV == 'prod' || process.env.WS_ENV == 'production') require(`./src/hardware`)

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
cleanup(() => { toggle.all(false) })
