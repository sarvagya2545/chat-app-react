import {
    USER_LOADING,
    USER_LOADED,
    NO_USER_LOADED,
    USER_LOAD_ERROR,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    NO_ERRORS
} from './types';

import axios from 'axios';

// get token from localStorage and load the user
export const loadUser = () => (dispatch, getState) => {
    // set the status of user as loading
    dispatch({ type: USER_LOADING });

    // create a config object by getting the user from token
    const config = tokenConfig();

    if (!config) {
        // config is null because of no token
        // set the user status as not loaded
        return dispatch({ type: NO_USER_LOADED })
    }

    // perform an axios request to get the user's data from token
    axios.get('/users/current', config)
        .then(res => {
            // set the status of user as loaded
            // console.log(res.data);
            dispatch({ type: USER_LOADED, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: USER_LOAD_ERROR })
            // localStorage.removeItem('x-chat-token')
            console.log(err);
        })
}

// register function
export const register = (formData) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // signup request axios
    axios.post(`/users/signup`, formData, config)
        .then(res => {
            // console.log('res.data', res.data)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            dispatch({ type: NO_ERRORS })
            localStorage.setItem('x-chat-token', res.data.token)
        })
        .catch(err => {
            const errors = err.response.data.errors
            console.log(err.response)

            const errorData = { 
                errors: errors,
                status: err.response.status,
                errType: 'Registration error'
            }

            dispatch({ type: REGISTER_FAIL })
            dispatch({ type: AUTH_ERROR, payload: errorData })
        })
} 

// login function
export const login = (formData) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.post(`/users/login`, formData, config)
        .then(res => {
            // console.log('res.data', res.data)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            dispatch({ type: NO_ERRORS })
            localStorage.setItem('x-chat-token', res.data.token)
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAIL })
            console.log(err.response);

            if(err.response.status === 401) {
                // unauthorized 
                const errorData = {
                    errors: {
                        usernameOrEmail: 'Either email/username or password entered is incorrect'
                    },
                    status: 401,
                    errType: 'Login error'
                }
                dispatch({ type: AUTH_ERROR, payload: errorData })
            }

            if(err.response.status === 400) {
                const errors = err.response.data.errors;
                const errorData = { 
                    errors: errors,
                    status: err.response.status,
                    errType: 'Login error'
                }
    
                dispatch({ type: AUTH_ERROR, payload: errorData })
            }
        })
} 

// logout function
export const logout = () => dispatch => {
    localStorage.removeItem('x-chat-token')
    dispatch({ type: LOGOUT_SUCCESS })
    dispatch({ type: NO_ERRORS })
}

// Setup config/headers and token
export const tokenConfig = () => {
    // Get token from local storage
    const token = localStorage.getItem('x-chat-token');

    console.log('token ', token)

    if (!token) {
        return null
    }

    // Headers
    let config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `${token}`,
        },
    };

    return config;
};