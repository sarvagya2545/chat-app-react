import React, { Component } from 'react';
import ChatRoomListItem from '../chat/ChatRoomListItem';
import { connect } from 'react-redux';
import { loadRooms, changeChatRoomTo } from '../../redux/actions/chatActions';

class ChatRooms extends Component {

    setCurrentChatRoom = (roomId) => {
        this.props.changeChatRoomTo(roomId)
    }

    getRoomLastMessage = (room) => {
        if(room.messages.messageLoad) return 'Loading...';

        if(room.messages.messages[room.messages.messages.length - 1]) {
            const message = room.messages.messages[room.messages.messages.length - 1];
            const content = message.content

            if(content.fileURL) {
                return `${message.by}: ${content.isImage ? 'Image' : 'File'}`;
            }

            return `${message.by}: ${content.text}`;
        }
    
        return 'T';
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
                            message={(() => this.getRoomLastMessage(room))()}
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