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
        callback(wateringSystem)
    })

    // Ignore logic
    socket.on('manual', (state, callback) => {
        toggle.manual(state)
        callback({ stateAllowed: true, msg: `Set manual to '${state}'.` })
    })

    // Valve 1
    socket.on('valve1', (state, callback) => {
        // Variables
        let logicRes = { stateAllowed: false, msg: `Default state for valve1 is 'false'.` }

        // Do not check for logic if manual is true and simply execute toggle
        if (wateringSystem.manual) {
            toggle.valve1(state)
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set on valve1.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.valve1(state)
            if (logicRes.stateAllowed) toggle.valve1(state)
        }

        // Return callback
        callback(logicRes)
    })

    // Valve 2
    socket.on('valve2', (state, callback) => {
        // Variables
        let logicRes = { stateAllowed: false, msg: `Default state for valve2 is 'false'.` }

        // Do not check for logic if manual is true and simply execute toggle
        if (wateringSystem.manual) {
            toggle.valve2(state)
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set on valve2.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.valve2(state)
            if (logicRes.stateAllowed) toggle.valve2(state)
        }

        // Return callback
        callback(logicRes)
    })

    // Valve 3
    socket.on('valve3', (state, callback) => {
        // Variables
        let logicRes = { stateAllowed: false, msg: `Default state for valve3 is 'false'.` }

        // Do not check for logic if manual is true and simply execute toggle
        if (wateringSystem.manual) {
            toggle.valve3(state)
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set on valve3.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.valve3(state)
            if (logicRes.stateAllowed) toggle.valve3(state)
        }

        // Return callback
        callback(logicRes)
    })

    // Valve 4
    socket.on('valve4', (state, callback) => {
        // Variables
        let logicRes = { stateAllowed: false, msg: `Default state for valve4 is 'false'.` }

        // Do not check for logic if manual is true and simply execute toggle
        if (wateringSystem.manual) {
            toggle.valve4(state)
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set on valve4.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.valve4(state)
            if (logicRes.stateAllowed) toggle.valve4(state)
        }

        // Return callback
        callback(logicRes)
    })

    // Tap Water
    socket.on('tapWater', (state, callback) => {
        // Variables
        let logicRes = { stateAllowed: false, msg: `Default state for tapWater is 'false'.` }

        // Do not check for logic if manual is true and simply execute toggle
        if (wateringSystem.manual) {
            toggle.tapWater(state)
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set on tapWater.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.tapWater(state)
            if (logicRes.stateAllowed) toggle.tapWater(state)
        }

        // Return callback
        callback(logicRes)
    })

    // Pump Water Up
    socket.on('pumpWaterUp', (state, callback) => {
        // Variables
        let logicRes = { stateAllowed: false, msg: `Default state for pumpWaterUp is 'false'.` }

        // Do not check for logic if manual is true and simply execute toggle
        if (wateringSystem.manual) {
            toggle.pumpWaterUp(state)
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set on pumpWaterUp.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.pumpWaterUp(state)
            if (logicRes.stateAllowed) toggle.pumpWaterUp(state)
        }

        // Return callback
        callback(logicRes)
    })

    // Pump Water Up
    socket.on('transferWaterDown', (state, callback) => {
        // Variables
        let logicRes = { stateAllowed: false, msg: `Default state for transferWaterDown is 'false'.` }

        // Do not check for logic if manual is true and simply execute toggle
        if (wateringSystem.manual) {
            toggle.transferWaterDown(state)
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set on transferWaterDown.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.transferWaterDown(state)
            if (logicRes.stateAllowed) toggle.transferWaterDown(state)
        }

        // Return callback
        callback(logicRes)
    })

    // Rain
    socket.on('rain', (state, callback) => {
        // Variables
        let logicRes = { stateAllowed: false, msg: `Default state for rain is 'false'.` }

        // Do not check for logic if manual is true and simply execute toggle
        if (wateringSystem.manual) {
            toggle.rain(state)
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set on rain.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.rain(state)
            if (logicRes.stateAllowed) toggle.rain(state)
        }

        // Return callback
        callback(logicRes)
    })

    // Floater 1
    socket.on('floater1', (state, callback) => {
        // Set floater1
        toggle.floater1(state)

        // Return callback
        callback({ stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set on floater1.` })
    })

    // Floater 2
    socket.on('floater2', (state, callback) => {
        // Set floater2
        toggle.floater2(state)

        // Return callback
        callback({ stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set on floater2.` })
    })

    // Floater 3
    socket.on('floater3', (state, callback) => {
        // Set floater3
        toggle.floater3(state)

        // Return callback
        callback({ stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set on floater3.` })
    })

    // Floater 4
    socket.on('floater4', (state, callback) => {
        // Set floater4
        toggle.floater4(state)

        // Return callback
        callback({ stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set on floater4.` })
    })

    // Floater 5
    socket.on('floater5', (state, callback) => {
        // Set floater5
        toggle.floater5(state)

        // Return callback
        callback({ stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set on floater5.` })
    })
})
