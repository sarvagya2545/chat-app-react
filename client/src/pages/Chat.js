import React, { Component } from 'react';
import ChatBox from '../components/chat/ChatBox';
import ChatForm from '../components/chat/ChatForm';
import ChatHeading from '../components/chat/ChatHeading';
import ChatRooms from '../components/chat/ChatRooms';
import ChatPanelHeader from '../components/chat/ChatPanelHeader';
import io from 'socket.io-client';


let socket;

class Chat extends Component {
    state = {}

    componentDidMount() {
        // get current chat rooms from database

        // connect thru socket 

        // socket = io('http://localhost:5000')
    }

    render() { 
        return (
            <div className="chat-container-main">
                <div className="chat-panel">
                    <ChatPanelHeader/>
                    <ChatRooms/>
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