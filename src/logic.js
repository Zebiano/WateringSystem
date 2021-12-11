// Require: Files
const toggle = require(`./toggleStates`)
const sockets = require(`./sockets`)

// Variables
const ws = wateringSystem.states

// Run logic every x amount of time if not in manual mode
setInterval(() => { if (!wateringSystem.manual) exports.run() }, 500)

/**
 * Run logic and act upon states.
 */
exports.run = () => {
    /* --- Check for impossible situations --- */
    if (!ws.floater1 && ws.floater2) return toggle.status('<b>WARNING</b> - One of the following floaters might not be working as expected: <b>1</b> or <b>2</b>.<br>Manual mode activated for safety reasons.', true, true)
    else if (!ws.floater1 && ws.floater3) return toggle.status('<b>WARNING</b> - One of the following floaters might not be working as expected: <b>1</b> or <b>3</b>.<br>Manual mode activated for safety reasons.', true, true)
    else if (!ws.floater2 && ws.floater3) return toggle.status('<b>WARNING</b> - One of the following floaters might not be working as expected: <b>2</b> or <b>3</b>.<br>Manual mode activated for safety reasons.', true, true)
    else if (!ws.floater4 && ws.floater5) return toggle.status('<b>WARNING</b> - One of the following floaters might not be working as expected: <b>4</b> or <b>5</b>.<br>Manual mode activated for safety reasons.', true, true)
    else toggle.status('All seems good! :)', false, false)

    /* --- valve1 to valve4 --- */
    // If any valve1 to valve4 is enabled
    if (ws.valve1 || ws.valve2 || ws.valve3 || ws.valve4) {
        // If floater1 is false, disable all valves 1 to 4
        if (!ws.floater1) {
            toggle.valve1(false)
            toggle.valve2(false)
            toggle.valve3(false)
            toggle.valve4(false)
        }
    }

    /* --- tapWater --- */
    // If timer is not running
    if (sockets.timerTapWater.status == 'stopped') {
        // If tapWater and rain are disabled
        if (!ws.tapWater) {
            // If floater1 and rain are false, enable tapWater
            if (!ws.floater1 && !ws.rain) toggle.tapWater(true)
        }
        // If tapWater is enabled
        else if (ws.tapWater) {
            // If rain is enabled
            if (ws.rain) toggle.tapWater(false)
            // If floater1 is true and floater2 is false
            else if (ws.floater1) toggle.tapWater(false)
        }
    }

    /* --- pumpWaterUp --- */
    // If timer is not running
    if (sockets.timerPump.status == 'stopped') {
        // If pumpWaterUp is disabled
        if (!ws.pumpWaterUp) {
            // If floater3 is true and floater5 false, enable pumpWaterUp
            if (ws.floater3 && !ws.floater5) toggle.pumpWaterUp(true)
        }
        // If pumpWaterUp is enabled
        else if (ws.pumpWaterUp) {
            // If floater5 is true or floater3 false, disable pumpWaterUp
            if (ws.floater5 || !ws.floater3) toggle.pumpWaterUp(false)
        }
    }

    /* --- transferWaterDown --- */
    // If timer is not running
    if (sockets.timerTransfer.status == 'stopped') {
        // If transferWaterDown is disabled
        if (!ws.transferWaterDown) {
            // If floater2 is false and floater4 or floater5 are true, enable transferWaterDown
            if (!ws.floater2 && ws.floater4) toggle.transferWaterDown(true)
        }
        // If transferWaterDown is enabled
        else if (ws.transferWaterDown) {
            // If floater4 is false or floater2 true, disable transferWaterDown
            if (!ws.floater4 || ws.floater2) toggle.transferWaterDown(false)
        }
    }
}

/**
 * Run logic related to `valve1`
 * @param {boolean} desiredState
 * @returns {object}
 */
exports.valve1 = (desiredState) => {
    // If manual mode is active
    if (wateringSystem.manual) return { stateAllowed: true, msg: `Allowed state '${desiredState}' to be forcefully set for valve1.` }
    // If desiredState is true
    else if (desiredState) {
        // valve1 cannot be enabled if floater1 is false
        if (!ws.floater1) return { stateAllowed: false, msg: 'Tank 1 is empty!' }
        else return { stateAllowed: true, msg: `Set valve1 to '${desiredState}'.` }
    }
    // Rest is always OK
    else return { stateAllowed: true, msg: `Set valve1 to '${desiredState}'.` }
}

/**
 * Run logic related to `valve2`
 * @param {boolean} desiredState
 * @returns {object}
 */
exports.valve2 = (desiredState) => {
    // If manual mode is active
    if (wateringSystem.manual) return { stateAllowed: true, msg: `Allowed state '${desiredState}' to be forcefully set for valve2.` }
    // If desiredState is true
    else if (desiredState) {
        // valve2 cannot be enabled if floater1 is false
        if (!ws.floater1) return { stateAllowed: false, msg: 'Tank 1 is empty!' }
        else return { stateAllowed: true, msg: `Set valve2 to '${desiredState}'.` }
    }
    // Rest is always OK
    else return { stateAllowed: true, msg: `Set valve2 to '${desiredState}'.` }
}

