import React, { Component } from 'react';
import ChatRoomListItem from '../chat/ChatRoomListItem';

class ChatRooms extends Component {
    state = {  }
    render() {
        return (
            <ul>
                <ChatRoomListItem/>
                <ChatRoomListItem/>
                <ChatRoomListItem selected/>
                <ChatRoomListItem/>
            </ul>
        );
    }
}
 
export default ChatRooms;