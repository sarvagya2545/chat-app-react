import { ADD_FILES, INIT_FILE_REDUCER, REMOVE_FILE } from "../actions/types";

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
    case ADD_FILES:
      return {
        ...state,
        filesObject: {
          ...state.filesObject,
          [action.payload.currentChatRoom]: action.payload.filesObjList
        }
      }
    case REMOVE_FILE: 
      const currentChatRoom = action.payload.currentChatRoom;
      return {
        ...state,
        filesObject: {
          ...state.filesObject,
          [currentChatRoom]: state.filesObject[currentChatRoom].filter((item, index) => index !== action.payload.currentIndex),
        }
      }
    default:
      return { ...state }
  }
}

export default fileReducer;