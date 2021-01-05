import React, { Component } from 'react';
import ChatRoomListItem from '../chat/ChatRoomListItem';
import { connect } from 'react-redux';

class ChatRooms extends Component {
    state = {  }
    render() {
        return (
            <ul>
                {this.props.rooms.map((room, index) => {
                    return (
                        <ChatRoomListItem
                            selected={room.id === this.props.currentChatRoom}
                            key={index}
                        />
                    )
                })}
            </ul>
        );
    }
}
 
const mapStateToProps = state => {
    return  {
        rooms: state.chat.chatRooms,
        currentChatRoom: state.chat.currentChatRoom
    }
}

export default connect(mapStateToProps)(ChatRooms);