// Require: Libs
const toggle = require(`./lib/toggleStates`)
const sockets = require(`./sockets`)

// Variables
const ws = wateringSystem.states

// Run logic every x amount of time if not in manual mode
setInterval(() => {
    if (!wateringSystem.manual) exports.run()
}, 1000)

/**
 * Run logic and act upon states.
 * 
 * Floaters 1, 3 and 4 will trigger both valves 6 and 7 (pump and transfer)
 * Floaters 1, 3, 4 and 5 will trigger valve 7 on and off (transfer)
 */
exports.run = () => {
    /* --- Check for impossible situations --- */
    if (!ws.floater1 && ws.floater2) return toggle.status('WARNING - One of the following floaters might not be working as expected: 1 or 2.<br>Manual mode activated for safety reasons.', true, true)
    else if (!ws.floater1 && ws.floater3) return toggle.status('WARNING - One of the following floaters might not be working as expected: 1 or 3.<br>Manual mode activated for safety reasons.', true, true)
    else if (!ws.floater2 && ws.floater3) return toggle.status('WARNING - One of the following floaters might not be working as expected: 2 or 3.<br>Manual mode activated for safety reasons.', true, true)
    else if (!ws.floater4 && ws.floater5) return toggle.status('WARNING - One of the following floaters might not be working as expected: 4 or 5.<br>Manual mode activated for safety reasons.', true, true)
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

    // TODO: Logic of this shit.
    // TODO: Maybe if only 4 is enabled, turn on Valve 5 and 7 (tap water and transfer water)
    /* --- tapWater --- */
    // If tapWater and rain are disabled
    if (!ws.tapWater && !ws.rain) {
        // If floater1 is false, enable tapWater
        if (!ws.floater1) toggle.tapWater(true)
    }
    // If tapWater is enabled
    else if (ws.tapWater) {
        // If rain is enabled
        if (ws.rain) toggle.tapWater(false)
        // If floater1 is true and floater2 is false
        if (ws.floater1 && !ws.floater2) toggle.tapWater(false)
        // If floater 1 and 4 are true and floater2 is false, disable tapWater
        else if (ws.floater1 && !ws.floater2 && ws.floater4) toggle.tapWater(false)
    }

    /* --- pumpWaterUp --- */
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

    /* --- transferWaterDown --- */
    // If transferWaterDown is disabled
    if (!ws.transferWaterDown) {
        // If floater2 is false and floater4 or floater5 are true, enable transferWaterDown
        if (!ws.floater2 && ws.floater4) toggle.transferWaterDown(true)
    }
    // If transferWaterDown is enabled
    else if (ws.transferWaterDown) {
        // If floater4 is false or floater3 true, disable transferWaterDown
        if (!ws.floater4 || ws.floater3) toggle.transferWaterDown(false)
    }
}

/**
 * Run logic related to `valve1`
 * @param {boolean} desiredState
 * @returns {object}
 */
exports.valve1 = (desiredState) => {
    // If desiredState is true
    if (desiredState) {
        // valve1 cannot be enabled if floater 1 is false
        if (!ws.floater1) return { stateAllowed: false, msg: 'Reservatorio 1 vazio!' }
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
    // If desiredState is true
    if (desiredState) {
        // valve2 cannot be enabled if floater 1 is false
        if (!ws.floater1) return { stateAllowed: false, msg: 'Reservatorio 1 vazio!' }
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
    // If desiredState is true
    if (desiredState) {
        // valve3 cannot be enabled if floater 1 is false
        if (!ws.floater1) return { stateAllowed: false, msg: 'Reservatorio 1 vazio!' }
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
    // If desiredState is true
    if (desiredState) {
        // valve4 cannot be enabled if floater 1 is false
        if (!ws.floater1) return { stateAllowed: false, msg: 'Reservatorio 1 vazio!' }
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
    // If desiredState is true
    if (desiredState) {
        // tapWater cannot be enabled if floater5 and floater3 are true
        if (ws.floater3 && ws.floater5) return { stateAllowed: false, msg: 'Reservatorios cheios!' }
        else return { stateAllowed: true, msg: `Set tapWater to '${desiredState}'.` }
    }
    // If desiredState is false
    else if (!desiredState) {
        // tapWater cannot be disabled if floater1 and floater4 are false
        if (!ws.floater1 && !ws.floater4) return { stateAllowed: false, msg: 'Reservatorios vazios!' }
        else return { stateAllowed: true, msg: `Set tapWater to '${desiredState}'.` }
    }
}

/**
 * Run logic related to `pumpWaterUp`
 * @param {boolean} desiredState
 * @returns {object}
 */
exports.pumpWaterUp = (desiredState) => {
    // If desiredState is true
    if (desiredState) {
        // pumpWaterUp cannot be enabled if floater5 is true
        if (ws.floater5) return { stateAllowed: false, msg: 'Reservatorio 2 cheio!' }
        // pumpWaterUp cannot be enabled if floater1 is false
        else if (!ws.floater1) return { stateAllowed: false, msg: 'Reservatorio 1 vazio!' }
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
    // If desiredState is true
    if (desiredState) {
        // transferWaterDown cannot be enabled if floater4 is false
        if (!ws.floater4) return { stateAllowed: false, msg: 'Reservatorio 2 vazio!' }
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
