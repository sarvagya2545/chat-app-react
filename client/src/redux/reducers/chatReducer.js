import { LOAD_ROOMS, CONNECT, DISCONNECT, CHANGE_CURRENT_ROOM, ROOM_CREATING, ROOM_CREATED } from '../actions/types';

const initState = {
    connected: false,
    chatRoomsObject: {},
    chatRooms: [],
    currentChatRoom: null,
    addRoomLoading: false
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
        case ROOM_CREATING: 
            return {
                ...state,
                addRoomLoading: true
            }    
        case ROOM_CREATED:
            return {
                ...state,
                addRoomLoading: false,
                chatRooms: [ ...state.chatRooms, action.payload ],
                chatRoomsObject: {
                    ...state.chatRoomsObject,
                    [action.payload.roomId]: action.payload
                }
            }
        default:
            return {
                ...state
            }
    }
}

export default chatReducer;