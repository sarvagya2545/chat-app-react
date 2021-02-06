import { LOGIN_SUCCESS, LOGOUT_SUCCESS, NO_USER_LOADED, PROFILE_PIC_DELETE, PROFILE_PIC_UPLOAD, REGISTER_SUCCESS, USERNAME_UPDATE, USER_LOADED, USER_LOADING, USER_LOAD_ERROR } from "../actions/types";

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
        case USER_LOAD_ERROR:
            return {
                ...state,
                isLoading: false
            }
        case LOGIN_SUCCESS: 
        case REGISTER_SUCCESS:
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                authMethod: action.payload.user.config.method
            }    
        case LOGOUT_SUCCESS: 
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
                isLoading: false,
                authMethod: null
            }
        case USERNAME_UPDATE:
            return {
                ...state,
                user: {
                    ...state.user,
                    auth: {
                        ...state.user.auth,
                        username: action.payload
                    }
                }
            }
        case PROFILE_PIC_UPLOAD: 
            return {
                ...state,
                user: {
                    ...state.user,
                    pfpUrl: action.payload.url
                }
            }
        case PROFILE_PIC_DELETE:
            return {
                ...state,
                user: {
                    ...state.user,
                    pfpUrl: ''
                }
            }
        default: 
            return {
                ...state
            }    
    }
}

export default authReducer;
