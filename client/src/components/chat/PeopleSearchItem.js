import React, { Component } from 'react';
import Pfp from '../chat/Pfp';
import pfp from '../../images/pfp.svg';
import cx from 'classnames';

class PeopleSearchItem extends Component {
    state = {
        selected: false
    }

    onClickHandler = e => {
        this.setState({ selected: !this.state.selected })
    }

    render() { 
        return (
            <li 
                className={cx("people-search-item", { "selected": this.state.selected })}
                onClick={this.onClickHandler}
            >
                <Pfp pfp={pfp} size="md"/>
                <div className="chat-room-item-details">
                    <div>
                        <p>{this.props.name || "Name"}</p>
                        <span>{this.props.email || "Email"}</span>
                    </div>
                </div>
            </li>
        );
    }
}
 
export default PeopleSearchItem;