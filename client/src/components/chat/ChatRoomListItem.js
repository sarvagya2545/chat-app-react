import React, { Component } from 'react';
import Pfp from '../chat/Pfp';
import pfp from '../../images/pfp.svg';
import cx from "classnames";
import Truncate from 'react-truncate';

class ChatRoomListItem extends Component {
    getMessage() {
        let finalMsg = this.props.message !== 'T' ? this.props.message : 'Empty...'
        return finalMsg;
    }

    render() { 

        const { selected, isTyping, onClick, name, src } = this.props;
        return (
            <li 
                className={cx('chat-room-list-item', { 'selected': selected })}
                onClick={onClick}
            >
                <Pfp pfp={pfp} size="md" src={src}/>
                <div className="chat-room-item-details">
                    <div>
                        <p>{name || "Name"}</p>
                        <span className={cx({ 'typing': isTyping })}>
                            <Truncate lines={1}>
                                {isTyping ? `${isTyping.user} is typing...` : this.getMessage()}
                            </Truncate>
                        </span>
                    </div>
                </div>
            </li>
        );
    }
}
 
export default ChatRoomListItem;