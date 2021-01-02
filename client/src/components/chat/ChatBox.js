import React, { Component } from 'react';
import Message from './Message';

class ChatBox extends Component {
    state = {  }
    render() { 
        return (
            <div className="chat-box">
                <Message/>
                <li className="chat-list-item">
                    <div className="chat-message others">
                        <span className="msg-owner-name">Sarvagya</span>
                        This is a chat message
                        <span className="chat-message-time">
                            Sent: 7:00PM
                        </span>
                    </div>
                </li>
            </div>
        );
    }
}
 
export default ChatBox;