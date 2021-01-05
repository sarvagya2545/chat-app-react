const initState = {
    chatRooms: [{ id: 1 }, { id: 2 }],
    currentChatRoom: 2,
    messages: []   
}

const chatReducer = (state = initState, action) => {
    return state;
}

export default chatReducer;