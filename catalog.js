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
    res.render("catalogitem.ejs", { session: req.session, item: item })
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
        price: { robux: body.robux, tickets: body.tickets } || { robux: 0, tickets: 0 },
        onsale: body.onsale || false,
        description: body.description || "This item does not have a description.",
        creator: body.creator || "admin",
        category: body.category || "Hat",
        created: new Date().toUTCString(),
        limited: body.limited || false,
        limitedU: body.limitedU || false
    }
    catalogdb.push(newItem)
    res.status(200).redirect("/catalog/" + newItem.id)
})

router.post("/purchase", (req, res) => {
    const body = req.body
    const session = req.session
    if (!session.authenticated) {
        res.status(403)
        return
    }
    if (!body.item) {
        res.status(500)
        return
    }
    const user = session.user
    const item = catalogdb.find(item => item.name == body.item)
    if (!item) {
        res.status(404)
        return
    }
    if (item.price.robux && user.robux > item.price.robux) {
        user.robux -= item.price.robux
        res.status(200)
        return
    }
    if (item.price.tickets && user.tickets > item.price.tickets) {
        user.tickets -= item.price.tickets
        res.status(200)
        return
    }
    res.status(500)
})

module.exports = router