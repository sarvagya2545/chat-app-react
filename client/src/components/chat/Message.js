import React, { Component } from 'react';
import cx from 'classnames';

class Message extends Component {
    render() {
        const { isMine } = this.props;
        return (
            <li className="chat-list-item">
                <div className={cx("chat-message", { "mine" : isMine }, { "others": !isMine })}>
                    { !isMine ? (<span className="msg-owner-name">Sarvagya</span>) : null }
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