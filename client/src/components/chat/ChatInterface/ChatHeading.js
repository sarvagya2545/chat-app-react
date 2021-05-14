import React, { Component } from 'react';
// import Avatar from '../../images/avatar.jpg'
import pfp from '../../../images/pfp.svg';
import ChatPerson from './ChatPerson';
import { connect } from 'react-redux';
import { openInfoPanel } from '../../../redux/actions/uiActions';
import { exitChatRoom, closeCurrentRoom } from '../../../redux/actions/chatActions';
import DropDown from '../../utils/DropDown';
import goBack from '../../../images/go_back.svg';

class ChatHeading extends Component {
    listOfItems = [
        {
            text: 'Room Info',
            callback: () => this.props.openInfoPanel(),
            close: true
        },
        {
            text: 'Exit room',
            callback: () => this.props.exitChatRoom(this.props.currentRoomId, this.props.currentRoomName),
            close: false
        }
    ];

    goBack = e => {
        this.props.closeCurrentRoom();
    }

    render() { 
        return (
            <div className="chat-heading">
                <button className="btn back-btn" onClick={this.goBack}>
                    <img src={goBack} alt="go back"/>
                </button>
                <div className="pfp">
                    <img src={this.props.src || pfp} alt="pfp" className="pfp-img"/>
                </div>
                <ChatPerson/>
                <DropDown
                    listOfItems={this.listOfItems}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const currentRoomId = state.chat.currentChatRoom
    return {
        currentRoomId: currentRoomId,
        currentRoomName: state.chat.chatRoomsObject[currentRoomId]?.roomName,
        src: state.chat.chatRoomsObject[currentRoomId]?.pfpUrl
    }
}
 
export default connect(mapStateToProps, { openInfoPanel, exitChatRoom, closeCurrentRoom })(ChatHeading);