import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import errorReducer from './errorReducer';
import uiReducer from './uiReducer';

export default combineReducers({
    auth: authReducer,
    chat: chatReducer,
    errors: errorReducer,
    ui: uiReducer
})