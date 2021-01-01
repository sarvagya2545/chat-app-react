import React, { Component } from 'react';
import sendImg from '../../images/send_img.svg';

class ChatForm extends Component {
    state = {  }
    render() { 
        return (
            <form className="chat-form">
                <input type="text" className="input-send" placeholder="Type your message..."/>
                <button className="btn-send">
                    <img src={sendImg} alt="send"/>
                </button>
            </form>
        );
    }
}
 
export default ChatForm;