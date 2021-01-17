import React, { Component } from 'react';
import ChatRoomListItem from './ChatRoomListItem';

class Participant extends Component {
    render() { 
        return (
            <ChatRoomListItem message="status" name={this.props.name}/>
        );
    }
}
 
export default Participant;