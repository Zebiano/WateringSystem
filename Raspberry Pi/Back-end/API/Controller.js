// Requires: Files
const Variables = require('./Variables');

// Get Root
exports.getRoot = (req, res) => {
    res.send(Variables.variables);
};