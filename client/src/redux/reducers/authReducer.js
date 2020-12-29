const initState = {
    isAuthenticated: false,
    token: null,
    user: null,
    isLoading: false,
    authMethod: null
};

const authReducer = (state = initState, action) => {
    return state;
}

export default authReducer;
