import React, { useState, useEffect, Fragment } from 'react'
import Modal from 'react-awesome-modal'
import { Link, Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth'
import Menu from './Menu'


const Login = () => {
    const [visible, setVisible] = useState();

    useEffect(() => {
        openModal()
    }, [])

    var openModal = () => {
        setVisible(true)
    }

    var closeModal = () => {
        setVisible(false)
    }


    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, error, loading, redirectToReferrer } = values
    //this is HIGHER ORDER FUNCTION: a function returnning another function
    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }


    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                }
                else {

                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        })
                    })
                }
            })
    }

    const showError = () => (
        <p className="text-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </p>
    )

    const showLoading = () => loading && (
        <p className="text-warning">
            <h4>Loading.......</h4>
        </p>
    )

    const { user } = isAuthenticated()

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            }
            else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }


    var SigninForm = () => (
        <form className="mt-5">
            <div className="form-group">
                <h6 >Email</h6>
                <input
                    type="email"
                    onChange={handleChange('email')} value={email}
                    className="form-control" placeholder="Enter email"
                />
            </div>

            <div className="form-group">
                <h6 >Password</h6>
                <input
                    type="password"
                    onChange={handleChange('password')} value={password}
                    className="form-control" placeholder="Enter password"
                />
            </div>
            <button className="button btn-block" onClick={clickSubmit}>
                Submit
            </button>
        </form>
    )

    return (
        <Fragment>
            <Menu />
            <div className="body">
                <Modal visible={visible} width="660" height="600" effect="fadeInLeft">
                    <div className="row mr-5 ml-5 mt-5" >
                        <div className="col-10">
                            <h1><b>Login</b></h1>
                        </div>
                        <div className="col-2">
                            <Link to='/' type="button" className="close" onClick={() => closeModal()} data-dismiss="modal" aria-h6="Close">
                                <span aria-hidden="true" >&times;</span>
                            </Link>
                        </div>
                    </div>
                    <hr />
                    <div className="row mt-5 ml-5 mr-5">
                        <div className="col-7">
                            {showError()}
                            {showLoading()}
                            {SigninForm()}
                            {redirectUser()}
                        </div>
                        <div className="col-5 sidenav">
                            <h3 className="text-center mt-5" style={{ color: "white" }}><b>Hi, Learner</b></h3><br />
                            <h4 className="text-center" style={{ color: "white" }}>Looking to create an account?</h4>
                            <div className="text-center mt-5"
                                style={{
                                    backgroundColor: "white", color: "black", fontFamily: "cursive", fontWeight: "bolder"
                                    , borderRadius: 25
                                }}>
                                <Link to='/register' className="btn btn-block">SignUp</Link>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>

        </Fragment>
    )

}

export default Login
