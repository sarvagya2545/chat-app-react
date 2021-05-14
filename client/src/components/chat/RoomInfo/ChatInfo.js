import React, { Component } from 'react';
import Pfp from '../User/Pfp';
import pfp from '../../../images/pfp.svg';
import closeBtn from '../../../images/close_btn.svg';
import Participant from './Participant';
import LeaveIcon from '../../../images/leave_room.svg';
import { connect } from 'react-redux';
import { exitChatRoom } from '../../../redux/actions/chatActions';
import { closeInfoPanel } from '../../../redux/actions/uiActions';
import cx from 'classnames';

class ChatInfo extends Component {

    closePanel = e => {
        this.props.closeInfoPanel()
    }

    peopleOnline = () => {
        const arrayLength = this.props.onlinePeopleInChatIds.length;
        return arrayLength > 0 ? arrayLength - 1 : 0;
    }

    getStatus = (personId) => {
        return this.props.onlinePeopleInChatIds.includes(personId) ? "online" : "offline"
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
                    <Pfp pfp={pfp} size="xl" input group src={this.props.src}/>                    
                    <h1>{this.props.currentRoomName}</h1>
                </div>

                <div className="participants">
                    <p>{this.peopleOnline()} people online except you</p>
                    <ul>
                        {this.props.peopleInChat
                            .map((person,index) => (
                                <Participant
                                    status={this.getStatus(person.id)} 
                                    name={person.username} 
                                    key={index}
                                    src={person.pfp}
                                />
                            ))}
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
    const currentRoomId = state.chat.currentChatRoom;
    const peopleInRoomIds = state.chat.chatRoomsObject[currentRoomId] ? 
                            state.chat.chatRoomsObject[currentRoomId].people : null;
    const peopleList = state.chat.peopleList;
    const peopleInChat = [];
    
    for(let person in peopleList) {
        if(peopleInRoomIds && peopleInRoomIds.includes(person)) {
            peopleInChat.push(peopleList[person])
        }
    }

    const onlinePeopleIds = state.chat.onlineUserIds;
    const onlinePeopleInChatIds = peopleInRoomIds ? peopleInRoomIds.filter(personInRoomId => onlinePeopleIds.includes(personInRoomId)) : []

    return {
        infoPanelOpen: state.ui.infoPanelOpen,
        currentRoomId: state.chat.currentChatRoom,
        peopleInChat,
        onlinePeopleInChatIds,
        currentRoomName: state.chat.chatRoomsObject[currentRoomId] ? 
                    state.chat.chatRoomsObject[currentRoomId].roomName : null,
        src: state.chat.chatRoomsObject[currentRoomId]?.pfpUrl
    }
}
 
export default connect(mapStateToProps ,{ exitChatRoom, closeInfoPanel })(ChatInfo);