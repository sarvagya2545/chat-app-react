import React, { Component } from 'react';
import ChatRoomListItem from '../chat/ChatRoomListItem';
import { connect } from 'react-redux';
import { loadRooms, changeChatRoomTo } from '../../redux/actions/chatActions';

class ChatRooms extends Component {

    setCurrentChatRoom = (roomId) => {
        this.props.changeChatRoomTo(roomId)
    }

    render() {
        return (
            <ul>
                {this.props.rooms.map(room => {
                    return (
                        <ChatRoomListItem
                            selected={room.roomId === this.props.currentChatRoom}
                            key={room.roomId}
                            onClick={() => this.setCurrentChatRoom(room.roomId)}
                            name={room.roomName}
                            isTyping={room.typing}
                            src={room.pfpUrl}
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

export default connect(mapStateToProps, { loadRooms, changeChatRoomTo })(ChatRooms);