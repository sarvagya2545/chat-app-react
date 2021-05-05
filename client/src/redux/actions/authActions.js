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
    NO_ERRORS,
    SERVER_ERROR,
    MODAL_LOADING,
    MODAL_LOADED,
    MODAL_SUCCESS,
    MODAL_ERROR,
    CLEAR_ERRORS,
    LOAD_ROOMS,
    INIT_FILE_REDUCER
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
    axios.get('/api/users/current', config)
        .then(res => {
            let { user: { rooms, ...userData } } = res.data;
            const payload = { ...res.data, user: { ...userData } }

            // add a roomId property 
            rooms = rooms.map(r => ({ ...r, roomId: r._id }))

            // load rooms of the user
            const roomsObject = convertRoomsArrayToObject(rooms)
            const filesObject = createFilesObjectFromRooms(rooms)
            dispatch({ type: LOAD_ROOMS, payload: { roomsObject } })
            dispatch({ type: INIT_FILE_REDUCER, payload: filesObject })

            // console.log('loadUser', payload);
            // set the status of user as loaded
            // only send the room ids in the user object
            dispatch({ type: USER_LOADED, payload })
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
    axios.post(`/api/users/signup`, formData, config)
        .then(res => {
            console.log(res.data);

            let { user: { rooms, ...userData } } = res.data;
            const payload = { ...res.data, user: { ...userData } }

            // add a roomId property 
            rooms = rooms.map(r => ({ ...r, roomId: r._id }))

            // load rooms of the user
            const roomsObject = convertRoomsArrayToObject(rooms)
            const filesObject = createFilesObjectFromRooms(rooms)

            // dispatch actions to initialize rooms and the user
            dispatch({ type: LOAD_ROOMS, payload: { roomsObject } })
            dispatch({ type: INIT_FILE_REDUCER, payload: filesObject })
            dispatch({
                type: REGISTER_SUCCESS,
                payload: payload
            })
            dispatch({ type: NO_ERRORS })
            localStorage.setItem('x-chat-token', res.data.token)
        })
        .catch(err => {
            const errors = err.response.data.errors
            // console.log(err.response)

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

    axios.post(`/api/users/login`, formData, config)
        .then(res => {
            let { user: { rooms, ...userData } } = res.data;
            const payload = { ...res.data, user: { ...userData } }

            // add a roomId property 
            rooms = rooms.map(r => ({ ...r, roomId: r._id }))

            // load rooms of the user
            const roomsObject = convertRoomsArrayToObject(rooms)
            const filesObject = createFilesObjectFromRooms(rooms)

            // dispatch actions to initialize rooms and the user
            dispatch({ type: LOAD_ROOMS, payload: { roomsObject } })
            dispatch({ type: INIT_FILE_REDUCER, payload: filesObject })
            dispatch({
                type: LOGIN_SUCCESS,
                payload
            })
            dispatch({ type: NO_ERRORS })
            localStorage.setItem('x-chat-token', res.data.token)
            console.log('runs');
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAIL })
            // console.log(err.response);

            if (err.response.status === 401) {
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

            if (err.response.status === 400) {
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

// Google login action
export const googleLogin = resGoogle => dispatch => {
    // console.log('reached google login', resGoogle.accessToken);

    const config = {
        "Content-type": "application/json"
    }

    axios.get(`/api/users/google/token?access_token=${resGoogle.accessToken}`, config)
        .then(res => {
            let { user: { rooms, ...userData } } = res.data;
            const payload = { ...res.data, user: { ...userData } }

            // add a roomId property 
            rooms = rooms.map(r => ({ ...r, roomId: r._id }))

            // load rooms of the user
            const roomsObject = convertRoomsArrayToObject(rooms)
            const filesObject = createFilesObjectFromRooms(rooms)

            // dispatch actions to initialize rooms and the user
            dispatch({ type: LOAD_ROOMS, payload: { roomsObject } })
            dispatch({ type: INIT_FILE_REDUCER, payload: filesObject })
            dispatch({ type: LOGIN_SUCCESS, payload })
            dispatch({ type: NO_ERRORS })
            localStorage.setItem('x-chat-token', res.data.token)
        })
        .catch(err => {
            // console.log(err);
            if (err.response) {
                // some server error
                dispatch({ type: SERVER_ERROR });
            } else {
                const errorData = {
                    errors: {
                        err: 'Google user data was not provided correctly'
                    },
                    status: 401,
                    errType: 'Google login/signup error'
                }

                dispatch({ type: AUTH_ERROR, payload: errorData })
            }
        })
}

// Send email link to reset password
export const sendResetPasswordLink = (email, changeMessage) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    dispatch({ type: MODAL_LOADING })

    axios.post(`/api/users/change/password`, { email }, config)
        .then(res => {
            dispatch({ type: MODAL_LOADED })
            dispatch({ type: MODAL_SUCCESS, payload: res.data.msg })
            if(typeof changeMessage === 'function') changeMessage('Password Reset Link Sent To Email', false);
        })
        .catch(err => {
            dispatch({ type: MODAL_LOADED })
            // console.log(err.response.data)
            dispatch({ type: MODAL_ERROR, payload: err.response.data.message })
            changeMessage('Server error while sending password link', true);
        });
}

export const resetPassword = ({ newPassword, confirmPassword, token }) => dispatch => {
    const config = tokenConfig(token);

    // SEND AXIOS REQUEST TO SERVER TO CHANGE PASSWORD. ALONG WITH THE TOKEN.
    return axios.post(`/api/users/chng_pwd`, { newPassword, confirmPassword }, config)
        .then(res => {
            // console.log(res);
            // Redirect to login page and remove the current page from history
            dispatch({ type: CLEAR_ERRORS });
            return { status: 'OK' }
        })
        .catch(err => {
            // console.log(err.response);
            // Notify the user that an error has occurred
            const errors = err.response.data.errors;
            const errorData = {
                errors: errors,
                status: err.response.status,
                errType: 'Reset password error'
            }

            dispatch({ type: AUTH_ERROR, payload: errorData });
            return { status: 'ERR' }
        });
}

// Setup config/headers and token
export const tokenConfig = (defaultToken) => {
    // Get token from local storage
    const token = localStorage.getItem('x-chat-token') || defaultToken;

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

const convertRoomsArrayToObject = (rooms) => {
    const roomsObject = {};
    rooms.forEach(room => {
        roomsObject[room.roomId] = {
            ...room,
            messages: {
                messageLoad: true,
                messages: room.messages
            }
        }
    })
    return roomsObject;
}

const createFilesObjectFromRooms = (rooms) => {
    const obj = {};
    // console.log('rooms', rooms);

    rooms.forEach(room => {
        obj[room.roomId] = [];
    })

    return obj;
}