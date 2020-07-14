import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../img/logo123.png'
import { isAuthenticated, signout } from '../../auth'
import { withRouter } from 'react-router-dom'
import { getMyCourses } from '../../apis/apiCourses'

const Dashboard = ({ history }) => {

    const [enrolledCourses, setEnrolledCourses] = useState([])


    const { user: { _id, name }, token } = isAuthenticated()

    useEffect(() => {
        getMyCourses(_id, token).then(result => {
            if (result.error) {
                console.log(result.error)
            }
            else {
                setEnrolledCourses(result)
            }
        })
    }, [])

    return (

        <Fragment>

            <div className="sidebar">
                <Link to="/" style={{ margin: "auto", width: "100%", backgroundColor: "white" }}>
                    <img src={logo} alt="logo" style={{ height: 70, width: 70 }} />{"   "}
                    <b className="title">Learn Free</b>
                </Link>
                <a className="active" href="#">My Courses</a>
                <a href="/explore-courses">Explore</a>
                <a href="/" onClick={() =>
                    signout(() => {
                        history.push('/')
                    })
                }>Sign Out</a>
            </div>

            <div className="content">

                <div className="text-center m-5 p-5 profile">
                    <h3>
                        <img src="https://cdn.eckovation.com/courses/images/default_ppic.svg" alt="user"></img>
                        {name}
                    </h3>
                </div>

                {
                    enrolledCourses && enrolledCourses.map((e, i) => (
                        <div className="card m-5 profile" key={i} >
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img className="card-img-top" src={`/api/course/photo/${e[0]._id}`} alt="course" style={{ maxHeight: "100%", maxWidth: "100% " }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">

                                        <h5 className="card-title">{e[0].name}</h5>
                                        <p className="card-text">{e[0].description && e[0].description.substring(0, 200)}...</p>
                                        <Link
                                            className="btn menu-btn mt-2 mr-3 pt-2 pb-2 pr-2 pl-2"
                                            to={`/user/resumecourse/${e[0]._id}`}>
                                            Resume Course
                                     </Link>
                                    </div>
                                </div>
                                <progress value="65" max="100" style={{ width: "100%", backgroundColor: "green" }} />
                            </div>
                        </div>
                    ))
                }

            </div>
        </Fragment>
    )

}

export default withRouter(Dashboard)