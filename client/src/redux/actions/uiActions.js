import { OPEN_INFO_PANEL, CLOSE_INFO_PANEL } from './types';

export const openInfoPanel = () => dispatch => {
    dispatch({ type: OPEN_INFO_PANEL })
}

export const closeInfoPanel = () => dispatch => {
    dispatch({ type: CLOSE_INFO_PANEL })
}