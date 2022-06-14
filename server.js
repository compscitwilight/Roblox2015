const express = require("express")
const session = require("express-session")
const fs = require("fs")
const app = express()
const port = 3000

const users = require("./usersdb")

//app.set("trust proxy", 1)
app.set("view engine", "ejs")

app.use(session({
    secret: "ashjga0uig04uj0iagjusopgu-3oi4jgpaw",
    saveUninitialized: true,
    cookie: { secure: false },
    resave: false
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// routes
app.use("/public", require("./public.js"))
app.use("/users", require("./users.js"))

app.listen(port, () => {
    console.log("Server is online on port " + port)
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
    res.render("home.ejs", { session: req.session })
})

app.all("/:page", (req, res) => {
    const page = req.params.page
    const path = "/views/" + page + ".html"
    if (!fs.existsSync(path)) {
        res.sendStatus(404)
        return
    }
    res.sendFile(path, { root: __dirname })
})