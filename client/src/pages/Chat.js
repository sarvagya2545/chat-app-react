import React, { Component, useEffect, useState } from 'react';
import ChatBox from '../components/chat/ChatInterface/ChatBox';
import ChatForm from '../components/chat/ChatInterface/ChatForm';
import ChatHeading from '../components/chat/ChatInterface/ChatHeading';
import { connectToSocket, disconnectFromSocket, getMessagesOfRoom } from '../redux/actions/chatActions';
import { addFiles } from '../redux/actions/fileActions';
import { connect } from 'react-redux';
import EmptyChat from '../components/chat/ChatInterface/utils/EmptyChat';
import ChatPanel from '../components/chat/Rooms/ChatPanel';
import AddChat from '../components/chat/AddRoom/AddChat';
import ChatInfo from '../components/chat/RoomInfo/ChatInfo';
import UserInfo from '../components/chat/User/UserInfo';
import AttachmentMenu from '../components/chat/ChatInterface/AttachmentMenu';
import SharePanel from '../components/chat/ChatInterface/SharePanel';
import cx from 'classnames';
import DragOver from '../components/chat/ChatInterface/utils/DragOver';
import usePushNotifications from '../hooks/usePushNotifications';

const Chat = (props) => {
    const initState = { addChat: false, userInfo: false, draggingOver: false }
    const [state, setState] = useState(initState);
    const [ subscriptionId ] = usePushNotifications();

    useEffect(() => {
        const loadMessagesOfRooms = () => {
            const { chatRoomsObject } = props;
            Object.values(chatRoomsObject).forEach(async room => {
                try {
                    // console.log('room', room);
                    await props.getMessagesOfRoom({ roomId: room.roomId, token: props.token })
                } catch (error) {
                    console.log(error);
                }
            })
        }

        // IIFE to use async await inside useEffect.
        // more info: 
        // https://javascript.plainenglish.io/how-to-use-async-function-in-react-hook-useeffect-typescript-js-6204a788a435
        (async () => {
            // component mount
            const userId = props.user._id;
            props.connectToSocket(Object.values(props.chatRoomsObject), userId);
            await loadMessagesOfRooms();
        })();

        return () => {
            // component unmount
            const userId = props.user._id;
            props.disconnectFromSocket(userId);
        }
    }, [])


    const addChatToggle = () => {
        setState({ addChat: !state.addChat })
    }

    const userInfoToggle = () => {
        setState({ userInfo: !state.userInfo })
    }

    const onDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!state.draggingOver) {
            // console.log('Dragging over');
            setState({ draggingOver: true });
        }
    }

    const onDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();

        // console.log('Leaving');
        setState({ draggingOver: false });
    }

    const onDrop = e => {
        e.preventDefault();
        setState({ draggingOver: false });
        // console.log('Dropped', e.dataTransfer.files);
        props.addFiles(e.dataTransfer.files, props.currentChatRoom);
    }

    const { currentChatRoom, files } = props;
    return (
        <div className="chat-container-main custom-scroll">
            <AddChat visible={state.addChat} addChatToggle={addChatToggle} />
            <UserInfo visible={state.userInfo} userInfoToggle={userInfoToggle} />
            <ChatPanel addChatToggle={addChatToggle} userInfoToggle={userInfoToggle} />
            <div className={cx("chat-main", { "visible": currentChatRoom !== null })}>
                {currentChatRoom === null ?
                    <EmptyChat /> : <>
                        <ChatHeading />
                        <ChatBox onDragOver={onDragOver} />
                        <ChatForm />
                        {files && files.length !== 0 && <SharePanel />}
                        {state.draggingOver && <DragOver onDragLeave={onDragLeave} onDrop={onDrop} />}
                    </>
                }
                <AttachmentMenu />
            </div>
            <ChatInfo />
        </div>
    );
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
    connectToSocket, disconnectFromSocket, getMessagesOfRoom, addFiles
})(Chat);