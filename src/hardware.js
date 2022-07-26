// Require: Packages
const gpio = require('pigpio').Gpio

// Require: Files
const toggle = require(`./toggleStates`)

// Floater 1
exports.floater1 = new gpio(wateringSystem.rpiGpioPins.floater1, {
  mode: gpio.INPUT,
  pullUpDown: gpio.PUD_UP,
  alert: true
})

// Set floater1 state when updated
exports.floater1.on('alert', (level) => {
  if (level == 0) toggle.floater1(true)
  else toggle.floater1(false)
})

// Floater 2
exports.floater2 = new gpio(wateringSystem.rpiGpioPins.floater2, {
  mode: gpio.INPUT,
  pullUpDown: gpio.PUD_UP,
  alert: true
})

// Set floater2 state when updated
exports.floater2.on('alert', (level) => {
  if (level == 0) toggle.floater2(true)
  else toggle.floater2(false)
})

// Floater 3
exports.floater3 = new gpio(wateringSystem.rpiGpioPins.floater3, {
  mode: gpio.INPUT,
  pullUpDown: gpio.PUD_UP,
  alert: true
})

// Set floater3 state when updated
exports.floater3.on('alert', (level) => {
  if (level == 0) toggle.floater3(true)
  else toggle.floater3(false)
})

// Floater 4
exports.floater4 = new gpio(wateringSystem.rpiGpioPins.floater4, {
  mode: gpio.INPUT,
  pullUpDown: gpio.PUD_UP,
  alert: true
})

// Set floater4 state when updated
exports.floater4.on('alert', (level) => {
  if (level == 0) toggle.floater4(true)
  else toggle.floater4(false)
})

// Floater 5
exports.floater5 = new gpio(wateringSystem.rpiGpioPins.floater5, {
  mode: gpio.INPUT,
  pullUpDown: gpio.PUD_UP,
  alert: true
})

// Set floater5 state when updated
exports.floater5.on('alert', (level) => {
  if (level == 0) toggle.floater5(true)
  else toggle.floater5(false)
})

// Set glitch filters (debouncing time) of 10ms
exports.floater1.glitchFilter(10000)
exports.floater2.glitchFilter(10000)
exports.floater3.glitchFilter(10000)
exports.floater4.glitchFilter(10000)
exports.floater5.glitchFilter(10000)

// Valve 1
exports.valve1 = new gpio(wateringSystem.rpiGpioPins.valve1, {
  mode: gpio.INPUT
})

// Valve 2
exports.valve2 = new gpio(wateringSystem.rpiGpioPins.valve2, {
  mode: gpio.INPUT
})

// Valve 3
exports.valve3 = new gpio(wateringSystem.rpiGpioPins.valve3, {
  mode: gpio.INPUT
})

// Valve 4
exports.valve4 = new gpio(wateringSystem.rpiGpioPins.valve4, {
  mode: gpio.INPUT
})

// Valve 5
exports.tapWater = new gpio(wateringSystem.rpiGpioPins.tapWater, {
  mode: gpio.INPUT
})

// Valve 6
exports.pumpWaterUp = new gpio(wateringSystem.rpiGpioPins.pumpWaterUp, {
  mode: gpio.INPUT
})

// Valve 7
exports.transferWaterDown = new gpio(wateringSystem.rpiGpioPins.transferWaterDown, {
  mode: gpio.INPUT
})

// Valve 8
exports.valve8 = new gpio(wateringSystem.rpiGpioPins.valve8, {
  mode: gpio.INPUT
})

// Valve 9
exports.valve9 = new gpio(wateringSystem.rpiGpioPins.valve9, {
  mode: gpio.INPUT
})
