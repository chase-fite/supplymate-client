const isAuthenticated = () => {
    return sessionStorage.getItem("supplymate_token") !== null
}

const login = (credentials) => {
    return fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
        .then(res => {
            if ("valid" in res && res.valid && "token" in res) {
                sessionStorage.setItem("supplymate_token", res.token)
            }
        })
}

const register = (userInfo) => {
    return fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
        .then(res => res.json())
        .then(res => {
            if ("token" in res) {
                sessionStorage.setItem("supplymate_token", res.token)
            }
        })
}

const logout = () => {
    sessionStorage.removeItem("supplymate_token")
}

export { isAuthenticated, login, register, logout }