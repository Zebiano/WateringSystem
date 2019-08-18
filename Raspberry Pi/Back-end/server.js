// Requires: Modules
const Express = require("express");
const Cors = require('cors');
const Chalk = require('chalk');

// Requires: Files
const Config = require('./Config');
const Simulation = require('./API/Simulation');
const Functions = require('./API/Functions');
const Loader = require('./loader');

// Variables
const api = Express();
const port = 3000;

// Express Middleware
api.use(Cors());

// Exports
module.exports = {
    api: api
}

// Loads necessary files before starting server
Loader.loadProject();

// Starts Server
const server = api.listen(port, () => {
    Functions.scream('success', "API running on " + Chalk.red('localhost') + ":" + Chalk.red(port) + "!");
    if (Config.config.simulation) {
        Functions.scream('info', 'Starting simulation...');
        Simulation.runLogic();
    }
});