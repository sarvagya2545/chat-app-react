import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...props }) => {
    return (
        <Route
            { ...props }
            render = {
                routerProps => {
                    if(props.isAuthenticated) {
                        return <Component { ...routerProps } { ...props }/>
                    } else {
                        return <Redirect to="/"/>
                    }
                }
            }
        />
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(ProtectedRoute);