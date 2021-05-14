import React, { Component } from 'react';
import ChatRoomListItem from './ChatRoomListItem';
import { connect } from 'react-redux';
import { changeChatRoomTo } from '../../../redux/actions/chatActions';
import { addFiles } from '../../../redux/actions/fileActions';

class ChatRooms extends Component {

    setCurrentChatRoom = (roomId) => {
        this.props.changeChatRoomTo(roomId)
    }

    getRoomLastMessage = (room) => {
        if (room.messages.messageLoad) return 'Loading...';

        if (room.messages.messages && room.messages.messages[room.messages.messages.length - 1]) {
            const message = room.messages.messages[room.messages.messages.length - 1];
            const content = message.content

            if (content.fileURL) {
                return `${message.by}: ${content.isImage ? 'Image' : 'File'}`;
            }

            return `${message.by}: ${content.text}`;
        }

        return 'T';
    }

    onDragOver = (e, roomId) => {
        e.stopPropagation();
        e.preventDefault();
    }

    onDrop = (e, roomId) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.changeChatRoomTo(roomId);
        // console.log(e.dataTransfer.files);
        this.props.addFiles(e.dataTransfer.files, roomId);
    }

    onDragLeave = (e, roomId) => {
        e.stopPropagation();

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
                            droppable
                            onDragOver={e => this.onDragOver(e, room.roomId)}
                            onDrop={e => this.onDrop(e, room.roomId)}
                            onDragLeave={e => this.onDragLeave(e, room.roomId)}
                        />
                    )
                })}
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentChatRoom: state.chat.currentChatRoom,
        chatRoomsObject: state.chat.chatRoomsObject
    }
}

export default connect(mapStateToProps, { changeChatRoomTo, addFiles })(ChatRooms);