
const REACT_APP_API_URL = "/api"


export const getCourses = (sortBy) => {
    return fetch(`${REACT_APP_API_URL}/courses?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        }).catch(err => console.log(err))
}



export const getAllCategories = () => {
    return fetch(`${REACT_APP_API_URL}/categories`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}


export const getFilteredCourses = (skip, limit, filters = {}) => {

    const data = {
        limit, skip, filters
    }

    return fetch(`${REACT_APP_API_URL}/courses/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => { return response.json() })
        .catch(err => { console.log(err) })
}


//get single course by id from backend
export const readSingleCourseFromApi = (courseId) => {
    return fetch(`${REACT_APP_API_URL}/course/${courseId}`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

// add course in the users enrolled courses array-->users My courses
export const enrollCourse = (userId, courseId, token) => {
    return fetch(`${REACT_APP_API_URL}/user/enroll-course/${courseId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

// get array of id's of enrolled courses of user
export const getEnrolledCourses = (userId, token) => {
    return fetch(`${REACT_APP_API_URL}/user/courses/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//get my courses
export const getMyCourses = (userId, token) => {
    return fetch(`${REACT_APP_API_URL}/user/my-courses/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}
