// Requires: Files
const Config = require('./Config');
const Functions = require('./API/Functions');

console.clear();
Functions.scream('info', 'Loading project...');

if (Config.config.simulation) {
    Functions.scream('warn', 'Running API on simulation mode!');
} else {
    require("./API/Pins") && Functions.scream('success', 'Successfully loaded Pins.js');
}
require("./API/Controller") && Functions.scream('success', 'Successfully loaded Controller.js');
require("./API/Routes") && Functions.scream('success', 'Successfully loaded Routes.js');