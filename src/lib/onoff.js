// Require: Packages
const Gpio = require('onoff').Gpio

// Require: Libs
const scream = require(`./scream`)

// Check if GPIO are accessible in current environment
if (!Gpio.accessible) return scream.error(`GPIO ('onoff' module) not usable.`)

// Set pin 4 as input
const floater = new Gpio(4, 'in', 'both', { debounceTimeout: 10 })

// Watch if floater changes state
floater.watch((err, value) => {
    // Error checking
    if (err) throw err

    console.log(value)
});

// Free up resources when Ctrl+C
process.on('SIGINT', () => {
    led.unexport()
    button.unexport()
})
