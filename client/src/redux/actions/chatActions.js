import {
    LOAD_ROOMS,
    JOIN_ROOM,
    USER_JOIN,
    USER_LEAVE,
    SEND_MESSAGE,
    RECIEVE_MESSAGE,
    LEAVE_ROOM,
    ROOM_CREATED,
    CHANGE_CURRENT_ROOM,
    CONNECT,
    DISCONNECT,
    EXIT_ROOM
} from './types';

import io from 'socket.io-client';
import axios from 'axios';
import { tokenConfig } from './authActions';
let socket;

export const connectToSocket = (rooms) => dispatch => {
    // connect to socket
    socket = io('http://localhost:5000')
    dispatch({ type: CONNECT });
    rooms !== undefined && rooms.forEach(room => {
        socket.emit('connectToRoom', { room })
        console.log(`Joined room: ${room.roomName}`)
    });

    socket.on('message', (res) => {
        console.log('message: ', res)
        dispatch({ type: RECIEVE_MESSAGE, payload: res })
    })
}

export const disconnectFromSocket = () => dispatch => {
    socket.disconnect();
    dispatch({ type: DISCONNECT });
}

export const loadRooms = () => async dispatch => {
    try {
        const config = tokenConfig();
        let rooms;
        const res = await axios.get('/rooms/user', config)
        console.log(res);
        rooms = res.data.rooms;
        const roomsObject = convertRoomsArrayToObject(res.data.rooms)
        dispatch({ type: LOAD_ROOMS, payload: { roomsObject, rooms: res.data.rooms } })
        return rooms;
    } catch (error) {
        console.log(error)
    }
}

export const sendMessage = ({ room, message, userName }) => dispatch => {
    console.log({ room, message })
    const messageObject = {
        room,
        text: message,
        by: userName,
        time: new Date()
    };
    socket.emit('message', { room, messageObject });
}

export const recieveMessage = () => dispatch => {
    
}

export const createChatRoom = ({ selectedPeople, roomName }) => dispatch => {
    const config = tokenConfig();
    const bodyData = {
        roomName,
        people: selectedPeople
    }

    axios.post('/rooms/new', bodyData, config)
        .then(res => {
            console.log(res);
            dispatch({ type: ROOM_CREATED, payload: res.data.newRoom })
            socket.emit('connectToRoom', { room: res.data.newRoom })
            console.log(res.data.newRoom.roomName)
        })
        .catch(err => console.log(err))
}

export const exitChatRoom = (roomId, roomName) => dispatch => {
    let isLeaving = window.confirm(`Are you sure you want to leave the room "${roomName}"?`);

    // if user does not leave, stop the execution immediately
    if (!isLeaving) return null

    const config = tokenConfig();

    axios.post(`/rooms/${roomId}/exit`, {}, config)
        .then(res => {
            dispatch({ type: EXIT_ROOM, payload: res.data.foundRoom.roomId })
        })
        .catch(err => console.log(err))
}

export const changeChatRoomTo = (roomId) => dispatch => {
    dispatch({ type: CHANGE_CURRENT_ROOM, payload: roomId })
}

const convertRoomsArrayToObject = (rooms) => {
    const roomsObject = {};
    rooms.forEach(room => {
        roomsObject[room.roomId] = room
    })
    return roomsObject;
}