import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { getMessagesOfRoom } from '../../redux/actions/chatActions';

class ChatBox extends Component {
    async componentDidMount() {
        this.scrollToBottom();
        await this.getMessagesOfRoom()
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    async componentDidUpdate() {
        this.scrollToBottom();
        await this.getMessagesOfRoom();
    }

    async getMessagesOfRoom() {
        const { token, roomId, messages: { messageLoad } } = this.props;

        console.log('hello')

        if(messageLoad){
            await this.props.getMessagesOfRoom({ token, roomId });
        }
    }

    isMine(by) {
        return by === this.props.username
    }

    render() { 
        const { messages: { messages, messageLoad } } = this.props;
        return (
            <div className="chat-box">
                {!messageLoad && messages.map((message,index) => (
                    <Message 
                        isMine={this.isMine(message.by)} 
                        text={message.text} 
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
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
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
        roomId: state.chat.currentChatRoom
    }
}

export default connect(mapStateToProps, { getMessagesOfRoom })(ChatBox);