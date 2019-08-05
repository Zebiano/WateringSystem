// Requires: Files
const Functions = require('./Functions');
const Variables = require('./Variables');
const Config = require('../Config');

/* -- Functions -- */
// GET: Root
exports.getAll = (req, res) => {
    res.send(Variables.variables);
};

// GET: Open Valve
exports.valveOpen = (req, res) => {
    Functions.valveOpen(req.params.id);
    res.send(Variables.variables);
};

// GET: Close Valve
exports.valveClose = (req, res) => {
    Functions.valveClose(req.params.id);
    res.send(Variables.variables);
};