/**
 * Run logic related to `valve3`
 * @param {boolean} desiredState
 * @returns {object}
 */
exports.valve3 = (desiredState) => {
    // If manual mode is active
    if (wateringSystem.manual) return { stateAllowed: true, msg: `Allowed state '${desiredState}' to be forcefully set for valve3.` }
    // If desiredState is true
    else if (desiredState) {
        // valve3 cannot be enabled if floater1 is false
        if (!ws.floater1) return { stateAllowed: false, msg: 'Tank 1 is empty!' }
        else return { stateAllowed: true, msg: `Set valve3 to '${desiredState}'.` }
    }
    // Rest is always OK
    else return { stateAllowed: true, msg: `Set valve3 to '${desiredState}'.` }
}

/**
 * Run logic related to `valve4`
 * @param {boolean} desiredState
 * @returns {object}
 */
exports.valve4 = (desiredState) => {
    // If manual mode is active
    if (wateringSystem.manual) return { stateAllowed: true, msg: `Allowed state '${desiredState}' to be forcefully set for valve4.` }
    // If desiredState is true
    else if (desiredState) {
        // valve4 cannot be enabled if floater1 is false
        if (!ws.floater1) return { stateAllowed: false, msg: 'Tank 1 is empty!' }
        else return { stateAllowed: true, msg: `Set valve4 to '${desiredState}'.` }
    }
    // Rest is always OK
    else return { stateAllowed: true, msg: `Set valve4 to '${desiredState}'.` }
}

/**
 * Run logic related to `tapWater`
 * @param {boolean} desiredState
 * @returns {object}
 */
exports.tapWater = (desiredState) => {
    // If manual mode is active
    if (wateringSystem.manual) return { stateAllowed: true, msg: `Allowed state '${desiredState}' to be forcefully set for tapWater.` }
    // If desiredState is true
    else if (desiredState) {
        // tapWater cannot be enabled if floater5 and floater3 are true
        if (ws.floater3 && ws.floater5) return { stateAllowed: false, msg: 'Tanks are full!' }
        else if (ws.rain) return { stateAllowed: false, msg: 'It is raining!' }
        else return { stateAllowed: true, msg: `Set tapWater to '${desiredState}'.` }
    }
    // If desiredState is false
    else if (!desiredState) {
        // tapWater cannot be disabled if floater1 and floater4 are false
        if (!ws.floater1 && !ws.floater4) return { stateAllowed: false, msg: 'Tanks are empty!' }
        else return { stateAllowed: true, msg: `Set tapWater to '${desiredState}'.` }
    }
}

/**
 * Run logic related to `pumpWaterUp`
 * @param {boolean} desiredState
 * @returns {object}
 */
exports.pumpWaterUp = (desiredState) => {
    // If manual mode is active
    if (wateringSystem.manual) return { stateAllowed: true, msg: `Allowed state '${desiredState}' to be forcefully set for pumpWaterUp.` }
    // If desiredState is true
    else if (desiredState) {
        // pumpWaterUp cannot be enabled if floater5 is true
        if (ws.floater5) return { stateAllowed: false, msg: 'Tank 2 full!' }
        // pumpWaterUp cannot be enabled if floater1 is false
        else if (!ws.floater1) return { stateAllowed: false, msg: 'Tank 1 is empty!' }
        else return { stateAllowed: true, msg: `Set pumpWaterUp to '${desiredState}'.` }
    }
    // Rest is always OK
    else return { stateAllowed: true, msg: `Set pumpWaterUp to '${desiredState}'.` }
}

/**
 * Run logic related to `transferWaterDown`
 * @param {boolean} desiredState
 * @returns {object}
 */
exports.transferWaterDown = (desiredState) => {
    // If manual mode is active
    if (wateringSystem.manual) return { stateAllowed: true, msg: `Allowed state '${desiredState}' to be forcefully set for transferWaterDown.` }
    // If desiredState is true
    else if (desiredState) {
        // transferWaterDown cannot be enabled if floater4 is false
        if (!ws.floater4) return { stateAllowed: false, msg: 'Tank 2 is empty!' }
        else return { stateAllowed: true, msg: `Set transferWaterDown to '${desiredState}'.` }
    }
    // Rest is always OK
    else return { stateAllowed: true, msg: `Set transferWaterDown to '${desiredState}'.` }
}

/**
 * Run logic related to `rain`
 * @param {boolean} desiredState
 * @returns {object}
 */
exports.rain = (desiredState) => {
    // It is always OK to enable rain
    return { stateAllowed: true, msg: `Set rain to '${desiredState}'.` }
}
