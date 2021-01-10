import React, { Component } from 'react';
import cx from 'classnames';
import goBack from '../../images/go_back.svg';
import PeopleSearch from './PeopleSearch';

class AddChat extends Component {
    render() { 
        return (
            <div className={cx("add-chat", { "hidden": !this.props.visible })}>
                <div className="add-chat-header">
                    <button className="btn close-btn" onClick={this.props.addChatToggle}>
                        <img src={goBack} alt=""/>
                    </button>
                    <div className="header">New Chat</div>
                </div>
                <form className="chat-form chat-form-search">
                    <input type="text" className="input-send" placeholder="Search people"/>
                </form>
                <PeopleSearch/>
            </div>
        );
    }
}
 
export default AddChat;