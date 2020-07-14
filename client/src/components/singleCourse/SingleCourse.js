import React, { useState, useEffect, Fragment } from 'react'
import { readSingleCourseFromApi, getEnrolledCourses, enrollCourse } from '../../apis/apiCourses'
import { faqs } from './Faq'
import Menu from '../Menu'
import { isAuthenticated } from '../../auth'
import { Link } from 'react-router-dom'
import Footer from '../Footer'

const SingleCourse = (props) => {

    const [course, setCourse] = useState({})
    const [error, setError] = useState(false)
    // const [realtedProducts, setRelatedProducts] = useState([])
    const [enrolledCourses, setEnrolledCourses] = useState([])



    const loadSingleCourseById = (courseId) => {
        readSingleCourseFromApi(courseId).then(data => {
            if (data.error) {
                setError(data.error)
                console.log(error)
            }
            else {
                setCourse(data)

                // //if the rpoduct is got then find related products
                // listRealted(data._id).then(result => {
                //     if (result.error) {
                //         setError(result.error)
                //     }
                //     else {
                //         setRelatedProducts(result)
                //     }
                // })
            }
        })
    }

    const ApplyForTheCourse = () => {
        const { user: { _id }, token } = isAuthenticated()
        enrollCourse(_id, course._id, token).then(result => {
            if (result.error) {
                setError(result.error)
            }
            else {
                console.log(result)
            }
        })
    }

    useEffect(() => {
        //get the id from the url 
        const courseId = props.match.params.courseId
        loadSingleCourseById(courseId)
        if (isAuthenticated()) {
            const { user: { _id }, token } = isAuthenticated()
            getEnrolledCourses(_id, token).then(result => {
                if (result.error) {
                    setError(result.error)
                    console.log(error)
                }
                else {
                    setEnrolledCourses(result)
                }
            })
        }
    }, [props])


    return (
        <Fragment>
            <Menu />
            <div className="jumbotron">
                <nav className="navbar navbar-expand-lg container mb-3 course-nav">
                    <div className="collapse navbar-collapse" >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="#description">Description</a>
                            </li>
                            <li className="nav-item">
                                <a href="#curriculum">Curriculum</a>
                            </li>
                            <li className="nav-item">
                                <a href="#instructor">Instructors</a>
                            </li>
                            <li className="nav-item">
                                <a href="#faq">FAQ</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="container course">
                    <h1 className="p-5" style={{
                        color: "rgb(253, 53, 130)"
                        , textShadow: "1px 1px 3px rgb(251, 255, 15)"
                    }}>{course.name}</h1>
                    <h5 className="p-3">{course.description && course.description.substring(0, 200)}...!</h5>
                    <br />
                    <h5 style={{ color: "rgb(253, 53, 130)" }}>
                        <i className="fas fa-user-edit"></i>  Created By :</h5>
                    {course.instructors && course.instructors.map((instructor, i) => (
                        <h5 key={i} >{instructor.name}</h5>
                    ))}

                    <br></br>

                    <h5 style={{ color: "rgb(253, 53, 130)" }}>
                        <i className="fas fa-clock"></i> Course Duration
         :</h5><h5 > {course.duration} (Life time content access)</h5>

                    <br />

                    <h1 style={{ color: "rgb(253, 53, 130)" }}>
                        <i className="fas fa-rupee-sign"></i> {course.price}</h1>

                    <br />

                    <h5 >{course.enrolled} Enrollments</h5>

                    <br />

                    {
                        !isAuthenticated() &&
                        <Link to="/login"><button className="btn apply-btn"
                        >Apply Now</button></Link>
                    }

                    {
                        (isAuthenticated() && enrolledCourses.includes(course._id)) &&
                        <Link to="/user/dashboard"><button className="btn apply-btn">Resume course</button></Link>

                    }

                    {
                        (isAuthenticated() && !enrolledCourses.includes(course._id)) &&
                        <Link to="/explore-courses" onClick={() => ApplyForTheCourse()}>
                            <button className="btn apply-btn">Apply Now</button></Link>
                    }

                </div>

                <div className="container includes">
                    <h1 className="m-5" style={{ color: "rgb(253, 53, 130)", textDecoration: "underline" }}>Includes</h1>
                    <div className="text-left m-5">
                        <h5><i className="fas fa-check-double" style={{ color: "rgb(253, 53, 130)" }}></i> Lifetime access to the content provided in the course</h5>
                        <h5><i className="fas fa-check-double" style={{ color: "rgb(253, 53, 130)" }}></i> Access to experts 24X7 to answer your queries</h5>
                        <h5><i className="fas fa-check-double" style={{ color: "rgb(253, 53, 130)" }}></i> Certificate of Completion</h5>
                        <h5><i className="fas fa-check-double" style={{ color: "rgb(253, 53, 130)" }}></i> Assured Internship!</h5>
                    </div>
                </div>

                <div className="container includes" id="description">
                    <h1 className="m-5" style={{ color: "rgb(253, 53, 130)", textDecoration: "underline" }} >Description</h1>
                    <h5 className="m-5">{course.description && course.description}</h5>
                </div>

                <div className="container includes" id="curriculum">
                    <h1 className="m-5" style={{ color: "rgb(253, 53, 130)", textDecoration: "underline" }} >Curriculum</h1>
                    {
                        course.curriculum && course.curriculum.map((c, i) => (
                            <div key={i} className="card m-3">
                                <div className="card-header"><h4>{c.topic}</h4></div>
                                <ul className="list-group list-group-flush">
                                    {
                                        c.subtopics && c.subtopics.map((s, index) => (
                                            <li className="list-group-item" key={index}><h5 className="text-secondary">{s}</h5></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>

                <div className="container includes" id="instructor">
                    <h1 className="m-5" style={{ color: "rgb(253, 53, 130)", textDecoration: "underline" }} > About Instructors</h1>
                    {
                        course.instructors && course.instructors.map((instructor, i) => (
                            <div key={i} className="text-left m-4">
                                <h3 style={{ color: "rgb(253, 53, 130)" }}><i className="fas fa-user-circle"></i>
                                    {instructor.name}</h3>
                                <h4>{instructor.qualification}</h4>
                                <h5 className="m-2">{instructor.about}</h5>
                            </div>
                        ))
                    }
                </div>

                <div className="container includes" id="faq">
                    <h1 className="m-5" style={{ color: "rgb(253, 53, 130)", textDecoration: "underline" }} > FAQ</h1>
                    <div className="text-left">
                        {
                            faqs.map((f, i) => (
                                <div key={i}>
                                    <h5>{f.ques}</h5>
                                    <p>{f.ans}</p>
                                    <hr></hr>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "150px" }}>
                <Footer />
            </div>
        </Fragment>
    )

}

export default SingleCourse