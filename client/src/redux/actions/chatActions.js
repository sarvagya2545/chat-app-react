import {
    LOAD_ROOMS,
    JOIN_ROOM,
    LEAVE_ROOM,
    USER_JOIN,
    USER_LEAVE,
    SEND_MESSAGE,
    RECIEVE_MESSAGE,
    ROOM_CREATED,
    CHANGE_CURRENT_ROOM,
    CONNECT,
    DISCONNECT,
    EXIT_ROOM,
    TYPING_START,
    TYPING_END,
    GET_ALL_PEOPLE,
    USER_STATUS_CHANGED,
    CLOSE_INFO_PANEL,
    MESSAGES_LOADED
} from './types';

import io from 'socket.io-client';
import axios from 'axios';
import { tokenConfig } from './authActions';
let socket;
let timeout;

export const connectToSocket = (rooms, user) => dispatch => {
    // connect to socket
    socket = io(window.location.origin)
    dispatch({ type: CONNECT });
    rooms !== undefined && rooms.forEach(room => {
        socket.emit('connectToRoom', { room })
        console.log(`Joined room: ${room.roomName}`)
    });

    socket.emit('online', ({ userId: user }))

    socket.on('message', (res) => {
        console.log('message: ', res)
        dispatch({ type: RECIEVE_MESSAGE, payload: res })
    })

    socket.on('typing', ({ user, roomId }) => {
        console.log('typing')
        dispatch({ type: TYPING_START, payload: { user, roomId } })
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch({ type: TYPING_END, payload: { roomId } })
        }, 500)
    })

    socket.on('addToRoom', ({ room }) => {
        dispatch({ type: JOIN_ROOM, payload: room })
    })

    socket.on('exitRoom', ({ user: { userId, userName }, room }) => {
        console.log('user left')
        dispatch({ type: USER_LEAVE, payload: { userId, userName, room } })
    })

    socket.on('userOnlineStatus', onlineUsers => {
        console.log(onlineUsers)
        const onlineUserIds = onlineUsers.map(onlineUser => onlineUser.id)
        dispatch({ type: USER_STATUS_CHANGED, payload: onlineUserIds })
    })
}

export const disconnectFromSocket = userId => dispatch => {
    socket.disconnect();
    dispatch({ type: DISCONNECT });
}

export const loadRooms = (token) => async dispatch => {
    try {
        const config = tokenConfig(token);
        let rooms;
        const res = await axios.get('/api/rooms/user', config)
        console.log(res);
        rooms = res.data.rooms;
        const roomsObject = convertRoomsArrayToObject(res.data.rooms)
        dispatch({ type: LOAD_ROOMS, payload: { roomsObject, rooms: res.data.rooms } })
        return rooms;
    } catch (error) {
        console.log(error)
    }
}

export const sendMessage = ({ room, message, userName, userId }) => dispatch => {
    console.log({ room, message })
    const messageObject = {
        room,
        text: message,
        by: userName,
        senderId: userId,
        time: new Date()
    };
    socket.emit('message', { room, messageObject });
}

export const emitTyping = ({ user, roomId }) => dispatch => {
    socket.emit('typing', { user, roomId })
}

export const createChatRoom = ({ selectedPeople, roomName }) => dispatch => {
    const config = tokenConfig();
    const bodyData = {
        roomName,
        people: selectedPeople
    }

    axios.post('/api/rooms/new', bodyData, config)
        .then(res => {
            console.log(res);
            // implement in future
            // dispatch({ type: ROOM_CREATED, payload: res.data.newRoom })
            socket.emit('createdChatRoom', { room: res.data.newRoom })
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

    axios.post(`/api/rooms/${roomId}/exit`, {}, config)
        .then(res => {
            dispatch({ type: EXIT_ROOM, payload: res.data.foundRoom.roomId })

            console.log('exitRooms', { room: roomId, user: res.data.user })
            socket.emit('exitRoom', { room: roomId, userId: res.data.user._id, userName: res.data.user.auth.username })

            // close group info panel if open
            dispatch({ type: CLOSE_INFO_PANEL })
        })
        .catch(err => console.log(err))
}

export const changeChatRoomTo = (roomId) => dispatch => {
    dispatch({ type: CHANGE_CURRENT_ROOM, payload: roomId })
}

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

export const getAllPeopleList = (listOfPeople) => dispatch => {
    const obj = {}
    listOfPeople.forEach(person => {
        obj[person.id] = person
    })

    dispatch({ type: GET_ALL_PEOPLE, payload: obj })
}

export const getMessagesOfRoom = ({ roomId, token }) => dispatch => {
    // set an axios request to the backend and get all the messages from the room
    axios.get(`/api/messages/room/${roomId}`, tokenConfig(token))
        .then(res => {
            // console.log('messages of the current room', res)
            let messages = res.data.messages;
            // console.log(messages);
            messages = messages.map(message => ({
                by: message.userName,
                room: message.roomId,
                text: message.content.text,
                time: new Date(message.timeStamp),
                senderId: message.senderId                
            }));
            console.log(messages);

            dispatch({ type: MESSAGES_LOADED, payload: { roomId, messages } })
        })
        .catch(err => console.log(err));
}