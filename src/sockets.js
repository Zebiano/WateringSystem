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
const timerManual = new tinyTimer()
exports.timerValve1 = new tinyTimer()
exports.timerValve2 = new tinyTimer()
exports.timerValve3 = new tinyTimer()
exports.timerValve4 = new tinyTimer()
exports.timerTapWater = new tinyTimer()
exports.timerPump = new tinyTimer()
exports.timerTransfer = new tinyTimer()

// Start io server
io.on('connection', (socket) => {
    // Return states when asked
    socket.on("states", (callback) => {
        callback(
            wateringSystem,
            logic.valve1(!wateringSystem.states.valve1),
            logic.valve2(!wateringSystem.states.valve2),
            logic.valve3(!wateringSystem.states.valve3),
            logic.valve4(!wateringSystem.states.valve4),
            logic.tapWater(!wateringSystem.states.tapWater),
            logic.pumpWaterUp(!wateringSystem.states.pumpWaterUp),
            logic.transferWaterDown(!wateringSystem.states.transferWaterDown)
        )
    })

    // Ignore logic
    socket.on('manual', (state, callback) => {
        toggle.manual(state)
        if (state) toggle.status('Manual mode active!', false, false)
        else resetEverything()

        // Check if timer is already running and stop it
        if (timerManual.status != 'stopped') timerManual.stop()

        // Run timer if necessary
        if (state) {
            // Events
            timerManual.on('done', () => {
                toggle.manual(false)
                toggle.status(`<b>WARNING</b> - Manual mode has been running for ${helper.msToHours(process.env.WS_MANUAL_TIMEOUT)} hours!<br>Manual mode deactivated for safety reasons.`, false, false)
            })

            // Start timer
            timerManual.start(Number(process.env.WS_MANUAL_TIMEOUT), 1000)
        }

        // Callback
        callback({ stateAllowed: true, msg: `Set manual to '${state}'.` })
    })

    // Valve 1
    socket.on('valve1', (state, duration, callback) => {
        // Variables
        logicRes = logic.valve1(state)

        // If manual is true and simply execute toggle
        if (wateringSystem.manual) toggle.valve1(state)
        // Check for logic if manual is false and execute toggle if possible
        else if (logicRes.stateAllowed) toggle.valve1(state)

        // Check if timer is already running and stop it
        if (exports.timerValve1.status != 'stopped') {
            exports.timerValve1.stop()
            io.emit('valve1Duration', helper.msToSeconds(process.env.WS_VALVE1_TIMEOUT))
        }

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            exports.timerValve1.on('tick', (ms) => io.emit('valve1Duration', helper.msToSeconds(ms)))
            exports.timerValve1.on('done', () => {
                toggle.valve1(false)
                io.emit('valve1Duration', helper.msToSeconds(process.env.WS_VALVE1_TIMEOUT))
            })

            // Start timer
            if (duration) exports.timerValve1.start(Number(duration), 1000)
            else exports.timerValve1.start(Number(process.env.WS_VALVE1_TIMEOUT), 1000)
        }

        // Return callback
        callback(logicRes)
    })

    // Valve 2
    socket.on('valve2', (state, duration, callback) => {
        // Variables
        logicRes = logic.valve2(state)

        // If manual is true and simply execute toggle
        if (wateringSystem.manual) toggle.valve2(state)
        // Check for logic if manual is false and execute toggle if possible
        else if (logicRes.stateAllowed) toggle.valve2(state)

        // Check if timer is already running and stop it
        if (exports.timerValve2.status != 'stopped') {
            exports.timerValve2.stop()
            io.emit('valve2Duration', helper.msToSeconds(process.env.WS_VALVE2_TIMEOUT))
        }

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            exports.timerValve2.on('tick', (ms) => io.emit('valve2Duration', helper.msToSeconds(ms)))
            exports.timerValve2.on('done', () => {
                toggle.valve2(false)
                io.emit('valve2Duration', helper.msToSeconds(process.env.WS_VALVE2_TIMEOUT))
            })

            // Start timer
            if (duration) exports.timerValve2.start(Number(duration), 1000)
            else exports.timerValve2.start(Number(process.env.WS_VALVE2_TIMEOUT), 1000)
        }

        // Return callback
        callback(logicRes)
    })

    // Valve 3
    socket.on('valve3', (state, duration, callback) => {
        // Variables
        logicRes = logic.valve3(state)

        // If manual is true and simply execute toggle
        if (wateringSystem.manual) toggle.valve3(state)
        // Check for logic if manual is false and execute toggle if possible
        else if (logicRes.stateAllowed) toggle.valve3(state)

        // Check if timer is already running and stop it
        if (exports.timerValve3.status != 'stopped') {
            exports.timerValve3.stop()
            io.emit('valve3Duration', helper.msToSeconds(process.env.WS_VALVE3_TIMEOUT))
        }

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            exports.timerValve3.on('tick', (ms) => io.emit('valve3Duration', helper.msToSeconds(ms)))
            exports.timerValve3.on('done', () => {
                toggle.valve3(false)
                io.emit('valve3Duration', helper.msToSeconds(process.env.WS_VALVE3_TIMEOUT))
            })

            // Start timer
            if (duration) exports.timerValve3.start(Number(duration), 1000)
            else exports.timerValve3.start(Number(process.env.WS_VALVE3_TIMEOUT), 1000)
        }

        // Return callback
        callback(logicRes)
    })

    // Valve 4
    socket.on('valve4', (state, duration, callback) => {
        // Variables
        logicRes = logic.valve4(state)

        // If manual is true and simply execute toggle
        if (wateringSystem.manual) toggle.valve4(state)
        // Check for logic if manual is false and execute toggle if possible
        else if (logicRes.stateAllowed) toggle.valve4(state)

        // Check if timer is already running and stop it
        if (exports.timerValve4.status != 'stopped') {
            exports.timerValve4.stop()
            io.emit('valve4Duration', helper.msToSeconds(process.env.WS_VALVE4_TIMEOUT))
        }

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            exports.timerValve4.on('tick', (ms) => io.emit('valve4Duration', helper.msToSeconds(ms)))
            exports.timerValve4.on('done', () => {
                toggle.valve4(false)
                io.emit('valve4Duration', helper.msToSeconds(process.env.WS_VALVE4_TIMEOUT))
            })

            // Start timer
            if (duration) exports.timerValve4.start(Number(duration), 1000)
            else exports.timerValve4.start(Number(process.env.WS_VALVE4_TIMEOUT), 1000)
        }

        // Return callback
        callback(logicRes)
    })

    // Tap Water
    socket.on('tapWater', (state, callback) => {
        // Variables
        logicRes = logic.tapWater(state)

        // If manual is true and simply execute toggle
        if (wateringSystem.manual) toggle.tapWater(state)
        // Check for logic if manual is false and execute toggle if possible
        else if (logicRes.stateAllowed) toggle.tapWater(state)

        // Check if timer is already running and stop it
        if (exports.timerTapWater.status != 'stopped') exports.timerTapWater.stop()

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            exports.timerTapWater.on('done', () => {
                toggle.tapWater(false)
                toggle.status(`<b>WARNING</b> - Tap water (valve 5) has been running for ${helper.msToHours(process.env.WS_TAPWATER_TIMEOUT)} hours!<br>Manual mode activated for safety reasons.`, true, true)
            })

            // Start timer
            exports.timerTapWater.start(Number(process.env.WS_TAPWATER_TIMEOUT), 1000)
        }

        // Return callback
        callback(logicRes)
    })

    // Pump Water Up
    socket.on('pumpWaterUp', (state, callback) => {
        // Variables
        logicRes = logic.pumpWaterUp(state)

        // If manual is true and simply execute toggle
        if (wateringSystem.manual) toggle.pumpWaterUp(state)
        // Check for logic if manual is false and execute toggle if possible
        else if (logicRes.stateAllowed) toggle.pumpWaterUp(state)

        // Check if timer is already running and stop it
        if (exports.timerPump.status != 'stopped') exports.timerPump.stop()

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            exports.timerPump.on('done', () => {
                toggle.pumpWaterUp(false)
                toggle.status(`<b>WARNING</b> - Pump (valve 6) has been running for ${helper.msToMinutes(process.env.WS_PUMP_TIMEOUT)} minutes!<br>Manual mode activated for safety reasons.`, true, true)
            })

            // Start timer
            exports.timerPump.start(Number(process.env.WS_PUMP_TIMEOUT), 1000)
        }

        // Return callback
        callback(logicRes)
    })

    // Transfer water down
    socket.on('transferWaterDown', (state, callback) => {
        // Variables
        logicRes = logic.transferWaterDown(state)

        // If manual is true and simply execute toggle
        if (wateringSystem.manual) toggle.transferWaterDown(state)
        // Check for logic if manual is false and execute toggle if possible
        else if (logicRes.stateAllowed) toggle.transferWaterDown(state)

        // Check if timer is already running and stop it
        if (exports.timerTransfer.status != 'stopped') exports.timerTransfer.stop()

        // Run timer if necessary
        if (state && logicRes.stateAllowed) {
            // Events
            exports.timerTransfer.on('done', () => {
                toggle.transferWaterDown(false)
                toggle.status(`<b>WARNING</b> - Transfer water down (valve 7) has been running for ${helper.msToMinutes(process.env.WS_TRANSFER_TIMEOUT)} minutes!<br>Manual mode activated for safety reasons.`, true, true)
            })

            // Start timer
            exports.timerTransfer.start(Number(process.env.WS_TRANSFER_TIMEOUT), 1000)
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

/* --- Function --- */
/**
 * Reset everything as if the raspberry pi has been restarted
 */
const resetEverything = () => {
    toggle.allFalse()
    timerManual.stop()
    exports.timerValve1.stop()
    exports.timerValve2.stop()
    exports.timerValve3.stop()
    exports.timerValve4.stop()
    exports.timerTapWater.stop()
    exports.timerPump.stop()
    exports.timerTransfer.stop()
    io.emit('valve1Duration', helper.msToSeconds(process.env.WS_VALVE1_TIMEOUT))
    io.emit('valve2Duration', helper.msToSeconds(process.env.WS_VALVE2_TIMEOUT))
    io.emit('valve3Duration', helper.msToSeconds(process.env.WS_VALVE3_TIMEOUT))
    io.emit('valve4Duration', helper.msToSeconds(process.env.WS_VALVE4_TIMEOUT))
}
