import { LOGIN_SUCCESS, NO_USER_LOADED, REGISTER_SUCCESS, USER_LOADING } from "../actions/types";

const initState = {
    isAuthenticated: false,
    token: null,
    user: null,
    isLoading: false,
    authMethod: null
};

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case NO_USER_LOADED:
            return {
                ...state,
                isLoading: false
            }
        case LOGIN_SUCCESS: 
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                authMethod: action.payload.user.config.method
            }    
        default: 
            return {
                ...state
            }    
    }
}

export default authReducer;
