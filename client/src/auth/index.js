const REACT_APP_API_URL = "/api"

export const signup = (user) => {
    //console.log(name, email, password)
    //fetch is avilable with browser by default
    //used to call api's
    //here we are calling the api for signup to send the data to the database
    return fetch(`${REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

export const signin = (user) => {
    //console.log(name, email, password)
    //fetch is avilable with browser by default
    //used to call api's
    //here we are calling the api for signin to send the data to the database
    return fetch(`${REACT_APP_API_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const signout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next()
        return fetch(`${REACT_APP_API_URL}/signout`, {
            method: "GET"
        })
            .then(response => { console.log("signout ", response) })
            .catch(err => console.log(err))
    }
}

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else {
        return false
    }
}