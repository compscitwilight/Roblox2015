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
router.post("/create", (req, res) => {
    const session = req.session
    if (!session.authenticated || !session.user.admin) {
        res.sendStatus(403)
        return
    }

    const body = req.body
    const newItem = {
        id: catalogdb.length + 1,
        name: body.name || "Unnamed",
        price: body.price || { robux: 0, tickets: 0 },
        onsale: body.onsale || false,
        description: body.description || "This item does not have a description.",
        creator: body.creator || "admin",
        created: new Date().toUTCString(),
        limited: body.limited || false,
        limitedU: body.limitedU || false
    }
    catalogdb.push(newItem)
    res.status(200).send(newItem)
})

module.exports = router