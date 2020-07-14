import React, { useEffect, useState, Fragment } from 'react'
import Modal from 'react-awesome-modal'
import { Link } from 'react-router-dom'
import { signup } from '../auth'
import Menu from './Menu'

const Register = () => {
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
        name: "",
        email: "",
        phone: "",
        password: "",
        error: "",
        success: false
    })

    const { name, email, password, phone, error, success } = values
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
        setValues({ ...values, error: false })
        signup({ name, email, phone, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        phone: "",
                        error: "",
                        success: true
                    })
                }
            })
    }
    const showError = () => (
        <p className="text-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </p>
    )

    const showSuccess = () => (
        <p className="text-success" style={{ display: success ? '' : 'none' }}>
            New Account is created . Please <Link to="/login">SignIn</Link>
        </p>
    )

    var SignupForm = () => (
        <form>
            <div className="form-group">
                <h6>Name</h6>
                <input
                    type="name"
                    className="form-control" placeholder="Enter your name"
                    onChange={handleChange('name')} value={name}
                />
            </div>
            <div className="form-group">
                <h6>Email</h6>
                <input
                    type="email"
                    onChange={handleChange('email')} value={email}
                    className="form-control" placeholder="Enter your email"
                />
            </div>
            <div className="form-group">
                <h6>Mobile no.</h6>
                <input type="number" pattern="[0-9.]*"
                    onChange={handleChange('phone')} value={phone}
                    className="form-control" placeholder="Enter phone no."
                />
            </div>
            <div className="form-group">
                <h6>Password</h6>
                <input
                    type="password"
                    onChange={handleChange('password')} value={password}
                    className="form-control" placeholder="Enter password"
                />
            </div>
            <button onClick={clickSubmit} className="button btn-block">
                Register
            </button>
        </form>
    )

    return (
        <Fragment>
            <Menu />
            <div className="body">
                <Modal visible={visible} width="660" height="600" effect="fadeInRight" >
                    <div className="row mr-5 ml-5 mt-5">
                        <div className="col-10">
                            <h1><b >Register</b></h1>
                        </div>
                        <div className="col-2">
                            <Link to='/' type="button" className="close" onClick={() => closeModal()} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" >&times;</span>
                            </Link>
                        </div>
                    </div>
                    <hr />
                    <div className="row mt-5 ml-5 mr-5">

                        <div className="col-5 sidenav">
                            <h3 className="text-center mt-5" style={{ color: "white" }}><b>Welcome Back</b></h3><br />
                            <h4 className="text-center" style={{ color: "white" }}>Already have an account?</h4>
                            <div className="text-center mt-5"
                                style={{
                                    backgroundColor: "white", color: "black", fontFamily: "cursive", fontWeight: "bolder"
                                    , borderRadius: 25
                                }}>
                                <Link to='/login' className="btn btn-block">SignIn</Link>
                            </div>
                        </div>
                        <div className="col-7">
                            {showError()}
                            {showSuccess()}
                            {SignupForm()}
                        </div>
                    </div>
                </Modal>
            </div>
        </Fragment>
    )

}

export default Register