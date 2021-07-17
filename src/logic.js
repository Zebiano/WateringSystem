// Require: Libs
const toggle = require(`./lib/toggleStates`)

// Variables
let ws = wateringSystem.states

if (!ws.floaterOne) toggle.togglePump(true)
