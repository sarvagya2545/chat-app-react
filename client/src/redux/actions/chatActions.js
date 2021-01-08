import {
    LOAD_ROOMS,
    JOIN_ROOM,
    USER_JOIN,
    USER_LEAVE,
    SEND_MESSAGE,
    RECIEVE_MESSAGE,
    LEAVE_ROOM,
    CHANGE_CURRENT_ROOM,
    CONNECT,
    DISCONNECT
} from './types';

import io from 'socket.io-client';
import axios from 'axios';
import { tokenConfig } from './authActions';
let socket;

export const connectToSocket = () => dispatch => {
    // connect to socket
    socket = io('http://localhost:5000')
    dispatch({ type: CONNECT });
}

export const disconnectFromSocket = () => dispatch => {
    socket.disconnect();
    dispatch({ type: DISCONNECT });
}

export const loadRooms = () => dispatch => {
    const config = tokenConfig();
    axios.get('/rooms/user', config)
        .then(res => {
            dispatch({ type: LOAD_ROOMS, payload: res.data.rooms })
        })
        .catch(err => console.log(err));
}