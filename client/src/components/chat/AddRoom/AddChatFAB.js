import React, { Component } from 'react';
import addImage from '../../../images/add_img.svg';

class AddChatFAB extends Component {
    render() { 
        return (
            <button className="btn btn-add-chat-fab" onClick={this.props.addChatToggle}>
                <img src={addImage} alt="add"/>
            </button>
        );
    }
}
 
export default AddChatFAB;