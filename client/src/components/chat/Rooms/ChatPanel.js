import React, { Component } from 'react';
import ChatPanelHeader from './ChatPanelHeader';
import ChatRooms from './ChatRooms';
import { connect } from 'react-redux';
import EnterUsername from '../User/EnterUsername';
import AddChatFAB from '../AddRoom/AddChatFAB';
import DisconnectBanner from '../../utils/disconnected';

class ChatPanel extends Component {
    state = {  }
    render() { 
        const { addChatToggle, username, userInfoToggle, connected } = this.props;
        return (
            <div className="chat-panel custom-scroll">
                {!connected && <DisconnectBanner/>}
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
        username: state.auth.user.auth.username,
        connected: state.chat.connected
    }
}

export default connect(mapStateToProps)(ChatPanel);