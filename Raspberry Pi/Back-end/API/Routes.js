// Requires: Files
const Server = require('../server');
const Controller = require('./Controller');
const Config = require('../config');

// Routes
Server.api
    .get('/', (req, res) => {
        if (Config.config.console.routes) console.log("GET: /");
        Controller.get(res, res);
    })
    /*.get('/hehe', (req, res) => {
        if (Config.config.console.routes) console.log("GET: /hehe");
        Controller.get(res, res);
    })*/