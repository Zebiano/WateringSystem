// Requires: Files
const Variables = require('./Variables');
const Functions = require('./Functions');

/* -- Logic -- */
function runLogic() {
    // If water == true
    if (Variables.variables.water) {
        Functions.scream('warn', 'Water on!');

        // If valve fillTanks == false
        if (!Variables.variables.valves.fillTanks) {
            // Open valve fillTanks
            Functions.valveOpen("fillTanks");
        }
    }
    // If water == false
    else {
        Functions.scream('warn', 'Water off!');

        // If valve fillTanks == true
        if (Variables.variables.valves.fillTanks) {
            // Close valve fillTanks
            Functions.valveClose("fillTanks");
        }
    }

    // If all floaters == false AND (water == true OR valve fillTanks == true || rain == true)
    if (!Variables.variables.floaters[1] && !Variables.variables.floaters[2] && !Variables.variables.floaters[3] && !Variables.variables.floaters[4] && (Variables.variables.water || Variables.variables.valves.fillTanks || Variables.variables.rain)) {
        Functions.scream('warn', 'Tank 1 and 2 with enough water.');

        // Change floater 1 == true
        Variables.variables.floaters[1] = true;

        // If valve fillTanks == true AND water == false
        if (Variables.variables.valves.fillTanks && !Variables.variables.water) {
            // Change valve fillTanks == false
            Functions.valveClose('fillTanks');
        }
    }
    // If floater 1 == true AND all other floaters == false AND water == true
    else if (Variables.variables.floaters[1] && !Variables.variables.floaters[2] && !Variables.variables.floaters[3] && !Variables.variables.floaters[4] && Variables.variables.water) {
        Functions.scream('warn', 'Tank 1 and 2 are full.');

        // Change floater 2 == true
        Variables.variables.floaters[2] = true;
    }
    // If floater 1 and 2 == true AND all other floaters == false
    else if (Variables.variables.floaters[1] && Variables.variables.floaters[2] && !Variables.variables.floaters[3] && !Variables.variables.floaters[4]) {
        Functions.scream('warn', 'Pumping water from Tank 1 and 2 to Tank 3.');

        // Change floater 3 == true
        Variables.variables.floaters[3] = true;
    }
    // If floater 1 and 2 and 3 == true AND floater 4 == false
    else if (Variables.variables.floaters[1] && Variables.variables.floaters[2] && Variables.variables.floaters[3] && !Variables.variables.floaters[4]) {
        Functions.scream('warn', 'All tanks full!');

        // Change floater 4 == true
        Variables.variables.floaters[4] = true;
    }
    // If all floaters == true
    else if (Variables.variables.floaters[1] && Variables.variables.floaters[2] && Variables.variables.floaters[3] && Variables.variables.floaters[4]) {
        // If water == true
        if (Variables.variables.water) {
            // Change water == false
            Functions.waterClose();
        }
        // If valve fillTanks == true
        if (Variables.variables.valves.fillTanks) {
            // Change valve fillTanks == false
            Functions.valveClose('fillTanks');
        }
    }

    // If all floaters == false AND Rain == false
    if (!Variables.variables.floaters[1] && !Variables.variables.floaters[2] && !Variables.variables.floaters[3] && !Variables.variables.floaters[4] && !Variables.variables.rain) {
        Functions.scream('warn', 'All tanks are empty!');

        // If valve fillTanks == false
        if (!Variables.variables.valves.fillTanks) {
            // Open valve fillTanks
            Functions.valveOpen("fillTanks");
        }

        /* // If rain == true
        if (Variables.variables.rain) {
            // If water == true
            if (Variables.variables.water) {
                // If valve fillTanks == false
                if (!Variables.variables.valves.fillTanks) {
                    // Open valve fillTanks
                    Functions.valveOpen("fillTanks");
                }
            }
            // If water == false
            else {
                // If valve fillTanks == true
                if (Variables.variables.valves.fillTanks) {
                    // Close valve fillTanks
                    Functions.valveClose("fillTanks");
                }
            }
        }
        // If rain == false
        else {
            // If valve fillTanks == false
            if (!Variables.variables.valves.fillTanks) {
                // Open valve fillTanks
                Functions.valveOpen("fillTanks");
            }
        } */
    }
    // If floater 1 and 2 == false AND either floater 3 or 4 == true
    else if (!Variables.variables.floaters[1] && !Variables.variables.floaters[2] && (Variables.variables.floaters[3] || Variables.variables.floaters[4])) {
        Functions.scream('warn', 'Tank 1 and 2 are empty and Tank 3 has water!');

        // If valve fillTanks == true and water == false
        if (Variables.variables.valves.fillTanks && !Variables.variables.water) {
            // Close valve fillTanks
            Functions.valveClose("fillTanks");
        }

        // Open valve transferWater
        Functions.valveOpen('transferWater');

        /* // If rain == true
        if (Variables.variables.rain) {
            // If water == true
            if (Variables.variables.water) {
                // If valve fillTanks == false
                if (!Variables.variables.valves.fillTanks) {
                    // Open valve fillTanks
                    Functions.valveOpen("fillTanks");
                }
            }
            // If water == false
            else {
                // If valve fillTanks == true
                if (Variables.variables.valves.fillTanks) {
                    // Close valve fillTanks
                    Functions.valveClose("fillTanks");
                }
            }
        }
        // If rain == false
        else {
            // If valve transferWater == false
            if (!Variables.variables.valves.transferWater) {
                // Open valve transferWater
                Functions.valveOpen();
            }
        } */
    }
    // If 
    else if (!Variables.variables.floaters[1] && !Variables.variables.floaters[2] && !Variables.variables.floaters[3] && !Variables.variables.floaters[4]) {

    }

    // Set Tank states
    // Check if tanks need water
    // Yes: open valve to fill

    //console.log(Variables.variables);
}

// Exports
module.exports = {
    runLogic: runLogic
}