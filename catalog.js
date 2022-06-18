const express = require("express")
const router = express.Router()

const catalogdb = require("./db/catalogdb.js")

// get requests
router.get("/:itemId", (req, res) => {
    const itemId = req.params.itemId
    const item = catalogdb.find(item => item.id == itemId)
    if (!item) {
        res.status(404).redirect("/catalog")
        return
    }
    res.render("catalog.ejs", { session: req.session, item: item })
})

// post requests

module.exports = router