import React, { Component } from 'react';
import { connect } from 'react-redux';
import pfp from '../../../images/pfp.svg';
import addImage from '../../../images/add_img.svg';
import { logout } from '../../../redux/actions/authActions';
import DropDown from '../../utils/DropDown';

class ChatPanelHeader extends Component {
    
    logoutClick = e => {
        this.props.logout()
    }

    listOfItems = [
        {
            text: 'Logout',
            callback: () => this.logoutClick(),
            close: true
        }
    ];

    render() {
        const { username, email } = this.props;

        return (
            <div className="chat-panel-header">
                <div className="pfp" onClick={this.props.userInfoToggle}>
                    <img src={this.props.src || pfp} alt="pfp" className="pfp-img" />
                </div>
                <div className="person-info person-info-responsive" onClick={this.props.userInfoToggle}>
                    <p className="username">{username}</p>
                    <p className="email">{email}</p>
                </div>
                <div className="btn-add-chat" onClick={this.props.addChatToggle}>
                    <img src={addImage} alt="add"/>
                </div>
                <DropDown
                    listOfItems={this.listOfItems}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.user.auth.username,
        email: state.auth.user.auth.email,
        src: state.auth.user.pfpUrl
    }
}

export default connect(mapStateToProps, { logout })(ChatPanelHeader);