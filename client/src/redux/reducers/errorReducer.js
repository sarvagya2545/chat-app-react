import { AUTH_ERROR, NO_ERRORS } from "../actions/types";

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
            console.log(action.payload)
            return {
                errors: action.payload.errors,
                statusCode: action.payload.status,
                errType: action.payload.errType,
                isError: true
            }
        default: 
            return {
                ...state
            }
    }
}

export default errorReducer;