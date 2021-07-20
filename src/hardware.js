// Require: Packages
const gpio = require('pigpio').Gpio

// Floater 1
const floater1 = new gpio(wateringSystem.rpiGpioPins.floater1, {
    mode: gpio.INPUT,
    pullUpDown: gpio.PUD_UP,
    alert: true
})

// Fire event when update
floater1.on('alert', (level) => {
    if (level == 0) wateringSystem.floater1 = true
    else if (level == 1) wateringSystem.floater1 = false
})

// Floater 2
const floater2 = new gpio(wateringSystem.rpiGpioPins.floater2, {
    mode: gpio.INPUT,
    pullUpDown: gpio.PUD_UP,
    alert: true
})

// Floater 3
const floater3 = new gpio(wateringSystem.rpiGpioPins.floater3, {
    mode: gpio.INPUT,
    pullUpDown: gpio.PUD_UP,
    alert: true
})

// Floater 4
const floater4 = new gpio(wateringSystem.rpiGpioPins.floater4, {
    mode: gpio.INPUT,
    pullUpDown: gpio.PUD_UP,
    alert: true
})

// Floater 5
const floater5 = new gpio(wateringSystem.rpiGpioPins.floater5, {
    mode: gpio.INPUT,
    pullUpDown: gpio.PUD_UP,
    alert: true
})

// Set glitch filters (debouncing time) of 10ms
floater1.glitchFilter(10000)
floater2.glitchFilter(10000)
floater3.glitchFilter(10000)
floater4.glitchFilter(10000)
floater5.glitchFilter(10000)
