import { NO_USER_LOADED, USER_LOADING } from "../actions/types";

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
        default: 
            return {
                ...state
            }    
    }
}

export default authReducer;
