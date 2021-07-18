// Require: Files
const logic = require('../logic')

/**
 * Toggle specific Valve if possible
 * @param {number} valve Which valve to toggle
 * @param {boolean} state
 */
exports.valve = (valve, state) => {
    switch (valve) {
        case 1: wateringSystem.states.valveOne = state; break
        case 2: wateringSystem.states.valveTwo = state; break
        case 3: wateringSystem.states.valveThree = state; break
        case 4: wateringSystem.states.valveFour = state; break
    }
}

/**
 * Toggle rain if possible
 * @param {boolean} state
 */
exports.rain = (state) => {
    wateringSystem.states.rain = state
}

/**
 * Toggle pump if possible
 * @param {boolean} state
 */
exports.pump = (state) => {
    wateringSystem.states.pump = state
}

/**
 * Toggle tap water if possible
 * @param {boolean} state
 */
exports.tapWater = (state) => {
    wateringSystem.states.tapWater = state
}
