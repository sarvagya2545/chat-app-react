import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChatPerson extends Component {
    render() { 
        const { roomName } = this.props;
        return (
            <div className="chat-person">
                <h3 className="chat-person-name">{roomName}</h3>
                <p className="chat-person-status">online</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const roomsObject = state.chat.chatRoomsObject
    const currentChatRoom = state.chat.currentChatRoom

    return {
        roomName: roomsObject[currentChatRoom] ? roomsObject[currentChatRoom].roomName : 'undefined'
    }
}

export default connect(mapStateToProps)(ChatPerson);