const express = require("express")
const session = require("express-session")
const fs = require("fs")
const serverConfig = require("./config/server.json")
const app = express()

const users = require("./usersdb")

//app.set("trust proxy", 1)
app.set("view engine", "ejs")

app.use(session({
    secret: serverConfig.Secret,
    saveUninitialized: true,
    cookie: { secure: false },
    resave: false
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// routes
app.use("/public", require("./public.js"))
app.use("/users", require("./users.js"))

app.listen(serverConfig.PORT, () => {
    console.log(serverConfig.StartMsg)
})

app.all("/", (req, res) => {
    if (!req.session.authenticated) {
        res.render("index.ejs")
        console.log(req.session)
        return
    }
    res.redirect("/home")
})

app.all("/home", (req, res) => {
    if (!req.session.authenticated) {
        res.redirect("/")
        return
    }
    if (req.session.user.moderation.moderated) {
        res.redirect("/notauthorized")
        return
    }
    res.render("home.ejs", { session: req.session })
})

app.all("/notauthorized", (req, res) => {
    if (!req.session.authenticated) {
        res.sendStatus(403)
        res.redirect("/")
        return
    }
    if (!req.session.user.moderation.moderated) {
        res.sendStatus(403)
        res.redirect("/home")
        return
    }
    res.render("notauthorized.ejs", { moderation: req.session.user.moderation })
})

app.all("/:page", (req, res) => {
    if (req.session.user.moderation.moderated) {
        res.redirect("/notauthorized")
        return
    }
    const page = req.params.page
    const path = page + ".ejs"
    if (!fs.existsSync("./views/" + path)) {
        res.sendStatus(404)
        return
    }
    if (!req.session.authenticated) {
        res.render(path)
        return
    }
    res.render(path, { session: req.session })
})