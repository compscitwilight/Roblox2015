module.exports = [
    {},
    {
        id: 1,
        username: "admin",
        password: "admin",
        status: "testing the statuses?",
        robux: 100,
        tickets: 2000,
        avatarCdn: "https://tr.rbxcdn.com/c4265017c98559993061733b1125a23c/150/150/AvatarHeadshot/Png",
        admin: true,
        moderation: {
            moderated: false,
            note: "",
            modLength: "",
            reviewed: "",
            type: ""
        }
    },
    {
        id: 2,
        username: "MALICIOUS",
        password: "admin",
        status: "This account is for testing moderation features.",
        robux: 0,
        tickets: 0,
        avatarCdn: "",
        admin: false,
        moderation: {
            moderated: true,
            note: "test",
            modLength: "forever",
            reviewed: "6/17/2022 5:01AM PST",
            type: "ban"
        }
    }
]