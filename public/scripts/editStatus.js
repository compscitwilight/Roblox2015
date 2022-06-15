const profileStatus = document.querySelector("#profile-status")

let editing = false
const ToggleStatusEdit = () => {
    if (!editing) {
        const editingInput = document.createElement("input")
        editingInput.value = profileStatus.value
        editingInput.classList.add("profile-status")
        editingInput.style.cursor = "pointer"

        profileStatus.replaceWith(editingInput)
        editing = true
    }
}

profileStatus.addEventListener("click", (event) => ToggleStatusEdit())