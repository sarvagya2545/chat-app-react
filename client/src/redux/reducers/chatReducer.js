import { LOAD_ROOMS, CONNECT, DISCONNECT, CHANGE_CURRENT_ROOM, ROOM_CREATED, EXIT_ROOM, RECIEVE_MESSAGE, TYPING_START, TYPING_END, GET_ALL_PEOPLE, USER_STATUS_CHANGED, USER_LEAVE, JOIN_ROOM, LOGOUT_SUCCESS, MESSAGES_LOADED, GROUP_PIC_UPLOAD, GROUP_PIC_DELETE } from '../actions/types';

const initState = {
    connected: false,
    chatRoomsObject: {},
    chatRooms: [],
    currentChatRoom: null,
    peopleList: {},
    onlineUserIds: []
}

const chatReducer = (state = initState, action) => {
    switch(action.type) {
        case CONNECT: 
            return {
                ...state,
                connected: true
            }
        case DISCONNECT: 
            return {
                ...state,
                connected: false
            }
        case LOAD_ROOMS:
            return {
                ...state,
                chatRooms: action.payload.rooms,
                chatRoomsObject: action.payload.roomsObject
            }
        case CHANGE_CURRENT_ROOM: 
            return {
                ...state,
                currentChatRoom: action.payload
            }
        case JOIN_ROOM:
        case ROOM_CREATED:
            return {
                ...state,
                chatRooms: [ ...state.chatRooms, action.payload ],
                chatRoomsObject: {
                    ...state.chatRoomsObject,
                    [action.payload.roomId]: action.payload
                }
            }
        case EXIT_ROOM:
            const { [action.payload]: roomId , ...newChatRooms } = state.chatRoomsObject
            return {
                ...state,
                chatRooms: state.chatRooms.filter(room => room.roomId !== roomId.roomId),
                chatRoomsObject: newChatRooms,
                currentChatRoom: null
            }   
        case RECIEVE_MESSAGE:
            const roomObject = state.chatRoomsObject[action.payload.room]
            const messages = roomObject.messages
            return {
                ...state,
                chatRoomsObject: {
                    ...state.chatRoomsObject,
                    [action.payload.room]: {
                        ...roomObject,
                        messages: {
                            ...roomObject.messages,
                            messages: [
                                ...messages.messages,
                                action.payload
                            ]
                        }
                    }
                },
                chatRooms: state.chatRooms.map(room => {
                    if(action.payload.room === room.roomId) {
                        return {
                            ...room,
                            messages: {
                                ...roomObject.messages,
                                messages: [
                                    ...messages.messages,
                                    action.payload
                                ]
                            }
                        }
                    }
                    return room;
                })
            }
        case TYPING_START: 
            return {
                ...state,
                chatRoomsObject: {
                    ...state.chatRoomsObject,
                    [action.payload.roomId]: {
                        ...state.chatRoomsObject[action.payload.roomId],
                        typing: {
                            user: action.payload.user
                        }
                    }
                },
                chatRooms: state.chatRooms.map(room => {
                    if (room.roomId === action.payload.roomId) {
                        return {
                            ...room,
                            typing: {
                                user: action.payload.user
                            }
                        }
                    }

                    return room;
                })
            }
        case TYPING_END:
            return {
                ...state,
                chatRoomsObject: {
                    ...state.chatRoomsObject,
                    [action.payload.roomId]: {
                        ...state.chatRoomsObject[action.payload.roomId],
                        typing: null
                    }
                },
                chatRooms: state.chatRooms.map(room => {
                    if (room.roomId === action.payload.roomId) {
                        return {
                            ...room,
                            typing: undefined
                        }
                    }

                    return room;
                })
            }
        case GET_ALL_PEOPLE: 
            return {
                ...state,
                peopleList: action.payload
            }
        case USER_STATUS_CHANGED:
            return {
                ...state,
                onlineUserIds: action.payload
            }
        case USER_LEAVE:
            const chatRoom = state.chatRoomsObject[action.payload.room];
            return {
                ...state,
                chatRoomsObject: {
                    ...state.chatRoomsObject,
                    [action.payload.room]: {
                        ...chatRoom,
                        people: chatRoom.people.filter(person => person !== action.payload.userId)
                    }
                },
                chatRooms: state.chatRooms.map(room => {
                    return {
                        ...room,
                        people: room.people.filter(person => person !== action.payload.userId)
                    }
                })
            }
        case LOGOUT_SUCCESS:
            return {
                ...initState
            }
        case MESSAGES_LOADED:
            return {
                ...state,
                chatRoomsObject: {
                    ...state.chatRoomsObject,
                    [action.payload.roomId]: {
                        ...state.chatRoomsObject[action.payload.roomId],
                        messages: {
                            messageLoad: false,
                            messages: action.payload.messages
                        }
                    }
                },
                chatRooms: state.chatRooms.map(room => ({
                    ...room,
                    messages: {
                        messageLoad: false,
                        messages: action.payload.messages
                    }
                }))
            }
        case GROUP_PIC_UPLOAD:
            return {
                ...state,
                chatRoomsObject: {
                    ...state.chatRoomsObject,
                    [action.payload.roomId]: {
                        ...state.chatRoomsObject[action.payload.roomId],
                        pfpUrl: action.payload.url
                    }
                },
                chatRooms: state.chatRooms.map(room => {
                    if(room.roomId !== action.payload.roomId)
                        return room;

                    return {
                        ...room,
                        pfpUrl: action.payload.url
                    }
                })
            }
        case GROUP_PIC_DELETE:
            return {
                ...state,
                chatRoomsObject: {
                    ...state.chatRoomsObject,
                    [action.payload.roomId]: {
                        ...state.chatRoomsObject[action.payload.roomId],
                        pfpUrl: ''
                    }
                },
                chatRooms: state.chatRooms.map(room => {
                    if(room.roomId !== action.payload.roomId)
                        return room;

                    return {
                        ...room,
                        pfpUrl: ''
                    }
                })
            }
        default:
            return {
                ...state
            }
    }
}

export default chatReducer;