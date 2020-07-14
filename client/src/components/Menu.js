import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../img/logo123.png'
import { isAuthenticated, signout } from '../auth'


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    }
    else {
        return { color: '#ffffff' }
    }
}

const Menu = ({ history }) => {
    return (
        <header className="navbar">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand" style={isActive(history, "/")}>
                    <img src={logo} alt="logo" style={{ height: 80, width: 80 }} />{"   "}
                    <b className="title">Learn Free</b>
                </Link>
                <nav className="nav navbar-body">
                    <ul className="nav navbar-right">

                        <Link to="/explore-courses" className="btn menu-btn mt-2 mr-2 pt-2 pb-2 pr-1 pl-1">Courses</Link>


                        {
                            !isAuthenticated() ? (

                                <Fragment>
                                    <Link
                                        className="btn menu-btn mt-2 mr-2 pt-2 pb-2 pr-1 pl-1"
                                        to="/login">
                                        Log In
                                  </Link>
                                    <Link
                                        className="btn menu-btn mt-2 mr-2 pt-2 pb-2 pr-1 pl-1"
                                        to="/register">
                                        Register
                                </Link>
                                </Fragment>
                            ) : (
                                    <Fragment>
                                        {isAuthenticated() && isAuthenticated().user.role === 0 ?
                                            <Link to="/user/dashboard" className="btn menu-btn mt-2 mr-2 pt-2 pb-2 pr-1 pl-1">
                                                Dashboard
                                            </Link>
                                            :
                                            <Link to="/admin/dashboard" className="btn menu-btn mt-2 mr-2 pt-2 pb-2 pr-1 pl-1">
                                                Dashboard
                                            </Link>
                                        }
                                        <Link to="/"
                                            className="btn menu-btn mt-2 mr-2 pt-2 pb-2 pr-1 pl-1"
                                            onClick={() =>
                                                signout(() => {
                                                    history.push('/')
                                                })
                                            }>SignOut</Link>
                                    </Fragment>
                                )
                        }




                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default withRouter(Menu)