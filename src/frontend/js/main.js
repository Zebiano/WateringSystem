// Variables
var socket = io()

// Refresh states every second
setInterval(updateStates, 1000)

/**
 * Send request to server to get states and update frontend accordingly
 */
function updateStates() {
    // Ask for states
    socket.emit("states", (states) => {
        // Update states frontend
        document.getElementById('switchValveOne').checked = states.valveOne
        document.getElementById('switchValveTwo').checked = states.valveTwo
        document.getElementById('switchValveThree').checked = states.valveThree
        document.getElementById('switchValveFour').checked = states.valveFour
        document.getElementById('switchRain').checked = states.rain
        document.getElementById('switchPump').checked = states.pump
        document.getElementById('switchTapWater').checked = states.tapWater
    });
}

/**
 * Toggle specific Valve
 * @param {number} valve Which valve to toggle
 * @param {boolean} state
 */
function toggleValve(valve, state) {
    switch (valve) {
        case 1: io().emit('valveOne', state, (states) => { updateStates() }); break
        case 2: io().emit('valveTwo', state, (states) => { updateStates() }); break
        case 3: io().emit('valveThree', state, (states) => { updateStates() }); break
        case 4: io().emit('valveFour', state, (states) => { updateStates() }); break
    }
}

/**
 * Toggle rain
 * @param {boolean} state
 */
function toggleRain(state) {
    io().emit('rain', state, (states) => { updateStates() })
}

/**
 * Toggle pump
 * @param {boolean} state
 */
function togglePump(state) {
    io().emit('pump', state, (states) => { updateStates() })
}

/**
 * Toggle tap water
 * @param {boolean} state
 */
function toggleTapWater(state) {
    io().emit('tapWater', state, (states) => { updateStates() })
}
