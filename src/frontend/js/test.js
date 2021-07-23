// Variables
var socket = io()

// Refresh states every second
setInterval(updateStates, 1000)

/**
 * Send request to server to get states and update frontend accordingly
 */
function updateStates() {
    // Ask for states
    socket.emit("states", (ws) => {
        // TODO: Would be cool to have switches disabled so the user cannot move them when it's stupid to move them
        // Update states frontend
        document.getElementById('textStatus').innerHTML = ws.status.msg
        document.getElementById('switchManual').checked = ws.manual

        document.getElementById('switchValve1').checked = ws.states.valve1
        document.getElementById('switchValve2').checked = ws.states.valve2
        document.getElementById('switchValve3').checked = ws.states.valve3
        document.getElementById('switchValve4').checked = ws.states.valve4
        document.getElementById('switchTapWater').checked = ws.states.tapWater
        document.getElementById('switchPumpWaterUp').checked = ws.states.pumpWaterUp
        document.getElementById('switchTransferWaterDown').checked = ws.states.transferWaterDown
        document.getElementById('switchRain').checked = ws.states.rain

        document.getElementById('switchFloater1').checked = ws.states.floater1
        document.getElementById('switchFloater2').checked = ws.states.floater2
        document.getElementById('switchFloater3').checked = ws.states.floater3
        document.getElementById('switchFloater4').checked = ws.states.floater4
        document.getElementById('switchFloater5').checked = ws.states.floater5
    })
}

/**
 * Toggle manual
 * @param {boolean} state
 */
 function toggleManual(state) {
    io().emit('manual', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates()
    })
}

/**
 * Toggle valve1
 * @param {boolean} state
 */
function toggleValve1(state) {
    io().emit('valve1', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates(true)
    })
}

/**
 * Toggle valve2
 * @param {boolean} state
 */
function toggleValve2(state) {
    io().emit('valve2', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates(true)
    })
}

/**
 * Toggle valve3
 * @param {boolean} state
 */
function toggleValve3(state) {
    io().emit('valve3', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates(true)
    })
}

/**
 * Toggle valve4
 * @param {boolean} state
 */
function toggleValve4(state) {
    io().emit('valve4', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates(true)
    })
}

/**
 * Toggle tap water
 * @param {boolean} state
 */
function toggleTapWater(state) {
    io().emit('tapWater', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates(true)
    })
}

/**
 * Toggle pumpWaterUp
 * @param {boolean} state
 */
function togglePumpWaterUp(state) {
    io().emit('pumpWaterUp', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates(true)
    })
}

/**
 * Toggle transferWaterDown
 * @param {boolean} state
 */
function toggleTransferWaterDown(state) {
    io().emit('transferWaterDown', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates(true)
    })
}

/**
 * Toggle rain
 * @param {boolean} state
 */
function toggleRain(state) {
    io().emit('rain', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates(true)
    })
}

/**
 * Toggle floater1
 * @param {boolean} state
 */
function toggleFloater1(state) {
    io().emit('floater1', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates(true)
    })
}

/**
 * Toggle floater2
 * @param {boolean} state
 */
function toggleFloater2(state) {
    io().emit('floater2', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates(true)
    })
}

/**
 * Toggle floater3
 * @param {boolean} state
 */
function toggleFloater3(state) {
    io().emit('floater3', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates(true)
    })
}

/**
 * Toggle floater4
 * @param {boolean} state
 */
function toggleFloater4(state) {
    io().emit('floater4', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates(true)
    })
}

/**
 * Toggle floater5
 * @param {boolean} state
 */
function toggleFloater5(state) {
    io().emit('floater5', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates(true)
    })
}
