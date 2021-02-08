import { ADD_FILES, INIT_FILE_REDUCER } from "../actions/types";

const initState = {
  filesObject: {
    // 1: [
    //   {
    //     file: null,
    //     fileUrl: ''
    //   }
    // ]
  },
  currentCarousel: 0
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
    default:
      return { ...state }
  }
}

export default fileReducer;