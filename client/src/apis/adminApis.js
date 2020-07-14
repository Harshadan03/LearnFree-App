
const REACT_APP_API_URL = "/api"

export const createCourse = (userId, token, course) => {
    return fetch(`${REACT_APP_API_URL}/course/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: course // form data bcz content type is form
    }).then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

export const addCourseDetails = (courseId, userId, token, details) => {
    return fetch(`${REACT_APP_API_URL}/course/addInfo/${courseId}/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(details)
    }).then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

export const getSingleCourseJustAdded = (sortBy) => {
    return fetch(`${REACT_APP_API_URL}/courses?order=desc&sortBy=${sortBy}&limit=1`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const createCategory = (category, userId, token) => {
    console.log(category)
    return fetch(`${REACT_APP_API_URL}/category/create/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(response => { return response.json() })
        .catch(err => { console.log(err) })
}