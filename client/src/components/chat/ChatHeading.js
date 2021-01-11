import React, { Component } from 'react';
// import Avatar from '../../images/avatar.jpg'
import pfp from '../../images/pfp.svg';
import ChatPerson from '../chat/ChatPerson';
import LeaveIcon from '../../images/leave_room.svg';
import { connect } from 'react-redux';
import { exitChatRoom } from '../../redux/actions/chatActions';

class ChatHeading extends Component {
    state = {  }
    render() { 
        return (
            <div className="chat-heading">
                <div className="pfp">
                    <img src={pfp} alt="pfp" className="pfp-img"/>
                </div>
                <ChatPerson/>
                <div className="exit" onClick={e => this.props.exitChatRoom(this.props.currentRoomId, this.props.currentRoomName)}>
                    <img src={LeaveIcon} alt="leave room"/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const currentRoomId = state.chat.currentChatRoom
    return {
        currentRoomId: currentRoomId,
        currentRoomName: state.chat.chatRoomsObject[currentRoomId].roomName
    }
}
 
export default connect(mapStateToProps, { exitChatRoom })(ChatHeading);