// Requires: Files
const Functions = require('./Functions');
const Variables = require('./Variables');
const Config = require('../Config');
const Simulation = require('./Simulation');

/* -- Functions -- */
// GET: Root
exports.getAll = (req, res) => {
    if (Config.config.simulation) Simulation.runLogic();
    res.send(Variables.variables);
};

// GET: Simulation On
exports.simulationOn = (req, res) => {
    Functions.simulationOn();
    if (Config.config.simulation) Simulation.runLogic();
    res.send(Variables.variables);
};

// GET: Simulation Off
exports.simulationOff = (req, res) => {
    Functions.simulationOff();
    res.send(Variables.variables);
};

// GET: Open Valve
exports.valveOpen = (req, res) => {
    Functions.valveOpen(req.params.id);
    if (Config.config.simulation) Simulation.runLogic();
    res.send(Variables.variables);
};

// GET: Close Valve
exports.valveClose = (req, res) => {
    Functions.valveClose(req.params.id);
    if (Config.config.simulation) Simulation.runLogic();
    res.send(Variables.variables);
};

// GET: Open Water
exports.waterOpen = (req, res) => {
    Functions.waterOpen();
    if (Config.config.simulation) Simulation.runLogic();
    res.send(Variables.variables);
};

// GET: Close Water
exports.waterClose = (req, res) => {
    Functions.waterClose();
    if (Config.config.simulation) Simulation.runLogic();
    res.send(Variables.variables);
};