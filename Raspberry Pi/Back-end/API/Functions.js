// Requires: Modules
const Chalk = require('chalk');

// Requires: Files
const Variables = require('./Variables');
const Config = require('../Config');

// Opens valve
function valveOpen(valve) {
    if (Config.config.console.valves) scream('info', "Valve " + valve + ": " + Chalk.yellow(Variables.variables.valves[valve]));
    Variables.variables.valves[valve] = true;
    if (Config.config.console.valves) scream('info', "Valve " + valve + ": " + Chalk.yellow(Variables.variables.valves[valve]));
}

// Closes valve
function valveClose(valve) {
    if (Config.config.console.valves) scream('info', "Valve " + valve + ": " + Chalk.yellow(Variables.variables.valves[valve]));
    Variables.variables.valves[valve] = false;
    if (Config.config.console.valves) scream('info', "Valve " + valve + ": " + Chalk.yellow(Variables.variables.valves[valve]));
}

// Turn pump on
function pumpOn() {
    if (Config.config.console.valves) scream('info', "Pump: " + Chalk.yellow(Variables.variables.pump));
    Variables.variables.pump = true;
    if (Config.config.console.valves) scream('info', "Pump: " + Chalk.yellow(Variables.variables.pump));
}

// Turn pump off
function pumpOff() {
    if (Config.config.console.valves) scream('info', "Pump: " + Variables.variables.pump);
    Variables.variables.pump = false;
    if (Config.config.console.valves) scream('info', "Pump: " + Variables.variables.pump);
}

// Writes to the console.log
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

// Exports
module.exports = {
    valveOpen: valveOpen,
    valveClose: valveClose,
    pumpOn: pumpOn,
    pumpOff: pumpOff,
    scream: scream,
    sendNotification: sendNotification
}