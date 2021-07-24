// Require: Packages
const server = require(`../main`)
const socketServer = require('socket.io').Server
const io = new socketServer(server)
const tinyTimer = require('tiny-timer')

// Require: Libs
const helper = require('./lib/helper')

// Require: Files
const toggle = require('./toggleStates')
const logic = require('./logic')

// Variables
const timerValve1 = new tinyTimer()
const timerValve2 = new tinyTimer()
const timerValve3 = new tinyTimer()
const timerValve4 = new tinyTimer()
const timerTapWater = new tinyTimer()
const timerPump = new tinyTimer()
const timerTransfer = new tinyTimer()

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
    socket.on('valve1', (state, duration, callback) => {
        // Variables
        let logicRes = { stateAllowed: false, msg: `Default state for valve1 is 'false'.` }

        // Do not check for logic if manual is true and simply execute toggle
        if (wateringSystem.manual) {
            toggle.valve1(state)
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set for valve1.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.valve1(state)
            if (logicRes.stateAllowed) toggle.valve1(state)
        }

        // Check if timer is already running and stop it
        if (timerValve1) timerValve1.stop()

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            timerValve1.on('tick', (ms) => io.emit('valve1Duration', helper.msToSeconds(ms)))
            timerValve1.on('done', () => {
                toggle.valve1(false)
                io.emit('valve1Duration', helper.msToSeconds(process.env.WS_VALVE1_TIMEOUT))
            })

            // Start timer
            if (duration) timerValve1.start(Number(duration), 1000)
            else timerValve1.start(Number(process.env.WS_VALVE1_TIMEOUT), 1000)
        }

        // Return callback
        callback(logicRes)
    })

    // Valve 2
    socket.on('valve2', (state, duration, callback) => {
        // Variables
        let logicRes = { stateAllowed: false, msg: `Default state for valve2 is 'false'.` }

        // Do not check for logic if manual is true and simply execute toggle
        if (wateringSystem.manual) {
            toggle.valve2(state)
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set for valve2.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.valve2(state)
            if (logicRes.stateAllowed) toggle.valve2(state)
        }

        // Check if timer is already running and stop it
        if (timerValve2) timerValve2.stop()

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            timerValve2.on('tick', (ms) => io.emit('valve2Duration', helper.msToSeconds(ms)))
            timerValve2.on('done', () => {
                toggle.valve2(false)
                io.emit('valve2Duration', helper.msToSeconds(process.env.WS_VALVE1_TIMEOUT))
            })

            // Start timer
            if (duration) timerValve2.start(Number(duration), 1000)
            else timerValve2.start(Number(process.env.WS_VALVE2_TIMEOUT), 1000)
        }

        // Return callback
        callback(logicRes)
    })

    // Valve 3
    socket.on('valve3', (state, duration, callback) => {
        // Variables
        let logicRes = { stateAllowed: false, msg: `Default state for valve3 is 'false'.` }

        // Do not check for logic if manual is true and simply execute toggle
        if (wateringSystem.manual) {
            toggle.valve3(state)
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set for valve3.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.valve3(state)
            if (logicRes.stateAllowed) toggle.valve3(state)
        }

        // Check if timer is already running and stop it
        if (timerValve3) timerValve3.stop()

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            timerValve3.on('tick', (ms) => io.emit('valve3Duration', helper.msToSeconds(ms)))
            timerValve3.on('done', () => {
                toggle.valve3(false)
                io.emit('valve3Duration', helper.msToSeconds(process.env.WS_VALVE1_TIMEOUT))
            })

            // Start timer
            if (duration) timerValve3.start(Number(duration), 1000)
            else timerValve3.start(Number(process.env.WS_VALVE3_TIMEOUT), 1000)
        }

        // Return callback
        callback(logicRes)
    })

    // Valve 4
    socket.on('valve4', (state, duration, callback) => {
        // Variables
        let logicRes = { stateAllowed: false, msg: `Default state for valve4 is 'false'.` }

        // Do not check for logic if manual is true and simply execute toggle
        if (wateringSystem.manual) {
            toggle.valve4(state)
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set for valve4.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.valve4(state)
            if (logicRes.stateAllowed) toggle.valve4(state)
        }

        // Check if timer is already running and stop it
        if (timerValve4) timerValve4.stop()

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            timerValve4.on('tick', (ms) => io.emit('valve4Duration', helper.msToSeconds(ms)))
            timerValve4.on('done', () => {
                toggle.valve4(false)
                io.emit('valve4Duration', helper.msToSeconds(process.env.WS_VALVE1_TIMEOUT))
            })

            // Start timer
            if (duration) timerValve4.start(Number(duration), 1000)
            else timerValve4.start(Number(process.env.WS_VALVE4_TIMEOUT), 1000)
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
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set for tapWater.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.tapWater(state)
            if (logicRes.stateAllowed) toggle.tapWater(state)
        }

        // Check if timer is already running and stop it
        if (timerTapWater) timerTapWater.stop()

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            timerTapWater.on('done', () => toggle.tapWater(false))

            // Start timer
            timerTapWater.start(Number(process.env.WS_TAPWATER_TIMEOUT), 1000)
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
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set for pumpWaterUp.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.pumpWaterUp(state)
            if (logicRes.stateAllowed) toggle.pumpWaterUp(state)
        }

        // Check if timer is already running and stop it
        if (timerPump) timerPump.stop()

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            timerPump.on('done', () => toggle.pumpWaterUp(false))

            // Start timer
            timerPump.start(Number(process.env.WS_PUMP_TIMEOUT), 1000)
        }

        // Return callback
        callback(logicRes)
    })

    // Transfer water down
    socket.on('transferWaterDown', (state, callback) => {
        // Variables
        let logicRes = { stateAllowed: false, msg: `Default state for transferWaterDown is 'false'.` }

        // Do not check for logic if manual is true and simply execute toggle
        if (wateringSystem.manual) {
            toggle.transferWaterDown(state)
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set for transferWaterDown.` }
        }
        // Check for logic if manual is false and execute toggle if possible
        else {
            logicRes = logic.transferWaterDown(state)
            if (logicRes.stateAllowed) toggle.transferWaterDown(state)
        }

        // Check if timer is already running and stop it
        if (timerTransfer) timerTransfer.stop()

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            timerTransfer.on('done', () => toggle.transferWaterDown(false))

            // Start timer
            timerTransfer.start(Number(process.env.WS_TRANSFER_TIMEOUT), 1000)
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
            logicRes = { stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set for rain.` }
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
        callback({ stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set for floater1.` })
    })

    // Floater 2
    socket.on('floater2', (state, callback) => {
        // Set floater2
        toggle.floater2(state)

        // Return callback
        callback({ stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set for floater2.` })
    })

    // Floater 3
    socket.on('floater3', (state, callback) => {
        // Set floater3
        toggle.floater3(state)

        // Return callback
        callback({ stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set for floater3.` })
    })

    // Floater 4
    socket.on('floater4', (state, callback) => {
        // Set floater4
        toggle.floater4(state)

        // Return callback
        callback({ stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set for floater4.` })
    })

    // Floater 5
    socket.on('floater5', (state, callback) => {
        // Set floater5
        toggle.floater5(state)

        // Return callback
        callback({ stateAllowed: true, msg: `Allowed state '${state}' to be forcefully set for floater5.` })
    })
})
