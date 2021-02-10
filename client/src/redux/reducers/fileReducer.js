import { ADD_FILES, CLEAR_GROUP_FILES, EXIT_ROOM, INIT_FILE_REDUCER, JOIN_ROOM, REMOVE_FILE, ROOM_CREATED } from "../actions/types";

const initState = {
  filesObject: {
    // 1: [
    //   {
    //     file: null,
    //     fileUrl: ''
    //   }
    // ]
  },
}

const fileReducer = (state = initState, action) => {
  switch(action.type) {
    case INIT_FILE_REDUCER:
      return {
        ...state,
        filesObject: action.payload
      }
    case JOIN_ROOM:
    case ROOM_CREATED:
      return {
        ...state,
        filesObject: {
          ...state.filesObject,
          [action.payload.roomId]: []
        }
      }
    case EXIT_ROOM:
      const { [action.payload]: roomId, ...newFilesObject } = state.filesObject;
      return {
        ...state,
        filesObject: newFilesObject
      }
    case ADD_FILES:
      return {
        ...state,
        filesObject: {
          ...state.filesObject,
          [action.payload.currentChatRoom]: [ ...state.filesObject[action.payload.currentChatRoom], ...action.payload.filesObjList ]
        }
      }
    case REMOVE_FILE: 
      const currentChatRoom = action.payload.currentChatRoom;
      return {
        ...state,
        filesObject: {
          ...state.filesObject,
          [currentChatRoom]: state.filesObject[currentChatRoom].filter((item, index) => index != action.payload.currentIndex),
        }
      }
    case CLEAR_GROUP_FILES:
      return {
        ...state,
        filesObject: {
          ...state.filesObject,
          [action.payload]: []
        }
      }
    default:
      return { ...state }
  }
}

export default fileReducer;