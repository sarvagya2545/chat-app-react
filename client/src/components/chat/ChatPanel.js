import React, { Component } from 'react';
import ChatPanelHeader from './ChatPanelHeader';
import ChatRooms from './ChatRooms';

class ChatPanel extends Component {
    state = {  }
    render() { 
        const { addChatToggle } = this.props;
        return (
            <div className="chat-panel">
                <ChatPanelHeader addChatToggle={addChatToggle}/>
                <ChatRooms/>
            </div>
        );
    }
}
 
export default ChatPanel;