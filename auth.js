const users = require("./db/usersdb")

module.exports = {
    RegisterUser(data, res) {
        if (users.find(user => user.username == data.username)) {
            res.status(403).send("User already exists!")
            return
        }
        if (data.username.length > 20) {
            res.status(403).send("Username exceeds limit of 20 characters")
            return
        }
        if (data.username.includes(" ")) {
            res.status(403).send("Username includes a space, which is not allowed")
            return
        }
        if (data.username.startsWith(data.username.match(/[0-9]/g))) {
            res.status(403).send("Username cannot start with a number")
            return
        }
        users.push({
            id: users.length + 1,
            username: data.username,
            password: data.password,
            status: "",
            robux: 0,
            tickets: 10,
            avatarCdn: "https://tr.rbxcdn.com/c4265017c98559993061733b1125a23c/150/150/AvatarHeadshot/Png",
            moderation: {
                moderated: false,
                note: "",
                length: "",
                reviewed: ""
            }
        })

        return users.find(user => user.username == data.username)
    }
}