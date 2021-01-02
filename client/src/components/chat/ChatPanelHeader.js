import React, { Component } from 'react';
import pfp from '../../images/pfp.svg';
import addImage from '../../images/add_img.svg';

class ChatPanelHeader extends Component {
    state = {}
    render() {
        return (
            <div className="chat-panel-header">
                <div className="pfp">
                    <img src={pfp} alt="pfp" className="pfp-img" />
                </div>
                <div className="btn-add-chat">
                    <img src={addImage} alt="add"/>
                </div>
            </div>
        );
    }
}

export default ChatPanelHeader;