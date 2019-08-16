// Requires: Modules
const Chalk = require('chalk');

// Requires: Files
const Variables = require('./Variables');
const Config = require('../Config');
const Server = require('../server');

// Simulation On
function simulationOn() {
    Config.config.simulation = true;
    if (Config.config.console.simulation) scream('info', "Changed simulation to " + Chalk.yellow(Config.config.simulation) + ".");
}

// Simulation Off
function simulationOff() {
    //Config.config.simulation = false;
    //resetVariables();
    if (Config.config.console.simulation) scream('info', "Changed simulation to " + Chalk.yellow(Config.config.simulation) + ".");
}

// Opens valve
function valveOpen(valve) {
    Variables.variables.valves[valve] = true;
    if (Config.config.console.valves) scream('info', "Changed valve " + Chalk.yellow(valve) + " to " + Chalk.yellow(Variables.variables.valves[valve]) + ".");
}

// Closes valve
function valveClose(valve) {
    Variables.variables.valves[valve] = false;
    if (Config.config.console.valves) scream('info', "Changed valve " + Chalk.yellow(valve) + " to " + Chalk.yellow(Variables.variables.valves[valve]) + ".");
}

// Opens water
function waterOpen() {
    Variables.variables.water = true;
    if (Config.config.console.water) scream('info', "Changed water to " + Chalk.yellow(Variables.variables.water) + ".");
}

// Closes water
function waterClose() {
    Variables.variables.water = false;
    if (Config.config.console.water) scream('info', "Changed water to " + Chalk.yellow(Variables.variables.water) + ".");
}

// Writes to console
function scream(type, info) {
    switch (type) {
        case 'info':
            console.log(Config.chalkInfo('[INFO] ' + info));
            break;
        case 'success':
            console.log(Config.chalkSuccess('[SUCCESS] ' + info));
            break;
        case 'warn':
            console.log(Config.chalkWarn('[WARN] ' + info));
            break;
        case 'error':
            console.log(Config.chalkError('[ERROR] ' + info));
            break;
    }
}

// Send notification to the user
function sendNotification(info) {
    console.log(info);
}

// Reset Variables
function resetVariables() {
    for (i in Variables.variables.valves) {
        Variables.variables.valves[i] = false
    }
    for (i in Variables.variables.floaters) {
        Variables.variables.floaters[i] = false;
    }
    Variables.variables.rain = false;
    Variables.variables.water = false;
}

// Exports
module.exports = {
    simulationOn: simulationOn,
    simulationOff: simulationOff,
    valveOpen: valveOpen,
    valveClose: valveClose,
    waterOpen: waterOpen,
    waterClose: waterClose,
    scream: scream,
    sendNotification: sendNotification,
    resetVariables: resetVariables
}