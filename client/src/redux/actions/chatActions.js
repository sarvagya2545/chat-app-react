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
    MESSAGES_LOADED,
    INIT_FILE_REDUCER,
    GROUP_PIC_UPLOAD,
    GROUP_PIC_DELETE,
    PROFILE_PIC_UPLOAD,
    OTHER_PROFILE_PIC_UPLOAD,
    OTHER_PROFILE_PIC_DELETE,
    CLOSE_ROOM
} from './types';

import socket from '../../socket';
import axios from 'axios';
import { tokenConfig } from './authActions';
let timeout;

export const connectToSocket = (rooms, user) => dispatch => {
    // connect to socket
    // socket = io(window.location.origin)
    socket.connect(() => {
        dispatch({ type: CONNECT });
        rooms !== undefined && rooms.forEach(room => {
            socket.sendSocketEvent('connectToRoom', { room });
            // console.log(`Joined room: ${room.roomName} ${room._id}`)
        });
    });
    // console.log(socket);

    socket.sendSocketEvent('online', ({ userId: user }));

    socket.defineSocketEvent('message', (res) => {
        // console.log('message: ', res)
        dispatch({ type: RECIEVE_MESSAGE, payload: res })
    })

    socket.defineSocketEvent('typing', ({ user, roomId }) => {
        // console.log('typing')
        dispatch({ type: TYPING_START, payload: { user, roomId } })
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch({ type: TYPING_END, payload: { roomId } })
        }, 500)
    })

    socket.defineSocketEvent('addToRoom', ({ room }) => {
        room = { ...room, roomId: room._id }
        dispatch({ type: JOIN_ROOM, payload: room })
        dispatch({ type: MESSAGES_LOADED, payload: { roomId: room.roomId, messages: [] } })
    })

    socket.defineSocketEvent('exitRoom', ({ user: { userId, userName }, room }) => {
        // console.log('user left')
        dispatch({ type: USER_LEAVE, payload: { userId, userName, room } })
    })

    socket.defineSocketEvent('userOnlineStatus', onlineUsers => {
        // console.log(onlineUsers)
        const onlineUserIds = onlineUsers.map(onlineUser => onlineUser.id)
        dispatch({ type: USER_STATUS_CHANGED, payload: onlineUserIds })
    })

    socket.defineSocketEvent("pfpChange", (obj) => {
        // handle profile pic changed
        // console.log('obj',obj);
        const { isGroupImg, user, payload, currentUserId } = obj;

        if (isGroupImg) {
            dispatch({ type: GROUP_PIC_UPLOAD, payload })
        } else {
            dispatch({ type: OTHER_PROFILE_PIC_UPLOAD, payload: { url: payload.url, user, id: currentUserId } })
        }
    })

    socket.defineSocketEvent('pfpRemove', (obj) => {
        // console.log('obj', obj);
        const { isGroupImg, payload, currentUserId } = obj;

        if (isGroupImg) {
            dispatch({ type: GROUP_PIC_DELETE, payload })
        } else {
            if (user !== currentUserId)
                dispatch({ type: OTHER_PROFILE_PIC_DELETE, payload: { id: currentUserId } })
        }
    })
}

export const disconnectFromSocket = userId => dispatch => {
    socket.disconnect();
    dispatch({ type: DISCONNECT });
}

export const sendMessage = ({ room, message, userName, userId }) => dispatch => {
    console.log({ room, message })
    const messageObject = {
        room,
        content: {
            text: message,
        },
        by: userName,
        senderId: userId,
        time: new Date()
    };
    socket.sendSocketEvent('message', { room, messageObject });
}

export const emitTyping = ({ user, roomId }) => dispatch => {
    socket.sendSocketEvent('typing', { user, roomId })
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
            socket.sendSocketEvent('createdChatRoom', { room: res.data.newRoom })
            socket.sendSocketEvent('connectToRoom', { room: res.data.newRoom })
            // console.log(res.data.newRoom.roomName)
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

            // console.log('exitRooms', { room: roomId, user: res.data.user })
            socket.sendSocketEvent('exitRoom', { room: roomId, userId: res.data.user._id, userName: res.data.user.auth.username })

            // close group info panel if open
            dispatch({ type: CLOSE_INFO_PANEL })
        })
        .catch(err => console.log(err))
}

export const changeChatRoomTo = (roomId) => dispatch => {
    dispatch({ type: CHANGE_CURRENT_ROOM, payload: roomId })
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
                content: message.content,
                time: new Date(message.timeStamp),
                senderId: message.senderId
            }));
            // console.log(messages);

            dispatch({ type: MESSAGES_LOADED, payload: { roomId, messages } })
        })
        .catch(err => console.log(err, err.response));
}

export const changePfp = ({ isGroupImg, payload, user, currentUserId }) => {
    console.log('change pfp')
    // socket.emit('pfpChange', { isGroupImg, payload, user, currentUserId })
}

export const deletePfp = ({ isGroupImg, payload, user, currentUserId }) => {
    console.log('remove pfp');
    // socket.emit('pfpRemove', { isGroupImg, payload, user, currentUserId });
}

export const closeCurrentRoom = () => dispatch => {
    // console.log('close-current-room')
    dispatch({ type: CLOSE_ROOM });
}