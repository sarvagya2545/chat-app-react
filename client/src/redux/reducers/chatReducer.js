import { LOAD_ROOMS, CONNECT, DISCONNECT, CHANGE_CURRENT_ROOM, ROOM_CREATED, EXIT_ROOM, RECIEVE_MESSAGE, TYPING_START, TYPING_END } from '../actions/types';

const initState = {
    connected: false,
    chatRoomsObject: {},
    chatRooms: [],
    currentChatRoom: null
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
                        messages: [
                            ...messages,
                            action.payload
                        ]
                    }
                },
                chatRooms: state.chatRooms.map(room => {
                    if(action.payload.room === room.roomId) {
                        return {
                            ...room,
                            messages: [
                                ...messages,
                                action.payload
                            ]
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
        default:
            return {
                ...state
            }
    }
}

export default chatReducer;