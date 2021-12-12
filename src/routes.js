// Require: Packages
const router = require('express').Router()

// Root
router.get('/', (req, res) => {
    res.sendFile(`${__dirname}/frontend/html/main.html`)
})

// Config (manually set states)
router.get('/test', (req, res) => {
    res.sendFile(`${__dirname}/frontend/html/test.html`)
})

// Config (manually set states)
router.get('/old', (req, res) => {
    res.sendFile(`${__dirname}/frontend/html/old.html`)
})

// Exports
module.exports = router
