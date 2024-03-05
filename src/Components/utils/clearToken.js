function clearToken() {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
    }
}

module.exports = { clearToken }