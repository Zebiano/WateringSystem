// Require: Files
const logic = require('../logic')
let hardware = null
if (process.env.WS_ENV == 'prod' || process.env.WS_ENV == 'production') hardware = require(`./src/hardware`)

// TODO: logic.run() most likely fucks up manual and/or force mode here

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
        console.log(hardware.valve1.digitalRead())
        hardware.valve1.digitalWrite(1)
    }
    logic.run()
}

/**
 * Toggle valve 2
 * @param {boolean} state
 */
exports.valve2 = (state) => {
    wateringSystem.states.valve2 = state
    logic.run()
}

/**
 * Toggle valve 3
 * @param {boolean} state
 */
exports.valve3 = (state) => {
    wateringSystem.states.valve3 = state
    logic.run()
}

/**
 * Toggle valve 4
 * @param {boolean} state
 */
exports.valve4 = (state) => {
    wateringSystem.states.valve4 = state
    logic.run()
}

/**
 * Toggle tap water (valve 5)
 * @param {boolean} state
 */
exports.tapWater = (state) => {
    wateringSystem.states.tapWater = state
    logic.run()
}

/**
 * Toggle pumpWaterUp (valve 6)
 * @param {boolean} state
 */
exports.pumpWaterUp = (state) => {
    wateringSystem.states.pumpWaterUp = state
    logic.run()
}

/**
 * Toggle transferWaterDown (valve 7)
 * @param {boolean} state
 */
exports.transferWaterDown = (state) => {
    wateringSystem.states.transferWaterDown = state
    logic.run()
}

/**
 * Toggle rain
 * @param {boolean} state
 */
exports.rain = (state) => {
    wateringSystem.states.rain = state
    logic.run()
}

/**
 * Toggle floater1
 * @param {boolean} state
 */
exports.floater1 = (state) => {
    wateringSystem.states.floater1 = state
    logic.run()
}

/**
 * Toggle floater2
 * @param {boolean} state
 */
exports.floater2 = (state) => {
    wateringSystem.states.floater2 = state
    logic.run()
}
/**
 * Toggle floater3
 * @param {boolean} state
 */
exports.floater3 = (state) => {
    wateringSystem.states.floater3 = state
    logic.run()
}
/**
 * Toggle floater4
 * @param {boolean} state
 */
exports.floater4 = (state) => {
    wateringSystem.states.floater4 = state
    logic.run()
}
/**
 * Toggle floater5
 * @param {boolean} state
 */
exports.floater5 = (state) => {
    wateringSystem.states.floater5 = state
    logic.run()
}
