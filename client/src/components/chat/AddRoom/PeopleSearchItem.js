import React, { Component } from 'react';
import Pfp from '../User/Pfp';
import pfp from '../../../images/pfp.svg';
import cx from 'classnames';

class PeopleSearchItem extends Component {
    onClickHandler = e => {
        this.props.select({ id: this.props.personId, name: this.props.name })
    }

    render() { 
        return (
            <li 
                className={cx("people-search-item", { "selected": this.props.selected })}
                onClick={this.onClickHandler}
            >
                <Pfp pfp={pfp} size="md" src={this.props.pfp}/>
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