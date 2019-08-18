// Requires: Files
const Server = require('../server');
const Controller = require('./Controller');
const Config = require('../Config');

// Routes
Server.api
    // Root
    .get('/', (req, res) => {
        if (Config.config.console.routes) console.log("GET: /");
        Controller.getAll(res, res);
    })
    // Simulation On
    .get('/simulation/on', (req, res) => {
        if (Config.config.console.routes) console.log("GET: /simulation/on");
        Controller.simulationOn(res, res);
    })
    /* // Simulation Off
    .get('/simulation/off', (req, res) => {
        if (Config.config.console.routes) console.log("GET: /simulation/off");
        Controller.simulationOff(res, res);
    }) */
    // Opens Valve
    .get('/valves/open/:id', (req, res) => {
        if (Config.config.console.routes) console.log("GET: /valves/open/" + req.params.id);
        Controller.valveOpen(req, res);
    })
    // Closes Valve
    .get('/valves/close/:id', (req, res) => {
        if (Config.config.console.routes) console.log("GET: /valves/close/" + req.params.id);
        Controller.valveClose(req, res);
    })
    // Opens Water
    .get('/water/open', (req, res) => {
        if (Config.config.console.routes) console.log("GET: /water/open");
        Controller.waterOpen(req, res);
    })
    // Closes Water
    .get('/water/close', (req, res) => {
        if (Config.config.console.routes) console.log("GET: /water/close");
        Controller.waterClose(req, res);
    })