import { OPEN_INFO_PANEL, CLOSE_INFO_PANEL, OPEN_MODAL, CLOSE_MODAL, TOGGLE_ATTACHMENT_PANEL } from './types';

export const openInfoPanel = () => dispatch => {
    dispatch({ type: OPEN_INFO_PANEL })
}

export const closeInfoPanel = () => dispatch => {
    dispatch({ type: CLOSE_INFO_PANEL })
}

export const openModal = () => dispatch => {
    dispatch({ type: OPEN_MODAL })
}

export const closeModal = () => dispatch => {
    dispatch({ type: CLOSE_MODAL })
}

export const toggleAttachmentPanel = () => dispatch => {
    dispatch({ type: TOGGLE_ATTACHMENT_PANEL })
}