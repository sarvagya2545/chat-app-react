import { OPEN_INFO_PANEL, CLOSE_INFO_PANEL, OPEN_MODAL, CLOSE_MODAL, MODAL_LOADING, MODAL_LOADED, MODAL_SUCCESS, MODAL_ERROR } from "../actions/types";

const initState = {
    infoPanelOpen: false,
    modalOpen: false,
    modalLoading: false,
    modalMessage: {
        status: null,
        msg: ''
    }
}

const uiReducer = (state = initState, action) => {
    switch(action.type) {
        case OPEN_INFO_PANEL:
            return {
                ...state,
                infoPanelOpen: true
            }
        case CLOSE_INFO_PANEL: 
            return {
                ...state,
                infoPanelOpen: false
            }
        case OPEN_MODAL: 
            return {
                ...state,
                modalOpen: true
            }
        case CLOSE_MODAL:
            return {
                ...state,
                modalOpen: false,
                modalLoading: false,
                modalMessage: {
                    status: null,
                    msg: ''
                }
            }
        case MODAL_LOADING:
            return {
                ...state,
                modalLoading: true
            }
        case MODAL_LOADED:
            return {
                ...state,
                modalLoading: false
            }
        case MODAL_SUCCESS:
            return {
                ...state,
                modalMessage: {
                    status: 1,
                    msg: action.payload
                }
            }
        case MODAL_ERROR:
            return {
                ...state,
                modalMessage: {
                    status: 0,
                    msg: action.payload
                }
            }
        default:
            return state;
    }
}

export default uiReducer;