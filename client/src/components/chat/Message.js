import React, { Component } from 'react';
import cx from 'classnames';
import img from '../../images/img.jpg';
import img2 from '../../images/img2.jpg';

class Message extends Component {

    formatTime(time) {
        const timeObj = new Date(time);
        var hrs = timeObj.getHours();
        var minutes = timeObj.getMinutes();
        var ampm = hrs >= 12 ? 'PM' : 'AM';
        hrs = hrs % 12;
        hrs = hrs ? hrs : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = `${hrs}:${minutes} ${ampm}`;
        return strTime;
    }

    render() {
        const { isMine, name, content: { text } } = this.props;
        return (
            <li className="chat-list-item">
                <div className={cx("chat-message", { "mine" : isMine }, { "others": !isMine })}>
                    { !isMine ? (<span className="msg-owner-name">{name}</span>) : null }
                    {/* <img src={img2} alt="img" className="chat-msg-img"/> */}
                    { text }
                    <span className="chat-message-time">
                        Sent: { this.formatTime(this.props.time) }
                    </span>
                </div>
            </li>
        );
    }
}

export default Message;