import React, { Component } from 'react';
import Pfp from './Pfp';
import pfp from '../../images/pfp.svg';
import closeBtn from '../../images/close_btn.svg';
import Participant from './Participant';
import LeaveIcon from '../../images/leave_room.svg';
import { connect } from 'react-redux';
import { exitChatRoom } from '../../redux/actions/chatActions';
import { closeInfoPanel } from '../../redux/actions/uiActions';
import cx from 'classnames';

class ChatInfo extends Component {

    closePanel = e => {
        this.props.closeInfoPanel()
    }

    render() { 
        return (
            <div className={cx("group-chat-status", { "visible": this.props.infoPanelOpen })}>
                <div className="group-info-header">
                    <button className="btn" onClick={this.closePanel}>
                        <img src={closeBtn} alt="close"/>
                    </button>
                    Group Info
                </div>

                <div className="group-main-details">
                    <Pfp pfp={pfp} size="xl"/>                    
                    <h1>{"Group Name"}</h1>
                </div>

                <div className="participants">
                    <ul>
                        <Participant/>
                        <Participant/>
                        <Participant/>
                        <Participant/>
                    </ul>
                </div>

                <div className="exit-group">
                    <div className="exit" onClick={e => this.props.exitChatRoom(this.props.currentRoomId, this.props.currentRoomName)}>
                        <img src={LeaveIcon} alt="leave room"/>
                        <p>Leave Room</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const currentRoomId = state.chat.currentChatRoom
    return {
        infoPanelOpen: state.ui.infoPanelOpen,
        currentRoomId: currentRoomId,
        currentRoomName: state.chat.chatRoomsObject[currentRoomId] ? 
                    state.chat.chatRoomsObject[currentRoomId].roomName : null
    }
}
 
export default connect(mapStateToProps ,{ exitChatRoom, closeInfoPanel })(ChatInfo);