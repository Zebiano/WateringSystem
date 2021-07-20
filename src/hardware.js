// Require: Packages
const gpio = require('pigpio').Gpio

// Floater 1
const floater1 = new gpio(wateringSystem.rpiGpioPins.floater1, {
    mode: gpio.INPUT,
    pullUpDown: gpio.PUD_UP,
    alert: true
})

// Set floater1 state when updated
floater1.on('alert', (level) => {
    if (level == 0) wateringSystem.states.floater1 = true
    else wateringSystem.states.floater1 = false
})

// Floater 2
const floater2 = new gpio(wateringSystem.rpiGpioPins.floater2, {
    mode: gpio.INPUT,
    pullUpDown: gpio.PUD_UP,
    alert: true
})

// Set floater2 state when updated
floater2.on('alert', (level) => {
    if (level == 0) wateringSystem.states.floater2 = true
    else wateringSystem.states.floater2 = false
})

// Floater 3
const floater3 = new gpio(wateringSystem.rpiGpioPins.floater3, {
    mode: gpio.INPUT,
    pullUpDown: gpio.PUD_UP,
    alert: true
})

// Set floater3 state when updated
floater3.on('alert', (level) => {
    if (level == 0) wateringSystem.states.floater3 = true
    else wateringSystem.states.floater3 = false
})

// Floater 4
const floater4 = new gpio(wateringSystem.rpiGpioPins.floater4, {
    mode: gpio.INPUT,
    pullUpDown: gpio.PUD_UP,
    alert: true
})

// Set floater4 state when updated
floater4.on('alert', (level) => {
    if (level == 0) wateringSystem.states.floater4 = true
    else wateringSystem.states.floater4 = false
})

// Floater 5
const floater5 = new gpio(wateringSystem.rpiGpioPins.floater5, {
    mode: gpio.INPUT,
    pullUpDown: gpio.PUD_UP,
    alert: true
})

// Set floater5 state when updated
floater5.on('alert', (level) => {
    if (level == 0) wateringSystem.states.floater5 = true
    else wateringSystem.states.floater5 = false
})

// Set glitch filters (debouncing time) of 10ms
floater1.glitchFilter(10000)
floater2.glitchFilter(10000)
floater3.glitchFilter(10000)
floater4.glitchFilter(10000)
floater5.glitchFilter(10000)
