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
        case 1:
            io().emit('valveOne', state, (res) => {
                if (!res.stateAllowed) alert(res.msg)
                updateStates()
            })
            break
        case 2:
            io().emit('valveTwo', state, (res) => {
                if (!res.stateAllowed) alert(res.msg)
                updateStates()
            })
            break
        case 3:
            io().emit('valveThree', state, (res) => {
                if (!res.stateAllowed) alert(res.msg)
                updateStates()
            })
            break
        case 4:
            io().emit('valveFour', state, (res) => {
                if (!res.stateAllowed) alert(res.msg)
                updateStates()
            })
            break
    }
}

/**
 * Toggle rain
 * @param {boolean} state
 */
function toggleRain(state) {
    io().emit('rain', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates()
    })
}

/**
 * Toggle pump
 * @param {boolean} state
 */
function togglePump(state) {
    io().emit('pump', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates()
    })
}

/**
 * Toggle tap water
 * @param {boolean} state
 */
function toggleTapWater(state) {
    io().emit('tapWater', state, (res) => {
        if (!res.stateAllowed) alert(res.msg)
        updateStates()
    })
}
