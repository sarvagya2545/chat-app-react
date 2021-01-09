import React, { Component } from 'react';
import Pfp from '../chat/Pfp';
import pfp from '../../images/pfp.svg';
import cx from "classnames";

class ChatRoomListItem extends Component {
    render() { 
        return (
            <li 
                className={cx('chat-room-list-item', { 'selected': this.props.selected })}
                onClick={this.props.onClick}
            >
                <Pfp pfp={pfp} size="md"/>
                <div className="chat-room-item-details">
                    <div>
                        <p>{this.props.name || "Name"}</p>
                        <span>message...</span>
                    </div>
                </div>
            </li>
        );
    }
}
 
export default ChatRoomListItem;