/**
 * Toggle specific Valve
 * @param {number} valve Which valve to toggle
 * @param {boolean} state
 */
exports.toggleValve = (valve, state) => {
    switch (valve) {
        case 1: wateringSystem.states.valveOne = state; break
        case 2: wateringSystem.states.valveTwo = state; break
        case 3: wateringSystem.states.valveThree = state; break
        case 4: wateringSystem.states.valveFour = state; break
    }
}

/**
 * Toggle rain
 * @param {boolean} state
 */
exports.toggleRain = (state) => {
    wateringSystem.states.rain = state
}

/**
 * Toggle pump
 * @param {boolean} state
 */
exports.togglePump = (state) => {
    wateringSystem.states.pump = state
}

/**
 * Toggle tap water
 * @param {boolean} state
 */
exports.toggleTapWater = (state) => {
    wateringSystem.states.tapWater = state
}
