// Requires: Modules
const Express = require("express");
const Cors = require('cors');

// Variables
const api = Express();
const port = 3000;
//const host = '0.0.0.0';

// Express Middleware
api.use(Cors());

// Exports
module.exports = {
    api: api
}

// Requires: Files
require("./API/Routes");

// Starts Server
api.listen(port, () => {
    console.log("API running on localhost:" + port + "!");
});