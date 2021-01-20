import React, { Component } from 'react';
import { connect } from 'react-redux';
import pfp from '../../images/pfp.svg';
import addImage from '../../images/add_img.svg';
import { logout } from '../../redux/actions/authActions';

class ChatPanelHeader extends Component {
    
    logoutClick = e => {
        e.preventDefault()
        this.props.logout()
    }

    render() {
        const { username, email } = this.props;

        return (
            <div className="chat-panel-header">
                <div className="pfp">
                    <img src={pfp} alt="pfp" className="pfp-img" />
                </div>
                <div className="person-info">
                    <p className="username">{username}</p>
                    <p className="email">{email}</p>
                </div>
                <button onClick={this.logoutClick}>Logout</button>
                <div className="btn-add-chat" onClick={this.props.addChatToggle}>
                    <img src={addImage} alt="add"/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.user.auth.username,
        email: state.auth.user.auth.email
    }
}

export default connect(mapStateToProps, { logout })(ChatPanelHeader);