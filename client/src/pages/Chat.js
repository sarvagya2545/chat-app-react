import React, { Component } from 'react';
import ChatBox from '../components/chat/ChatBox';
import ChatForm from '../components/chat/ChatForm';
import ChatHeading from '../components/chat/ChatHeading';
import ChatRooms from '../components/chat/ChatRooms';
import ChatPanelHeader from '../components/chat/ChatPanelHeader';
import { connectToSocket, disconnectFromSocket, loadRooms } from '../redux/actions/chatActions';
import { connect } from 'react-redux';
import EmptyChat from '../components/chat/EmptyChat';

class Chat extends Component {
    componentDidMount() {
        this.props.connectToSocket();
        this.props.loadRooms();
    }

    componentWillUnmount() {
        this.props.disconnectFromSocket();
    }

    render() { 
        const { currentChatRoom } = this.props;
        return (
            <div className="chat-container-main">
                <div className="chat-panel">
                    <ChatPanelHeader/>
                    <ChatRooms/>
                </div>
                <div className="chat-main">
                    {currentChatRoom === null ? 
                        <EmptyChat/> : <>
                                <ChatHeading/>              
                                <ChatBox/>
                                <ChatForm/>
                          </>
                    }
                </div>
            </div>
        );
    }
}
 
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        currentChatRoom: state.chat.currentChatRoom
    }
}

export default connect(mapStateToProps, { connectToSocket, disconnectFromSocket, loadRooms })(Chat);