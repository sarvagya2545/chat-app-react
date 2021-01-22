import React, { Component } from 'react';
import ChatBox from '../components/chat/ChatBox';
import ChatForm from '../components/chat/ChatForm';
import ChatHeading from '../components/chat/ChatHeading';
import { connectToSocket, disconnectFromSocket, loadRooms } from '../redux/actions/chatActions';
import { connect } from 'react-redux';
import EmptyChat from '../components/chat/EmptyChat';
import ChatPanel from '../components/chat/ChatPanel';
import AddChat from '../components/chat/AddChat';
import ChatInfo from '../components/chat/ChatInfo';

class Chat extends Component {
    async componentDidMount() {
        const rooms = await this.props.loadRooms(this.props.token);
        const userId = this.props.user._id;
        this.props.connectToSocket(rooms, userId);
    }

    componentWillUnmount() {
        const userId = this.props.user._id;
        this.props.disconnectFromSocket(userId);
    }

    state = { addChat: false }

    toggleVisible = () => {
        this.setState({ addChat: !this.state.addChat })
    }

    render() { 
        const { currentChatRoom } = this.props;
        return (
            <div className="chat-container-main custom-scroll">
                <AddChat visible={this.state.addChat} addChatToggle={this.toggleVisible}/>
                <ChatPanel addChatToggle={this.toggleVisible}/>
                <div className="chat-main">
                    {currentChatRoom === null ? 
                        <EmptyChat/> : <>
                                <ChatHeading/>              
                                <ChatBox/>
                                <ChatForm/>
                          </>
                    }
                </div>
                <ChatInfo/>
            </div>
        );
    }
}
 
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        currentChatRoom: state.chat.currentChatRoom,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, { connectToSocket, disconnectFromSocket, loadRooms })(Chat);