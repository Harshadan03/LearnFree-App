import React, { Fragment, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import logo from '../../img/logo123.png'
import { isAuthenticated, signout } from '../../auth'
import { withRouter } from 'react-router-dom'
import { getAllCategories } from '../../apis/apiCourses'
import { createCourse } from '../../apis/adminApis'

const AdminDashboard = ({ history }) => {

    const { user, token } = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        duration: "",
        categories: [],
        category: "",
        photo: "",
        loading: false,
        error: "",
        createdCourse: '',
        redirectToIntermidiate: false,
        formData: ""
    })

    const {
        name,
        description,
        price,
        duration,
        categories,
        category,
        photo,
        loading,
        error,
        createdCourse,
        redirectToIntermidiate,
        formData } = values

    const getCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, categories: data, formData: new FormData() })
                //console.log(data)
            }
        })
    }

    useEffect(() => {
        getCategories()
    }, [])


    const newPostForm = () => (

        <div class="form-style-10">
            <h1>Add Course Now!<span>Add Course and Explore Gateway to Student !</span></h1>
            <form onSubmit={clickSubmit}>
                <div class="section"><span>1</span>Course Name & Description</div>
                <div class="inner-wrap">
                    <label><b>Course </b><input type="text" onChange={handleChange('name')} value={name} placeholder="Enter Course Name" /></label>
                    <label><b>Details </b><textarea onChange={handleChange('description')} value={description} placeholder="Enter Course Details"></textarea></label>
                </div>

                <div class="section"><span>2</span>Course Icon</div>
                <div class="inner-wrap">
                    <input type="file" onChange={handleChange('photo')} accept="image/*" required />
                </div>

                <div class="section"><span>3</span>Select Category</div>
                <div class="inner-wrap">
                    <select id="job" onChange={handleChange('category')} >
                        {categories && categories.map((c, i) => (
                            <option key={i} value={c._id}>{c.name}</option>
                        ))
                        }
                    </select>
                </div>
                <div class="section"><span>4</span>More Course Information</div>
                <div class="inner-wrap">
                    <label><b>Course Duration </b><input type="text" onChange={handleChange('duration')} value={duration} placeholder="Course Duration*" /></label>
                    <label><b>Course Price </b><input type="number" onChange={handleChange('price')} value={price} placeholder="Course Price (Price without comma)*" /></label>
                </div>
                <div class="button-section" style={{ textAlign: "center" }}>
                    <button value="Apply">Create Course</button>
                </div>
            </form>
        </div>

    )

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value

        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: createdCourse ? '' : 'none' }}>

                <h2>{`${createdCourse}`} is created!</h2>
            </div>
        )
    }

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>)
    )

    const redirectUser = () => {
        if (redirectToIntermidiate) {
            if (!error) {
                return <Redirect to={'/addextraInfo'} />
            }
        }
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: "", loading: true })
        createCourse(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        duration: "",
                        photo: "",
                        price: "",
                        loading: false,
                        redirectToIntermidiate: true,
                        createdCourse: data.name
                    })
                }
            })
    }

    return (

        <Fragment>

            <div className="sidebar">
                <Link to="/" style={{ margin: "auto", width: "100%", backgroundColor: "white" }}>
                    <img src={logo} alt="logo" style={{ height: 70, width: 70 }} />{"   "}
                    <b className="title">Learn Free</b>
                </Link>
                <a className="active" href="/admin/dashboard">Add Course</a>
                <a href="/addcategory">Add Category</a>
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

export default withRouter(AdminDashboard)