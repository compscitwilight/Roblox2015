const statusForm = document.querySelector("#status-form")
const profileStatus = document.querySelector("#profile-status")

if (statusForm && profileStatus) {
    let editing = false
    const ToggleStatusEdit = () => {
        if (!editing) {
            const editingInput = document.createElement("input")
            editingInput.value = profileStatus.innerHTML
            editingInput.classList.add("profile-status")
            editingInput.style.cursor = "pointer"
            editingInput.required = true
            editingInput.name = "status"

            profileStatus.replaceWith(editingInput)
            editing = true
        }
    }

    profileStatus.addEventListener("click", (event) => ToggleStatusEdit())
    statusForm.addEventListener("submit", (event) => location.reload())
}