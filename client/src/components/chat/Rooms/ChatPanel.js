import React, { Component } from 'react';
import ChatPanelHeader from './ChatPanelHeader';
import ChatRooms from './ChatRooms';
import { connect } from 'react-redux';
import EnterUsername from '../User/EnterUsername';
import AddChatFAB from '../AddRoom/AddChatFAB';

class ChatPanel extends Component {
    state = {  }
    render() { 
        const { addChatToggle, username, userInfoToggle } = this.props;
        return (
            <div className="chat-panel custom-scroll">
                {username === 'not-set' ? (
                    <EnterUsername/>
                ) : (
                    <>
                        <ChatPanelHeader addChatToggle={addChatToggle} userInfoToggle={userInfoToggle}/>
                        <ChatRooms/>
                        <AddChatFAB addChatToggle={addChatToggle}/>
                    </>
                )}
            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        username: state.auth.user.auth.username
    }
}

export default connect(mapStateToProps)(ChatPanel);