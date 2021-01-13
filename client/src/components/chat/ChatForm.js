import React, { Component } from 'react';
import sendImg from '../../images/send_img.svg';
import { connect } from 'react-redux';
import { sendMessage } from '../../redux/actions/chatActions';

class ChatForm extends Component {
    state = { message: '' }

    sendMessage = e => {
        e.preventDefault();
        console.log(this.state.message)
        this.props.sendMessage({ room: this.props.room, message: this.state.message, userName: this.props.username });

        this.setState({ message: '' })
    }

    render() { 
        return (
            <form className="chat-form" onSubmit={e => this.sendMessage(e)}>
                <input 
                    type="text" 
                    className="input-send" 
                    placeholder="Type your message..."
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                />
                <button className="btn-send">
                    <img src={sendImg} alt="send"/>
                </button>
            </form>
        );
    }
}
 
const mapStateToProps = state => {
    return {
        room: state.chat.currentChatRoom,
        username: state.auth.user.auth.username
    }
}

export default connect(mapStateToProps, { sendMessage })(ChatForm);