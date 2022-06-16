const express = require("express")
const ejs = require("ejs")
const router = express.Router()

const users = require("./usersdb")

// get requests
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
    if (!user) {
        res.status(404).redirect("/")
        return
    }
    res.render("profile.ejs", { session: req.session, user: user })
})

// post requests
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

router.post("/register", (req, res) => {
    const body = req.body
    if (req.session.authenticated) return
    if (users.find(user => user.username == body.username)) {
        res.status(403).send("User already exists!")
        return
    }
    if (body.username.length > 20) {
        res.status(403).send("Username exceeds limit of 20 characters")
        return
    }
    if (body.username.includes(" ")) {
        res.status(403).send("Username includes a space, which is not allowed")
        return
    }
    if (body.username.startsWith(body.username.match(/[0-9]/g))) {
        res.status(403).send("Username cannot start with a number")
        return
    }
    users.push({
        id: users.length + 1,
        username: body.username,
        password: body.password,
        status: "",
        robux: 0,
        tickets: 10,
        avatarCdn: "https://tr.rbxcdn.com/c4265017c98559993061733b1125a23c/150/150/AvatarHeadshot/Png"
    })

    // authenticating the user
    const newUser = users.find(user => user.username == body.username)
    req.session.authenticated = true
    req.session.user = newUser
    req.session.save((err) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        console.log("Session saved!")
    })

    res.redirect("/home")
})

router.post("/:userId/status", (req, res) => {
    const userId = req.params.userId
    const status = req.body.status
    if (!status) {
        res.sendStatus(403)
        return
    }
    if (!req.session.authenticated) {
        res.sendStatus(403)
        return
    }
    if (req.session.user.id != userId) {
        res.sendStatus(403)
        return
    }

    const user = users.find(user => user.id == userId)
    if (!user) {
        res.sendStatus(404)
        return
    }
    user.status = status
})

module.exports = router