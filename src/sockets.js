// Require: Packages
const server = require(`../main`)
const socketServer = require('socket.io').Server
const io = new socketServer(server)

// Require: Lib
const scream = require(`./lib/scream`)

// Start io server
io.on('connection', (socket) => {
    // Return states when asked
    socket.on("states", (callback) => {
        callback(wateringSystem.states)
    })

    // Valve One
    socket.on('valveOne', (state, callback) => {
        wateringSystem.states.valveOne = state
        callback(wateringSystem.states)
    })

    // Valve Two
    socket.on('valveTwo', (state, callback) => {
        wateringSystem.states.valveTwo = state
        callback(wateringSystem.states)
    })

    // Valve Three
    socket.on('valveThree', (state, callback) => {
        wateringSystem.states.valveThree = state
        callback(wateringSystem.states)
    })

    // Valve Four
    socket.on('valveFour', (state, callback) => {
        wateringSystem.states.valveFour = state
        callback(wateringSystem.states)
    })

    // Rain
    socket.on('rain', (state, callback) => {
        wateringSystem.states.rain = state
        callback(wateringSystem.states)
    })

    // Pump
    socket.on('pump', (state, callback) => {
        wateringSystem.states.pump = state
        callback(wateringSystem.states)
    })

    // Tap Water
    socket.on('tapWater', (state, callback) => {
        wateringSystem.states.tapWater = state
        callback(wateringSystem.states)
    })
})
