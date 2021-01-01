import React, { Component } from 'react';
import ChatBox from '../components/chat/ChatBox';
import ChatForm from '../components/chat/ChatForm';
import ChatHeading from '../components/chat/ChatHeading';

class Chat extends Component {
    state = {}
    render() { 
        return (
            <div className="chat-container-main">
                <div className="chat-left-panel">

                </div>
                <div className="chat-main">
                    <ChatHeading/>              
                    <ChatBox/>
                    <ChatForm/>
                </div>
            </div>
        );
    }
}
 
export default Chat;