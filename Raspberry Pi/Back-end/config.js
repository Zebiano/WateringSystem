// Config
exports.config = {
    simulation: true,
    console: {
        routes: true,
        valves: true
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

// Requires: Modules
const Chalk = require('chalk');

// Chalk color setings
exports.chalkInfo = Chalk.blue;
exports.chalkSuccess = Chalk.green;
exports.chalkWarn = Chalk.yellow;
exports.chalkError = Chalk.red;