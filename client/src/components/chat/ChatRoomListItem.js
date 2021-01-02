import React, { Component } from 'react';
import Pfp from '../chat/Pfp';
import pfp from '../../images/pfp.svg';
import cx from "classnames";

class ChatRoomListItem extends Component {
    state = {  }
    render() { 
        return (
            <li className={cx('chat-room-list-item', { 'selected': this.props.selected })}>
                <Pfp pfp={pfp} size="md"/>
                <div className="chat-room-item-details">
                    <div>
                        <p>Name</p>
                        <span>message...</span>
                    </div>
                </div>
            </li>
        );
    }
}
 
export default ChatRoomListItem;