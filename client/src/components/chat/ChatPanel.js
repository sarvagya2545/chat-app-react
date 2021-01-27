import React, { Component } from 'react';
import ChatPanelHeader from './ChatPanelHeader';
import ChatRooms from './ChatRooms';
import { connect } from 'react-redux';
import EnterUsername from './EnterUsername';

class ChatPanel extends Component {
    state = {  }
    render() { 
        const { addChatToggle, username } = this.props;
        return (
            <div className="chat-panel custom-scroll">
                {username === 'not-set' ? (
                    <EnterUsername/>
                ) : (
                    <>
                        <ChatPanelHeader addChatToggle={addChatToggle}/>
                        <ChatRooms/>
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