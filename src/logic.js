// Require: Libs
const toggle = require(`./lib/toggleStates`)

// Variables
const ws = wateringSystem.states

// TODO: 1 3 4 and for makes a  call stack size exceeded
// TODO: Check for impossible situations and let user know something isn't right and turn manual mode on with everything false

/**
 * Run logic and act upon states.
 * 
 * The following logic has been coded with the minimum amount of floaters in mind.
 * For example, instead of checking if floaters 1, 2 and 3 are full to turn the pump on, floater 3 is enough to enable it.
 * This has pros and cons.
 * A pro being that it relies on less floaters and so a smaller chance of being a floater that breaks.
 * A con being that on some cases, if a floater breaks, the system may break completely.
 * 
 * Here's a list of said examples:
 * Floaters 1, 3 and 4 will trigger both valves 6 and 7 (pump and transfer)
 * Floaters 1, 3, 4 and 5 will trigger valve 7 on and off (transfer)
 */
exports.run = () => {
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
    // If tapWater and rain are disabled
    if (!ws.tapWater && !ws.rain) {
        // If floater1 and 4 are false, enable tapWater
        if (!ws.floater1 && !ws.floater4) toggle.tapWater(true)
    }
    // If tapWater is enabled
    else if (ws.tapWater) {
        // If rain is enabled
        if (ws.rain) toggle.tapWater(false)
        // If floater1 and 4 are true, disable tapWater
        else if (ws.floater1 || ws.floater4) toggle.tapWater(false)
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

// TODO: Check for 'force' in lib/toggleStates.js
// Run logic every x amount of time
if (!wateringSystem.ignoreLogic) setInterval(exports.run, 1000)

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
