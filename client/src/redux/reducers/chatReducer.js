import { LOAD_ROOMS, CONNECT, DISCONNECT, CHANGE_CURRENT_ROOM } from '../actions/types';

const initState = {
    connected: false,
    chatRooms: [],
    currentChatRoom: null,
    messages: []   
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
                chatRooms: action.payload,
            }
        case CHANGE_CURRENT_ROOM: 
            return {
                ...state,
                currentChatRoom: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default chatReducer;