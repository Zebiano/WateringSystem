// Require: Packages
const server = require(`../main`)
const socketServer = require('socket.io').Server
const io = new socketServer(server)

// Require: libs
const toggle = require('./lib/toggleStates')

// Require: Files
const logic = require('./logic')

// Start io server
io.on('connection', (socket) => {
    // Return states when asked
    socket.on("states", (callback) => {
        callback(wateringSystem.states)
    })

    // Valve One
    socket.on('valveOne', (state, callback) => {
        const logicRes = logic.valve(1, state)
        if (logicRes.stateAllowed) toggle.valve(1, state)
        callback(logicRes)
    })

    // Valve Two
    socket.on('valveTwo', (state, callback) => {
        const logicRes = logic.valve(2, state)
        if (logicRes.stateAllowed) toggle.valve(2, state)
        callback(logicRes)
    })

    // Valve Three
    socket.on('valveThree', (state, callback) => {
        const logicRes = logic.valve(3, state)
        if (logicRes.stateAllowed) toggle.valve(3, state)
        callback(logicRes)
    })

    // Valve Four
    socket.on('valveFour', (state, callback) => {
        const logicRes = logic.valve(4, state)
        if (logicRes.stateAllowed) toggle.valve(4, state)
        callback(logicRes)
    })

    // Rain
    socket.on('rain', (state, callback) => {
        const logicRes = logic.rain(state)
        if (logicRes.stateAllowed) toggle.rain(state)
        callback(logicRes)
    })

    // Pump
    socket.on('pump', (state, callback) => {
        const logicRes = logic.pump(state)
        if (logicRes.stateAllowed) toggle.pump(state)
        callback(logicRes)
    })

    // Tap Water
    socket.on('tapWater', (state, callback) => {
        const logicRes = logic.tapWater(state)
        if (logicRes.stateAllowed) toggle.tapWater(state)
        callback(logicRes)
    })
})
