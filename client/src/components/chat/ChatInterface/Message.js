import React, { Component } from 'react';
import cx from 'classnames';
import FileDownload from './utils/FileDownload';
import ImageDownload from './utils/ImageDownload';

class Message extends Component {

    formatTime(time) {
        const timeObj = new Date(time);
        let date = timeObj.toLocaleDateString();
        let hrs = timeObj.getHours();
        let minutes = timeObj.getMinutes();
        let ampm = hrs >= 12 ? 'PM' : 'AM';
        hrs = hrs % 12;
        hrs = hrs ? hrs : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = `${date} ${hrs}:${minutes} ${ampm}`;
        return strTime;
    }

    render() {
        const { isMine, name, content: { text, fileURL, isImage, fileName } } = this.props;
        return (
            <li className="chat-list-item">
                <div className={cx("chat-message", { "mine" : isMine }, { "others": !isMine })}>
                    { !isMine ? (<span className="msg-owner-name">{name}</span>) : null }
                    { isImage && fileURL && <ImageDownload src={fileURL} name={fileName}/>}
                    { !isImage && fileURL && <FileDownload src={fileURL} name={fileName}/> }
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