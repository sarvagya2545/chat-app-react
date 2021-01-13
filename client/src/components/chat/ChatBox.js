import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';

class ChatBox extends Component {
    componentDidMount() {
        
    }

    render() { 
        const { messages } = this.props;
        return (
            <div className="chat-box">
                {messages.map(message => <Message isMine/>)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const currentChatRoom = state.chat.currentChatRoom
    return {
        messages: state.chat.chatRoomsObject[currentChatRoom].messages
    }
}

export default connect(mapStateToProps)(ChatBox);