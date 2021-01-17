import { OPEN_INFO_PANEL, CLOSE_INFO_PANEL } from "../actions/types";

const initState = {
    infoPanelOpen: false
}

const uiReducer = (state = initState, action) => {
    switch(action.type) {
        case OPEN_INFO_PANEL:
            return {
                infoPanelOpen: true
            }
        case CLOSE_INFO_PANEL: 
            return {
                infoPanelOpen: false
            }
        default:
            return state;
    }
}

export default uiReducer;