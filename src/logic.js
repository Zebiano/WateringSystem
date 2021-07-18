// Require: Libs
const toggle = require(`./lib/toggleStates`)

// Variables
const ws = wateringSystem.states

/**
 * Run logic and act upon states
 */
exports.run = () => {
    /* --- valve1 to valve4 --- */
    // If any valve1 to valve4 is enabled
    if (ws.valve1 || ws.valve2 || ws.valve3 || ws.valve4) {
        // If floater1 is false, disable all valve1 to valve4
        if (!ws.floater1) {
            toggle.valve1(false)
            toggle.valve2(false)
            toggle.valve3(false)
            toggle.valve4(false)
        }
    }

    /* --- tapWater --- */
    // If tapWater and rain are disabled
    if (!ws.tapWater && !ws.rain) {
        // If all floaters are false, enable tapWater
        if (!ws.floater1 && !ws.floater2 && !ws.floater3 && !ws.floater4 && !ws.floater5) toggle.tapWater(true)
    }
    // If tapWater is enabled
    else if (ws.tapWater) {
        // If rain is enabled
        if (ws.rain) toggle.tapWater(false)
        // If any floater is true, disable tapWater
        else if (ws.floater1 || ws.floater2 || ws.floater3 || ws.floater4 || ws.floater5) toggle.tapWater(false)
    }

    /* --- pumpWaterUp --- */
    // If pumpWaterUp is disabled
    if (!ws.pumpWaterUp) {
        // If floater3 is true and floater5 false, enable pumpWaterUp
        if (ws.floater3 && !ws.floater5) toggle.pumpWaterUp(true)
    }
    // If pumpWaterUp is enabled
    else if (ws.pumpWaterUp) {
        // If floater5 is true or floater1 or floater2 or floater3 is false, disable pumpWaterUp
        if (ws.floater5 || !ws.floater1 || !ws.floater2 || !ws.floater3) toggle.pumpWaterUp(false)
    }

    /* --- transferWaterDown --- */
    // If transferWaterDown is disabled
    if (!ws.transferWaterDown) {
        // If floater2 is false and floater4 or floater5 are true, enable transferWaterDown
        if (!ws.floater2 && (ws.floater4 || ws.floater5)) toggle.transferWaterDown(true)
    }
    // If transferWaterDown is enabled
    else if (ws.transferWaterDown) {
        // If floater4 is false, disable transferWaterDown
        if (!ws.floater4) toggle.transferWaterDown(false)
        // If floater3 is true, disable transferWaterDown
        else if (ws.floater3) toggle.transferWaterDown(false)
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
