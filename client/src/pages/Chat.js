import React, { Component } from 'react';
import ChatBox from '../components/chat/ChatBox';
import ChatForm from '../components/chat/ChatForm';
import ChatHeading from '../components/chat/ChatHeading';
import { connectToSocket, disconnectFromSocket, loadRooms, getMessagesOfRoom } from '../redux/actions/chatActions';
import { addFiles } from '../redux/actions/fileActions';
import { connect } from 'react-redux';
import EmptyChat from '../components/chat/EmptyChat';
import ChatPanel from '../components/chat/ChatPanel';
import AddChat from '../components/chat/AddChat';
import ChatInfo from '../components/chat/ChatInfo';
import UserInfo from '../components/chat/UserInfo';
import AttachmentMenu from '../components/chat/AttachmentMenu';
import SharePanel from '../components/chat/SharePanel';
import cx from 'classnames';
import DragOver from '../components/chat/DragOver';

class Chat extends Component {
    async componentDidMount() {
        const rooms = await this.props.loadRooms(this.props.token);
        const userId = this.props.user._id;
        this.props.connectToSocket(rooms, userId);
        await this.loadMessagesOfRooms();
    }

    loadMessagesOfRooms = () => {
        const { chatRoomsObject } = this.props;
        Object.values(chatRoomsObject).forEach(async room => {
            await this.props.getMessagesOfRoom({ roomId: room.roomId, token: this.props.token })
        })
    }

    componentWillUnmount() {
        const userId = this.props.user._id;
        this.props.disconnectFromSocket(userId);
    }

    state = { addChat: false, userInfo: false, draggingOver: false }

    addChatToggle = () => {
        this.setState({ addChat: !this.state.addChat })
    }

    userInfoToggle = () => {
        this.setState({ userInfo: !this.state.userInfo })
    }

    onDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        if(!this.state.draggingOver) {
            // console.log('Dragging over');
            this.setState({ draggingOver: true });
        }
    }

    onDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();

        // console.log('Leaving');
        this.setState({ draggingOver: false });
    }

    onDrop = e => {
        e.preventDefault();
        this.setState({ draggingOver: false });
        // console.log('Dropped', e.dataTransfer.files);
        this.props.addFiles(e.dataTransfer.files, this.props.currentChatRoom);
    }

    render() { 
        const { currentChatRoom, files } = this.props;
        return (
            <div className="chat-container-main custom-scroll">
                <AddChat visible={this.state.addChat} addChatToggle={this.addChatToggle}/>
                <UserInfo visible={this.state.userInfo} userInfoToggle={this.userInfoToggle}/>
                <ChatPanel addChatToggle={this.addChatToggle} userInfoToggle={this.userInfoToggle}/>
                <div className={cx("chat-main", { "visible" : currentChatRoom !== null })}>
                    {currentChatRoom === null ? 
                        <EmptyChat/> : <>
                                <ChatHeading/>              
                                <ChatBox onDragOver={this.onDragOver} onDragEnter={this.onDragEnter} />
                                <ChatForm/>
                                {files && files.length !== 0 && <SharePanel/>}
                                {this.state.draggingOver && <DragOver onDragLeave={this.onDragLeave} onDrop={this.onDrop}/>}
                        </>
                    }
                    <AttachmentMenu/>
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
        token: state.auth.token,
        files: state.files.filesObject[state.chat.currentChatRoom],
        chatRoomsObject: state.chat.chatRoomsObject
    }
}

export default connect(mapStateToProps, { 
    connectToSocket, disconnectFromSocket, loadRooms, getMessagesOfRoom, addFiles
})(Chat);