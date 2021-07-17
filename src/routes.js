// Require: Packages
const router = require('express').Router()

// Root
router.get('/', (req, res) => {
    res.sendFile(`${__dirname}/frontend/html/main.html`)
})

// Config (manually set states)
router.get('/config', (req, res) => {
    res.sendFile(`${__dirname}/frontend/html/config.html`)
})

// Exports
module.exports = router
