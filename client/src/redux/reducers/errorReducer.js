import { AUTH_ERROR, CLEAR_ERRORS, NO_ERRORS, SERVER_ERROR } from "../actions/types";

const initState = {
    errors: {},
    errType: null,
    statusCode: null,
    isError: false
}

const errorReducer = (state = initState, action) => {
    switch(action.type) {
        case NO_ERRORS:
            return {
                ...initState
            }
        case AUTH_ERROR:
            return {
                errors: action.payload.errors,
                statusCode: action.payload.status,
                errType: action.payload.errType,
                isError: true
            }
        case SERVER_ERROR:
            return {
                errors: {
                    err: 'A server error ocurred. Try again. If the problem persists, contact the owner.'
                },
                statusCode: 500,
                errType: 'Server Error',
                isError: true
            }
        case CLEAR_ERRORS:
            return {
                ...initState
            }
        default: 
            return {
                ...state
            }
    }
}

export default errorReducer;