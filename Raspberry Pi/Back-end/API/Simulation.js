// Requires: Files
const Variables = require('./Variables');
const Functions = require('./Functions');

/* -- Logic -- */
function runLogic() {
    Functions.scream('info', 'Starting simulation...');

    // If pump = false
    if (!Variables.variables.pump) {
        // If valve 1 or 2 or 3 or 4 = true
        if (Variables.variables.valves["1"] || Variables.variables.valves["2"] || Variables.variables.valves["3"] || Variables.variables.valves["4"]) {
            // Change pump = true
            Functions.pumpOn();
        }

        // If rain = true
        if (Variables.variables.rain) {
            // If Valve fillTanks = true
            if (Variables.variables.valves.fillTanks) {
                // Change Valve fillTank = false
                Functions.valveClose("fillTank");
            }
        }
        // If rain = false
        else {
            
        }
    }
    // If pump = true
    else {
        // If rain = true
        if (Variables.variables.rain) {

        }
        // If rain = false
        else {

        }
    }

    // If Floaters are false, and rain is false
    if (!Variables.variables.floaters[1] && !Variables.variables.floaters[2] && !Variables.variables.floaters[3] && !Variables.variables.rain) {
        // Open Valve to fill tanks
        Functions.valveOpen("fillTanks");
    }
    // Set Tank states
    // Check if tanks need water
    // Yes: open valve to fill
}

// Exports
module.exports = {
    runLogic: runLogic
}