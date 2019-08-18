// Requires: Modules
const Chalk = require('chalk');

// Config
let config = {
    simulation: true,
    console: {
        routes: true,
        valves: true,
        water: true,
        rain: true,
        simulation: true
    },
    rpiGpioPins: {
        valve1: 2,
        valve2: 3,
        valve3: 4,
        valve4: 17,
        valveFillTanks: 27,
        floater1: 14,
        floater2: 15,
        floater3: 18,
        pump: 23
    }
}

// Chalk color setings
const chalkInfo = Chalk.blue;
const chalkSuccess = Chalk.green;
const chalkWarn = Chalk.yellow;
const chalkError = Chalk.red;

// Enables simultion
function enableSimulation() {
    console.log("puta");
    config.simulation = true;
    console.log(config.simulation);
}

// Disables simultion
function disableSimulation() {
    config.simulation = false;
}

// Exports
module.exports = {
    config: config,
    chalkInfo: chalkInfo,
    chalkSuccess: chalkSuccess,
    chalkWarn: chalkWarn,
    chalkError: chalkError,
    enableSimulation: enableSimulation,
    disableSimulation: disableSimulation
}