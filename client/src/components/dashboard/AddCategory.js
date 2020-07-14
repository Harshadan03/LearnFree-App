import React, { Fragment, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import logo from '../../img/logo123.png'
import { isAuthenticated, signout } from '../../auth'
import { withRouter } from 'react-router-dom'
import { getAllCategories } from '../../apis/apiCourses'
import { createCourse, createCategory } from '../../apis/adminApis'

const AddCategory = ({ history }) => {

    const { user, token } = isAuthenticated()

    const [categories, setCategories] = useState([])
    const [err, setErr] = useState(false)

    const [values, setValues] = useState({
        name: "",
        loading: false,
        error: "",
        createdCategory: '',
        redirectToDashboard: false
    })

    const {
        name,
        loading,
        error,
        createdCategory,
        redirectToDashboard
    } = values

    const getCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setErr(data.error)
            } else {
                setCategories(data)
                //console.log(data)
            }
        })
    }

    useEffect(() => {
        getCategories()
    }, [])


    const newPostForm = () => (

        <div class="form-style-10">
            <h1>Add Category Now!<span>Add Category and Explore Course Range in various Technology !</span></h1>
            <form onSubmit={clickSubmit}>
                <div class="section"><span>*</span>Category</div>
                <div class="inner-wrap">
                    <label><b>Course </b><input type="text" onChange={handleChange('name')} value={name} placeholder="Enter Category Name" required /></label>
                </div>
                <div class="button-section" style={{ textAlign: "center" }}>
                    <button value="Apply">Create Category</button>
                </div>
            </form>
        </div>

    )

    const handleChange = name => event => {
        const value = event.target.value

        setValues({ ...values, [name]: value })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: createdCategory ? '' : 'none' }}>

                <h2>{`${createdCategory}`} is created!</h2>
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
        if (redirectToDashboard) {
            if (!error) {
                return <Redirect to={'/admin/dashboard'} />
            }
        }
    }

    const clickSubmit = (event) => {
        event.preventDefault()

        setValues({ ...values, error: "", loading: true })
        createCategory({ name }, user._id, token)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        loading: false,
                        redirectToDashboard: true,
                        createdCategory: data.name
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
                <a href="/admin/dashboard">Add Course</a>
                <a href="/addcategory" className="active">Add Category</a>
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


                {showLoading()}
                {showError()}
                {showSuccess()}
                <div className="container-fluid coursepart">
                    {newPostForm()}
                    {redirectUser()}
                </div>

                <h3 className="text-center" style={{ color: "deeppink" }}>Available Category</h3><br />
                {
                    categories && categories.map((c, i) => (
                        <div className="section text-center mb-4"><span>{`${i + 1}`}</span>{c.name}</div>
                    ))
                }
            </div>
        </Fragment>
    )

}

export default withRouter(AddCategory)