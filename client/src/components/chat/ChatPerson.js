import React, { Component } from 'react';

class ChatPerson extends Component {
    state = {  }
    render() { 
        return (
            <div className="chat-person">
                <h3 className="chat-person-name">Sahaj</h3>
                <p className="chat-person-status">online</p>
            </div>
        );
    }
}
 
export default ChatPerson;