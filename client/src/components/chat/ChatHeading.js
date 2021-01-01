import React, { Component } from 'react';
// import Avatar from '../../images/avatar.jpg'
import pfp from '../../images/pfp.svg';
import ChatPerson from '../chat/ChatPerson';

class ChatHeading extends Component {
    state = {  }
    render() { 
        return (
            <div className="chat-heading">
                <div className="pfp">
                    <img src={pfp} alt="pfp" className="pfp-img"/>
                </div>
                <ChatPerson/>
            </div>
        );
    }
}
 
export default ChatHeading;