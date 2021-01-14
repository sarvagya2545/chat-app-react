import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';

class ChatBox extends Component {
    componentDidMount() {
        
    }

    isMine(by) {
        return by === this.props.username
    }

    render() { 
        const { messages } = this.props;
        return (
            <div className="chat-box">
                {messages.map((message,index) => (
                    <Message 
                        isMine={this.isMine(message.by)} 
                        text={message.text} 
                        time={message.time}
                        name={message.by}
                        key={index}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const currentChatRoom = state.chat.currentChatRoom
    return {
        messages: state.chat.chatRoomsObject[currentChatRoom].messages,
        username: state.auth.user.auth.username
    }
}

export default connect(mapStateToProps)(ChatBox);