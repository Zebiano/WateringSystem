// Require: Packages
require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const fs = require('fs')

// Export server
module.exports = server

// Load config.json into global scope
global.wateringSystem = JSON.parse(fs.readFileSync(`./config.json`, 'utf8'))

// Require: Lib
const scream = require(`./src/lib/scream`)
if (process.env.WS_ENV == 'prod' || process.env.WS_ENV == 'production') require(`./src/hardware`)

// Middleware
app.use('/', require(`./src/routes`))
app.use('/bootstrap', express.static(`./node_modules/bootstrap/dist`))
app.use('/bootstrap-icons', express.static(`./node_modules/bootstrap-icons/icons`))
app.use('/axios', express.static(`./node_modules/axios/dist`))
app.use('/frontend', express.static(`./src/frontend`))

// Require: Files
require(`./src/sockets`)
require(`./src/logic`).run()

// Start server
server.listen(process.env.WS_PORT, () => {
    scream.success(`Listening on http://localhost:${process.env.WS_PORT}`)
})
