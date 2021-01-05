import {
    JOIN_ROOM,
    USER_JOIN,
    USER_LEAVE,
    SEND_MESSAGE,
    RECIEVE_MESSAGE,
    LEAVE_ROOM,
    CHANGE_CURRENT_ROOM
} from './types';

import io from 'socket.io-client';
let socket;

export const connectToSocket = () => dispatch => {
    // connect to socket
    socket = io('http://localhost:5000')
}

export const disconnectFromSocket = () => dispatch => {
    socket.disconnect();
}

export const loadRooms = () => dispatch => {

}