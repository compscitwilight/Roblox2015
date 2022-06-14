const express = require("express")
const ejs = require("ejs")
const router = express.Router()

const users = require("./usersdb")

router.get("/:userId", (req, res) => {
    const userId = req.params.userId
    const user = users.find(u => u.id == userId)
    if (!user) {
        res.sendStatus(404)
        return
    }
    res.json(user)
})

router.get("/:userId/profile", (req, res) => {
    const userId = req.params.userId
    const user = users.find(u => u.id == userId)
    res.render("profile.ejs", { session: req.session, user: user })
})

router.post("/authenticate", (req, res) => {
    const { username, password } = req.body
    if (req.session.authenticated) return
    if (!username || !password) {
        res.status(403)
        return
    }
    if (users.find(user => user.username == username && user.password == password)) {
        const user = users.find(user => user.username == username)
        const locals = res.locals
        const session = req.session
        locals.user = user

        session.authenticated = true
        session.user = locals.user
        req.session.save((err) => {
            if (err) {
                res.status(500).send(err)
                return
            }
            console.log("Session saved!")
        })
        res.redirect("/home")
        return
    }
})

module.exports = router