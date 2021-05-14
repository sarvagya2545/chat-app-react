import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openInfoPanel } from '../../../redux/actions/uiActions';

class ChatPerson extends Component {

    getAllPeopleString() {
        let str = '';
        const { peopleList, peopleInRoomIds } = this.props;
        // console.log(peopleList)
        for(let person in peopleList) {
            if(peopleInRoomIds.includes(person))
                str = str !== '' ? `${str}, ${peopleList[person].username}` : `${peopleList[person].username}`
        }
        str = `You, ${str}`
        return str
    }

    render() { 
        const { roomName, isTyping, typingUser } = this.props;
        return (
            <div className="chat-person" onClick={e => this.props.openInfoPanel()}>
                <h3 className="chat-person-name">{roomName}</h3>
                <p className="chat-person-status">{isTyping ? `${typingUser} is typing...` : `${this.getAllPeopleString()}`}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const roomsObject = state.chat.chatRoomsObject
    const currentChatRoom = state.chat.currentChatRoom
    const isTyping = roomsObject[currentChatRoom].typing
    const peopleInRoomIds = roomsObject[currentChatRoom].people

    return {
        roomName: roomsObject[currentChatRoom] ? roomsObject[currentChatRoom].roomName : 'undefined',
        isTyping: isTyping,
        typingUser: isTyping ? isTyping.user : null,
        peopleList: state.chat.peopleList,
        peopleInRoomIds
    }
}

export default connect(mapStateToProps, { openInfoPanel })(ChatPerson);