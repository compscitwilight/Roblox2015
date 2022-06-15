const profileStatus = document.querySelector("#profile-status")

let editing = false

profileStatus.addEventListener("click", (event) => {
    if (!editing) {
        editing = true
        profileStatus.className = "input"
        return
    }
})