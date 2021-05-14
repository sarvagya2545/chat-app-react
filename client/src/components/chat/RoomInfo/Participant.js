import React, { Component } from 'react';
import ChatRoomListItem from '../Rooms/ChatRoomListItem';

class Participant extends Component {
    render() { 
        return (
            <ChatRoomListItem src={this.props.src} message={this.props.status || "status"} name={this.props.name}/>
        );
    }
}
 
export default Participant;