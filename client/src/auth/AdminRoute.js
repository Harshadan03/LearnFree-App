import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from './index'

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => isAuthenticated() && isAuthenticated().user.role === 1 ? (
        <Component {...props} />
    ) : (

            <Redirect to={{
                pathname: "/login",
                state: { from: props.location }
            }} />
        )} />
)
export default AdminRoute