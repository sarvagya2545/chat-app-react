import React, { Component } from 'react';

class Message extends Component {
    state = {}
    render() {
        return (
            <li className="chat-list-item">
                <div className="chat-message mine">
                    This is a chat message
                    <span className="chat-message-time">
                        Sent: 7:00PM
                    </span>
                </div>
            </li>
        );
    }
}

export default Message;