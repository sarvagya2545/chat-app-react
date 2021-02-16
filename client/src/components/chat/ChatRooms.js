import React, { Component } from 'react';
import ChatRoomListItem from '../chat/ChatRoomListItem';
import { connect } from 'react-redux';
import { loadRooms, changeChatRoomTo } from '../../redux/actions/chatActions';

class ChatRooms extends Component {

    setCurrentChatRoom = (roomId) => {
        this.props.changeChatRoomTo(roomId)
    }

    getRoomLastMessage = (roomId) => {
        const content = this.props.rooms.filter(room => room.roomId === roomId)[0].messages.messages;
        console.log('content', content)
    }

    render() {
        return (
            <ul>
                {Object.values(this.props.chatRoomsObject).map(room => {
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
        currentChatRoom: state.chat.currentChatRoom,
        chatRoomsObject: state.chat.chatRoomsObject
    }
}

export default connect(mapStateToProps, { loadRooms, changeChatRoomTo })(ChatRooms);