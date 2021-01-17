import React, { Component } from 'react';
// import Avatar from '../../images/avatar.jpg'
import pfp from '../../images/pfp.svg';
import ChatPerson from '../chat/ChatPerson';
import threedots from '../../images/3dots.svg';
import cx from 'classnames';
import { connect } from 'react-redux';
import { openInfoPanel } from '../../redux/actions/uiActions';
import { exitChatRoom } from '../../redux/actions/chatActions';

class ChatHeading extends Component {
    state = { isDropDown: false }

    roomInfoClickHandler = e => {
        this.props.openInfoPanel();
        this.setState({ isDropDown: false })
    }

    exitClickHandler = e => {
        this.props.exitChatRoom(this.props.currentRoomId, this.props.currentRoomName)
    }

    render() { 
        return (
            <div className="chat-heading">
                <div className="pfp">
                    <img src={pfp} alt="pfp" className="pfp-img"/>
                </div>
                <ChatPerson/>
                <div 
                    className={cx('three-dots', 'custom-dropdown', { 'hidden': !this.state.isDropDown })}
                >
                    <img 
                        src={threedots} alt="menu"
                        onClick={e => this.setState({ isDropDown: !this.state.isDropDown })}
                    />
                    <div className="list">
                        <button className="btn" onClick={this.roomInfoClickHandler}>Room Info</button>
                        <button className="btn" onClick={this.exitClickHandler}>Exit</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const currentRoomId = state.chat.currentChatRoom
    return {
        currentRoomId: currentRoomId,
        currentRoomName: state.chat.chatRoomsObject[currentRoomId] ? 
                    state.chat.chatRoomsObject[currentRoomId].roomName : null
    }
}
 
export default connect(mapStateToProps, { openInfoPanel, exitChatRoom })(ChatHeading);