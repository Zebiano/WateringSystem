// Require: Packages
const gpio = require('pigpio').gpio

// Variables
const floater1 = new gpio(23, {
  mode: gpio.INPUT,
  pullUpDown: gpio.PUD_UP,
  alert: true
})
let count = 0

// Level must be stable for 10 ms before an alert event is emitted.
floater1.glitchFilter(10000)

// Event for floater1
floater1.on('alert', (level, tick) => {
  console.log(level)
  if (level === 0) {
    console.log(++count)
  }
})

// Free up resources when Ctrl+C
process.on('SIGINT', () => {
  floater1.unexport()
})
