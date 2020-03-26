import apiManager from "./apiManager"

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
            apiManager.get('employees')
            .then(employees => {
                let employee_id = null
                employees.forEach(employee => {
                    if(employee.user.id === res.id) {
                        employee_id = employee.id
                    }
                })
                sessionStorage.setItem("user", JSON.stringify({id: res.id, employee_id: employee_id, first_name: res.first_name, last_name: res.last_name}))
            })
        })
}

const register = (userInfo) => {
    return fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(userInfo),
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
    sessionStorage.removeItem("user")
}

export { isAuthenticated, login, register, logout }