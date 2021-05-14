import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { getMessagesOfRoom } from '../../../redux/actions/chatActions';

class ChatBox extends Component {

    messagesEnd = React.createRef();

    async componentDidMount() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEnd.current.scroll({ top: this.messagesEnd.current.scrollHeight, behavior: 'smooth' });
    }

    async componentDidUpdate() {
        this.scrollToBottom();
    }

    isMine(by) {
        return by === this.props.username
    }

    render() {
        const { messages: { messages, messageLoad }, onDragOver } = this.props;
        return (
            <div
                className="chat-box"
                ref={this.messagesEnd}
                onDragOver={onDragOver}
            >
                {!messageLoad && messages && messages.map((message, index) => (
                    <Message
                        isMine={this.isMine(message.by)}
                        content={message.content}
                        time={message.time}
                        name={message.by}
                        key={index}
                    />
                ))}
                {messageLoad && (<>
                    <div className="loader">
                        <Loader
                            type="TailSpin"
                        />
                    </div>
                </>)}
                <div style={{ float: "left", clear: "both" }}>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const currentChatRoom = state.chat.currentChatRoom
    return {
        messages: state.chat.chatRoomsObject[currentChatRoom].messages,
        username: state.auth.user.auth.username,
        token: state.auth.token,
    }
}

export default connect(mapStateToProps, { getMessagesOfRoom })(ChatBox);