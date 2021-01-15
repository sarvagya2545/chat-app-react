import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChatPerson extends Component {
    render() { 
        const { roomName, isTyping, typingUser } = this.props;
        return (
            <div className="chat-person">
                <h3 className="chat-person-name">{roomName}</h3>
                <p className="chat-person-status">{isTyping ? `${typingUser} is typing...` : 'online'}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const roomsObject = state.chat.chatRoomsObject
    const currentChatRoom = state.chat.currentChatRoom
    const isTyping = roomsObject[currentChatRoom].typing;

    return {
        roomName: roomsObject[currentChatRoom] ? roomsObject[currentChatRoom].roomName : 'undefined',
        isTyping: isTyping,
        typingUser: isTyping ? isTyping.user : null
    }
}

export default connect(mapStateToProps)(ChatPerson);