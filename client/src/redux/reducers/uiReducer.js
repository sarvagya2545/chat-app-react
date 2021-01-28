import { OPEN_INFO_PANEL, CLOSE_INFO_PANEL, OPEN_MODAL, CLOSE_MODAL } from "../actions/types";

const initState = {
    infoPanelOpen: false,
    modalOpen: false
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
                modalOpen: false
            }
        default:
            return state;
    }
}

export default uiReducer;