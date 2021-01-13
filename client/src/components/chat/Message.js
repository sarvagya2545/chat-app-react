import React, { Component } from 'react';
import cx from 'classnames';

class Message extends Component {
    render() {
        const { isMine } = this.props;
        return (
            <li className="chat-list-item">
                <div className={cx("chat-message", { "mine" : isMine }, { "others": !isMine })}>
                    { !isMine ? (<span className="msg-owner-name">{this.props.name}</span>) : null }
                    { this.props.text }
                    <span className="chat-message-time">
                        Sent: { this.props.time }
                    </span>
                </div>
            </li>
        );
    }
}

export default Message;