const topbarSettingsBtn = document.querySelector("#topbar-settings")
const moreMenu = document.querySelector("#topbar-more-menu")

let moreMenuVisible = false

topbarSettingsBtn.addEventListener("click", (event) => {
    if (!moreMenuVisible) {
        moreMenu.style.display = "block"
        moreMenuVisible = true
        return
    }
    moreMenu.style.display = "none"
    moreMenuVisible = false
})