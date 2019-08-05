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