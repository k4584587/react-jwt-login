import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from "../service/AuthService";

const PrivateRoute = ({ component: Component, role, ...rest }) => (
    <Route {...rest} render={props => {

        const user = AuthService.getCurrentUser();

        if (!user) {
            return <Redirect to={{ pathname: '/login' }} />
        }

        if (JSON.stringify(role).indexOf(user.roles) === -1) {
            alert("권한이 없습니다.");
            return <Redirect to={{ pathname: '/'}} />
        }

        return <Component currentUser={user} {...props} />
    }} />
)

export default PrivateRoute;