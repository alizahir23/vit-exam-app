
import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import UserContext from './UserContext';


const PrivateRoute = ({ component: Component, ...rest }) => {

    useEffect(() => {
        console.log(localStorage.getItem("user"))
    }, [])

    return (
        <Route {...rest} render={props => (
            // localStorage.getItem('authToken') ?
            localStorage.getItem("user") ?
                < div >
                    <Component {...props} />
                </ div>
                : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;