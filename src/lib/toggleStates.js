// Require: Files
const logic = require('../logic')

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
}

/**
 * Toggle valve 2
 * @param {boolean} state
 */
 exports.valve2 = (state) => {
    wateringSystem.states.valve2 = state
}

/**
 * Toggle valve 3
 * @param {boolean} state
 */
 exports.valve3 = (state) => {
    wateringSystem.states.valve3 = state
}

/**
 * Toggle valve 4
 * @param {boolean} state
 */
 exports.valve4 = (state) => {
    wateringSystem.states.valve4 = state
}

/**
 * Toggle tap water (valve 5)
 * @param {boolean} state
 */
 exports.tapWater = (state) => {
    wateringSystem.states.tapWater = state
}

/**
 * Toggle pumpWaterUp (valve 6)
 * @param {boolean} state
 */
 exports.pumpWaterUp = (state) => {
    wateringSystem.states.pumpWaterUp = state
}

/**
 * Toggle transferWaterDown (valve 7)
 * @param {boolean} state
 */
 exports.transferWaterDown = (state) => {
    wateringSystem.states.transferWaterDown = state
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
