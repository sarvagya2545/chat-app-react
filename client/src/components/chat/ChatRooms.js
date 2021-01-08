import React, { Component } from 'react';
import ChatRoomListItem from '../chat/ChatRoomListItem';
import { connect } from 'react-redux';
import { loadRooms } from '../../redux/actions/chatActions';

class ChatRooms extends Component {
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

export default connect(mapStateToProps, { loadRooms })(ChatRooms);