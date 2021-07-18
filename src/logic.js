// Require: Libs
const toggle = require(`./lib/toggleStates`)

// Variables
const ws = wateringSystem.states

/**
 * Run logic and act upon states
 */
exports.run = () => {
    // TODO: Do not let valves open if floater 1 is down
    // TODO: Create value override or whatever that if its enabled user has total control and there's a switch for it on frontend. 
    // TODO: Basically, logic for every action will be done if this override boolean is set to false, else simply execute action
    /* --- Rain --- */
    // If rain is disabled
    if (!ws.rain) {
        /* --- Tap Water --- */
        // If tapWater is disabled
        if (!ws.tapWater) {
            // If all floaters are false, enable tapWater
            if (!ws.floaterOne && !ws.floaterTwo && !ws.floaterThree && !ws.floaterFour && !ws.floaterFive) toggle.tapWater(true)
        }
        // If tapWater is enabled
        else if (ws.tapWater) {
            // If any floater is true, disable tapWater
            if (ws.floaterOne || ws.floaterTwo || ws.floaterThree || ws.floaterFour || ws.floaterFive) toggle.tapWater(false)
        }
    }

    /* --- Pump --- */
    // If pump is disabled
    if (!ws.pump) {
        // If floater 3 is true and floater 5 false, enable pump
        if (ws.floaterThree && !ws.floaterFive) toggle.pump(true)
    }
    // If pump is enabled
    else if (ws.pump) {
        // If floater 5 is true, disable pump
        if (ws.floaterFive) toggle.pump(false)
    }
}

/**
 * Run logic related to rain
 */
exports.rain = () => {
    // 
}

/**
 * Run logic related to `pump`
 * @param {boolean} desiredState
 * @returns {object}
 */
exports.pump = (desiredState) => {
    // If desiredState is true
    if (desiredState) {
        // Pump cannot be turned on if floater five is true
        if (ws.floaterFive) return { stateAllowed: false, msg: 'Reservatorio 2 cheio!' }
        // Else enable pump
        else return { stateAllowed: true }
    }
    // Rest is always OK
    else return true
}

/**
 * Run logic related to tapWater
 */
exports.tapWater = () => {
    // 
}
