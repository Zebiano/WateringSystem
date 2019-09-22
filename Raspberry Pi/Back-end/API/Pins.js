// Requires: Modules
const Onoff = require('onoff');

// Requires: Files
const Config = require('../Config');

// Variables
const gpio = Onoff.Gpio;

// Set Pins
exports.valve1 = new gpio(Config.config.rpiGpioPins.valve1, 'out');
exports.valve2 = new gpio(Config.config.rpiGpioPins.valve2, 'out');
exports.valve3 = new gpio(Config.config.rpiGpioPins.valve3, 'out');
exports.valve4 = new gpio(Config.config.rpiGpioPins.valve4, 'out');
exports.valveFillTanks = new gpio(Config.config.rpiGpioPins.valveFillTanks, 'out');
exports.floater1 = new gpio(Config.config.rpiGpioPins.floater1, 'in');
exports.floater2 = new gpio(Config.config.rpiGpioPins.floater2, 'in');
exports.floater3 = new gpio(Config.config.rpiGpioPins.floater3, 'in');
exports.pump = new gpio(Config.config.rpiGpioPins.pump, 'out');