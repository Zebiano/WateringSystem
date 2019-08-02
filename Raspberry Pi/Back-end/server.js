// Requires: Modules
const Express = require("express");

// Variables
const api = Express();
const port = 3000;

// Starts Server
api.listen(port, () => {
    console.log("API running on localhost:" + port + "!");
});

// Exports
module.exports = {
    api: api
}

// Requires: Files
require("./API/Routes");