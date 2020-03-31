import apiManager from "./apiManager"
import { updateAVState } from '../ApplicationViews'

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
                sessionStorage.setItem("user", JSON.stringify({ id: res.id, employee_id: res.employee_id, role: res.role, first_name: res.first_name, last_name: res.last_name }))
                // apiManager.get('employees')
                //     .then(employees => {
                //         let employee_id = null
                //         let role = null
                //         employees.forEach(employee => {
                //             if (employee.user.id === res.id) {
                //                 employee_id = employee.id
                //                 role = employee.role.name
                //             }
                //         })
                //         sessionStorage.setItem("user", JSON.stringify({ id: res.id, employee_id: employee_id, role: role, first_name: res.first_name, last_name: res.last_name }))
                //     })
            } else {
                window.alert('Please make sure you entered a valid username and password')
            }
            // apiManager.get('employees')
            // .then(employees => {
            //     let employee_id = null
            //     let role = null
            //     employees.forEach(employee => {
            //         if(employee.user.id === res.id) {
            //             employee_id = employee.id
            //             role = employee.role.name
            //         }
            //     })
            //     sessionStorage.setItem("user", JSON.stringify({id: res.id, employee_id: employee_id, role: role, first_name: res.first_name, last_name: res.last_name}))
            // })
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