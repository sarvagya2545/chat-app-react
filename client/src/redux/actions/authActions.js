import {
    USER_LOADING,
    USER_LOADED,
    NO_USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
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
    axios.get('http://localhost:5000/users/current', config)
        .then(res => {
            // set the status of user as loaded
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}

export const register = (formData) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.post(`/users/signup`, formData, config)
        .then(res => {
            // console.log('res.data', res.data)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            localStorage.setItem('x-chat-token', res.data.token)
        })
        .catch(err => {
            console.log(err.response);
        })
} 

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
            localStorage.setItem('x-chat-token', res.data.token)
        })
        .catch(err => {
            console.log(err.response);
        })
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