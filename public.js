const express = require("express")
const fs = require("fs")
const router = express.Router()

router.get("/images/:image", (req, res) => {
    const image = req.params.image
    const path = "./public/images/" + image
    if (!fs.existsSync(path)) {
        res.sendStatus(404)
        return
    }
    res.sendFile(path, { root: __dirname })
})

router.get("/styles/:stylesheet", (req, res) => {
    const stylesheet = req.params.stylesheet
    const path = "./public/styles/" + stylesheet
    if (!fs.existsSync(path)) {
        res.sendStatus(404)
        return
    }
    res.sendFile(path, { root: __dirname })
})

router.get("/components/:component", (req, res) => {
    const component = req.params.component
    const path = "./public/components/" + component
    if (!fs.existsSync(path)) {
        res.sendStatus(404)
        return
    }
    res.sendFile(path, { root: __dirname })
})

router.get("/scripts/:script", (req, res) => {
    const script = req.params.script
    const path = "./public/scripts/" + script
    if (!fs.existsSync(path)) {
        res.sendStatus(404)
        return
    }
    res.sendFile(path, { root: __dirname })
})

module.exports = router