import React, { Fragment, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import logo from '../../img/logo123.png'
import { isAuthenticated, signout } from '../../auth'
import { withRouter } from 'react-router-dom'
import { getAllCategories } from '../../apis/apiCourses'
import { addCourseDetails, getSingleCourseJustAdded } from '../../apis/adminApis'

const AddExtraDetails = ({ history }) => {

    const { user, token } = isAuthenticated()

    const [course, setCourse] = useState([])
    const [err, setErr] = useState([])

    const loadCourseJustAdded = () => {
        getSingleCourseJustAdded('createdAt').then(data => {
            if (data.error) {
                setErr(data.error)
            } else {
                setCourse(data)
                console.log(data)
            }
        })
    }

    useEffect(() => {
        loadCourseJustAdded()
    }, [])


    const [values, setValues] = useState({
        curriculum: [{
            topic: '',
            subtopics: []
        }],
        instructors: [{
            name: '',
            qualification: '',
            about: ''
        }],
        loading: false,
        error: "",
        createdCourse: "",
        redirectToCourse: false,
        formData: ""
    })

    const {
        curriculum,
        topic,
        subtopics,
        instructors,
        name,
        qualification,
        about,
        loading,
        error,
        createdCourse,
        redirectToCourse
    } = values

    const handleChange = name => event => {
        const value = name === "subtopics" ? event.target.value.split(',') : event.target.value
        console.log(value)
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        curriculum[0].topic = topic
        curriculum[0].subtopics = subtopics
        instructors[0].name = name
        instructors[0].qualification = qualification
        instructors[0].about = about

        console.log(curriculum + " " + instructors)

        setValues({ ...values, error: "", loading: true })
        addCourseDetails(course[0]._id, user._id, token, { curriculum, instructors })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({
                        ...values,
                        curriculum: [{
                            topic: '',
                            subtopics: []
                        }],
                        instructors: [{
                            name: '',
                            qualification: '',
                            about: ''
                        }],
                        loading: false,
                        redirectToCourse: true,
                        createdCourse: data.name
                    })
                }
            })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdCourse ? '' : 'none' }}>
            <h2>{`${createdCourse}`} is created!</h2>
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>)
    )

    const redirectUser = () => {
        if (redirectToCourse) {
            if (!error) {
                return <Redirect to={`/addextraInfo`} />
            }
        }
    }

    const newPostForm = () => (

        <div class="form-style-10">
            <h1>More Course Details<span>Add Course and Explore Gateway to Student !</span></h1>
            <form onSubmit={clickSubmit}>
                <div class="section"><span>1</span>Course Curriculum & Topics and subtopics</div>
                <div class="inner-wrap">
                    <label><b>Topic </b><input type="text" onChange={handleChange('topic')} value={topic} placeholder="Topic of Curriculum" /></label>
                    <label><b>subtopics </b><textarea onChange={handleChange('subtopics')} value={subtopics} placeholder="subtopics (Use Comma i.e: s1,s2,s3)"></textarea></label>
                </div>
                <div class="section"><span>2</span>Course instructors</div>
                <div class="inner-wrap">
                    <label><b>Instructor </b><input type="text" onChange={handleChange('name')} value={name} placeholder="Name of Instructor" /></label>
                    <label><b>Qualification </b><textarea onChange={handleChange('qualification')} value={qualification} placeholder="instructors Qualification"></textarea></label>
                    <label><b>About Instructor </b><input type="text" onChange={handleChange('about')} value={about} placeholder="More about Instructor" /></label>
                </div>

                <div class="button-section" style={{ textAlign: "center" }}>
                    <button value="Apply">Add Details</button>
                </div>
            </form>
        </div>

    )

    return (

        <Fragment>

            <div className="sidebar">
                <Link to="/" style={{ margin: "auto", width: "100%", backgroundColor: "white" }}>
                    <img src={logo} alt="logo" style={{ height: 70, width: 70 }} />{"   "}
                    <b className="title">Learn Free</b>
                </Link>
                <a href="/admin/dashboard">Add New Course</a>
                <a href="/addextraInfo" className="active">Add Curriculum</a>
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
                        &nbsp; Hey - {user.name}
                    </h3>
                    <h6>You are Admin, Here to maintain this site</h6>
                </div>


                <div className="container-fluid coursepart">
                    {newPostForm()}
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {redirectUser()}
                    <br /><br />
                </div>

            </div>
        </Fragment>
    )

}

export default withRouter(AddExtraDetails)