import React, { Component } from 'react';
import Pfp from '../chat/Pfp';
import pfp from '../../images/pfp.svg';
import cx from "classnames";

class ChatRoomListItem extends Component {
    render() { 

        const { selected, isTyping, onClick, name } = this.props;
        return (
            <li 
                className={cx('chat-room-list-item', { 'selected': selected })}
                onClick={onClick}
            >
                <Pfp pfp={pfp} size="md"/>
                <div className="chat-room-item-details">
                    <div>
                        <p>{name || "Name"}</p>
                        <span className={cx({ 'typing': isTyping })}>{isTyping ? `${isTyping.user} is typing...` : 'message...'}</span>
                    </div>
                </div>
            </li>
        );
    }
}
 
export default ChatRoomListItem;