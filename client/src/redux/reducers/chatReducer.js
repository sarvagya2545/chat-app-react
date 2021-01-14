import { LOAD_ROOMS, CONNECT, DISCONNECT, CHANGE_CURRENT_ROOM, ROOM_CREATED, EXIT_ROOM, RECIEVE_MESSAGE } from '../actions/types';

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
                }
            } 
        default:
            return {
                ...state
            }
    }
}

export default chatReducer;