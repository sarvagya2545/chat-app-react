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
                    <h1>{this.props.currentRoomName}</h1>
                </div>

                <div className="participants">
                    <p>{3} people online</p>
                    <ul>
                        {this.props.peopleInChat.map((person,index) => <Participant name={person.username} key={index}/>)}
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
    const peopleInRoomIds = state.chat.chatRoomsObject[currentRoomId] ? 
                            state.chat.chatRoomsObject[currentRoomId].people : null;
    const peopleList = state.chat.peopleList;
    const peopleInChat = [];
    
    for(let person in peopleList) {
        if(peopleInRoomIds && peopleInRoomIds.includes(person)) {
            peopleInChat.push(peopleList[person])
        }
    }

    return {
        infoPanelOpen: state.ui.infoPanelOpen,
        currentRoomId: currentRoomId,
        peopleInChat,
        currentRoomName: state.chat.chatRoomsObject[currentRoomId] ? 
                    state.chat.chatRoomsObject[currentRoomId].roomName : null
    }
}
 
export default connect(mapStateToProps ,{ exitChatRoom, closeInfoPanel })(ChatInfo);