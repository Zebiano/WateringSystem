// Require: Files
const hardware = (process.env.WS_ENV == 'prod' || process.env.WS_ENV == 'production') ? require(`./hardware`) : null

/**
 * Toggle manual
 * @param {boolean} state
 * @param {boolean} neverExit If true, does not start timer to put manual mode back to false
 */
exports.manual = (state, neverExit) => {
    wateringSystem.manual = state

    // Turn manual mode back off after x amount of time
    if (state && !neverExit) setTimeout(() => { wateringSystem.manual = false }, process.env.WS_MANUAL_TIMEOUT)
}

/**
 * Set state of every user changeable state entry to false
 */
exports.allFalse = () => {
    wateringSystem.states.valve1 = false
    wateringSystem.states.valve2 = false
    wateringSystem.states.valve3 = false
    wateringSystem.states.valve4 = false
    wateringSystem.states.tapWater = false
    wateringSystem.states.pumpWaterUp = false
    wateringSystem.states.transferWaterDown = false
    wateringSystem.states.rain = false

    // Change hardware states as well
    if (hardware) {
        hardware.valve1.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
        hardware.valve2.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
        hardware.valve3.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
        hardware.valve4.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
        hardware.tapWater.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
        hardware.pumpWaterUp.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
        hardware.transferWaterDown.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
    }
}

/**
 * Set all floater states
 */
exports.readAllFloaters = () => {
    if (hardware) {
        // console.log(Boolean(hardware.floater1.digitalRead()))
        // exports.floater1(Boolean(hardware.valve1.digitalRead()))
        /* exports.floater1(Boolean(hardware.floater1.digitalRead()))
        exports.floater2(Boolean(hardware.floater2.digitalRead()))
        exports.floater3(Boolean(hardware.floater3.digitalRead()))
        exports.floater4(Boolean(hardware.floater4.digitalRead()))
        exports.floater5(Boolean(hardware.floater5.digitalRead())) */
    }
}

/**
 * Set status data
 * @param {string} msg 
 * @param {boolean} manual 
 * @param {boolean} neverExit 
 */
exports.status = (msg, manual, neverExit) => {
    wateringSystem.status.msg = msg
    if (manual) {
        exports.manual(true, neverExit)
        exports.allFalse()
    }
}

/**
 * Toggle valve 1
 * @param {boolean} state
 * @param {number} duration in ms
 */
exports.valve1 = (state) => {
    wateringSystem.states.valve1 = state
    if (hardware) {
        if (state) hardware.valve1.digitalWrite(wateringSystem.relaysNaturallyOff ? 1 : 0)
        else hardware.valve1.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
    }
}

/**
 * Toggle valve 2
 * @param {boolean} state
 */
exports.valve2 = (state) => {
    wateringSystem.states.valve2 = state
    if (hardware) {
        if (state) hardware.valve2.digitalWrite(wateringSystem.relaysNaturallyOff ? 1 : 0)
        else hardware.valve2.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
    }
}

/**
 * Toggle valve 3
 * @param {boolean} state
 */
exports.valve3 = (state) => {
    wateringSystem.states.valve3 = state
    if (hardware) {
        if (state) hardware.valve3.digitalWrite(wateringSystem.relaysNaturallyOff ? 1 : 0)
        else hardware.valve3.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
    }
}

/**
 * Toggle valve 4
 * @param {boolean} state
 */
exports.valve4 = (state) => {
    wateringSystem.states.valve4 = state
    if (hardware) {
        if (state) hardware.valve4.digitalWrite(wateringSystem.relaysNaturallyOff ? 1 : 0)
        else hardware.valve4.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
    }
}

/**
 * Toggle tap water (valve 5)
 * @param {boolean} state
 */
exports.tapWater = (state) => {
    wateringSystem.states.tapWater = state
    if (hardware) {
        if (state) hardware.tapWater.digitalWrite(wateringSystem.relaysNaturallyOff ? 1 : 0)
        else hardware.tapWater.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
    }
}

/**
 * Toggle pumpWaterUp (valve 6)
 * @param {boolean} state
 */
exports.pumpWaterUp = (state) => {
    wateringSystem.states.pumpWaterUp = state
    if (hardware) {
        if (state) hardware.pumpWaterUp.digitalWrite(wateringSystem.relaysNaturallyOff ? 1 : 0)
        else hardware.pumpWaterUp.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
    }
}

/**
 * Toggle transferWaterDown (valve 7)
 * @param {boolean} state
 */
exports.transferWaterDown = (state) => {
    wateringSystem.states.transferWaterDown = state
    if (hardware) {
        if (state) hardware.transferWaterDown.digitalWrite(wateringSystem.relaysNaturallyOff ? 1 : 0)
        else hardware.transferWaterDown.digitalWrite(wateringSystem.relaysNaturallyOff ? 0 : 1)
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
