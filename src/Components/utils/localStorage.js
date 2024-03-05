const isLoggedIn = () => {
    const result = localStorage.getItem("isLoggedIn")
    if (result === "true") return true
    if (result === "false") return false
}

const isAdmin = () => {
    const result = localStorage.getItem("isAdmin")
    if (result === "true") return true
    if (result === "false") return false
}

module.exports = { isLoggedIn, isAdmin }