// Require: Files
const logic = require('../logic')
let hardware = null
if (process.env.WS_ENV == 'prod' || process.env.WS_ENV == 'production') hardware = require(`../hardware`)

/**
 * Toggle ignoreLogic
 * @param {boolean} state
 */
exports.ignoreLogic = (state) => {
    wateringSystem.ignoreLogic = state
}

/**
 * Toggle valve 1
 * @param {boolean} state
 */
exports.valve1 = (state) => {
    wateringSystem.states.valve1 = state
    if (hardware) {
        if (state) hardware.valve1.digitalWrite(1)
        else hardware.valve1.digitalWrite(0)
    }
}

/**
 * Toggle valve 2
 * @param {boolean} state
 */
exports.valve2 = (state) => {
    wateringSystem.states.valve2 = state
    if (hardware) {
        if (state) hardware.valve2.digitalWrite(1)
        else hardware.valve2.digitalWrite(0)
    }
}

/**
 * Toggle valve 3
 * @param {boolean} state
 */
exports.valve3 = (state) => {
    wateringSystem.states.valve3 = state
    if (hardware) {
        if (state) hardware.valve3.digitalWrite(1)
        else hardware.valve3.digitalWrite(0)
    }
}

/**
 * Toggle valve 4
 * @param {boolean} state
 */
exports.valve4 = (state) => {
    wateringSystem.states.valve4 = state
    if (hardware) {
        if (state) hardware.valve4.digitalWrite(1)
        else hardware.valve4.digitalWrite(0)
    }
}

/**
 * Toggle tap water (valve 5)
 * @param {boolean} state
 */
exports.tapWater = (state) => {
    wateringSystem.states.tapWater = state
    if (hardware) {
        if (state) hardware.tapWater.digitalWrite(1)
        else hardware.tapWater.digitalWrite(0)
    }
}

/**
 * Toggle pumpWaterUp (valve 6)
 * @param {boolean} state
 */
exports.pumpWaterUp = (state) => {
    wateringSystem.states.pumpWaterUp = state
    if (hardware) {
        if (state) hardware.pumpWaterUp.digitalWrite(1)
        else hardware.pumpWaterUp.digitalWrite(0)
    }
}

/**
 * Toggle transferWaterDown (valve 7)
 * @param {boolean} state
 */
exports.transferWaterDown = (state) => {
    wateringSystem.states.transferWaterDown = state
    if (hardware) {
        if (state) hardware.transferWaterDown.digitalWrite(1)
        else hardware.transferWaterDown.digitalWrite(0)
    }
}

/**
 * Toggle rain
 * @param {boolean} state
 */
exports.rain = (state) => {
    wateringSystem.states.rain = state
}

/**
 * Toggle floater1
 * @param {boolean} state
 */
exports.floater1 = (state) => {
    wateringSystem.states.floater1 = state
}

/**
 * Toggle floater2
 * @param {boolean} state
 */
exports.floater2 = (state) => {
    wateringSystem.states.floater2 = state
}
/**
 * Toggle floater3
 * @param {boolean} state
 */
exports.floater3 = (state) => {
    wateringSystem.states.floater3 = state
}
/**
 * Toggle floater4
 * @param {boolean} state
 */
exports.floater4 = (state) => {
    wateringSystem.states.floater4 = state
}
/**
 * Toggle floater5
 * @param {boolean} state
 */
exports.floater5 = (state) => {
    wateringSystem.states.floater5 = state
}
