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
    });

    // Valve One
    socket.on('valveOne', (state) => {
        wateringSystem.states.valveOne = state
    })

    // Valve Two
    socket.on('valveTwo', (state) => {
        wateringSystem.states.valveTwo = state
    })

    // Valve Three
    socket.on('valveThree', (state) => {
        wateringSystem.states.valveThree = state
    })

    // Valve Four
    socket.on('valveFour', (state) => {
        wateringSystem.states.valveFour = state
    })

    // Rain
    socket.on('rain', (state) => {
        wateringSystem.states.rain = state
    })

    // Pump
    socket.on('pump', (state) => {
        wateringSystem.states.pump = state
    })

    // Pump
    socket.on('tapWater', (state) => {
        wateringSystem.states.tapWater = state
    })
})
