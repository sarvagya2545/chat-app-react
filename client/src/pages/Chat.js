import React, { Component } from 'react';
import ChatBox from '../components/chat/ChatBox';
import ChatForm from '../components/chat/ChatForm';
import ChatHeading from '../components/chat/ChatHeading';
import ChatRooms from '../components/chat/ChatRooms';
import ChatPanelHeader from '../components/chat/ChatPanelHeader';
import { connectToSocket, disconnectFromSocket } from '../redux/actions/chatActions';
import { connect } from 'react-redux';

class Chat extends Component {
    state = {}

    componentDidUpdate() {
        if(this.props.isAuthenticated) {
            console.log('authenticated')
        } else {
            console.log('not authenticated')
        }
    }

    componentDidMount() {
        this.props.connectToSocket();
    }

    componentWillUnmount() {
        this.props.disconnectFromSocket();
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
 
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { connectToSocket, disconnectFromSocket })(Chat);