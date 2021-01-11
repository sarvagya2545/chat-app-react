import React, { Component } from "react";
import cx from "classnames";
import goBack from "../../images/go_back.svg";
import PeopleSearch from "./PeopleSearch";
import axios from "axios";
import { connect } from 'react-redux';
import { createChatRoom } from '../../redux/actions/chatActions';
import { tokenConfig } from '../../redux/actions/authActions';

class AddChat extends Component {
    state = {
        searchedPeople: [],
        selectedPeople: [],
        searchTerm: "",
        roomName: ""
    };

    completeUserList = [];

    componentDidMount() {
        const config = tokenConfig();
        axios.get('/users/all', config)
            .then(res => {
                console.log(res.data.users);
                this.setState({ searchedPeople: res.data.users })
                this.completeUserList = res.data.users;
            })
            .catch(err => console.log(err))
    }

    onClickHandler = async e => {
        e.preventDefault();

        // add chat room to the database
        const { selectedPeople, roomName } = this.state;
        await this.props.createChatRoom({ selectedPeople, roomName })
        this.props.addChatToggle()
    }

    onChangeHandler = e => {
        const filteredUserList = this.completeUserList.filter(user => {
            const includeUserName = user.username.toLowerCase().includes(e.target.value.toLowerCase())
            const includesEmail = user.email.toLowerCase().includes(e.target.value.toLowerCase())
            return  includeUserName || includesEmail
        })
        this.setState({ searchTerm: e.target.value ,searchedPeople: filteredUserList })
    }

    personIsSelected = (person) => {
        const arr = this.state.selectedPeople;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === person.id) {
                return true;
            }
        }

        return false;
    };

    toggleSelectedPeople = (person) => {
        if (!this.personIsSelected(person)) {
            console.log("push");
            this.setState({ selectedPeople: [...this.state.selectedPeople, person] });
        } else {
            const newArray = this.state.selectedPeople.filter(
                (selectedPerson) => person.id !== selectedPerson.id
            );
            this.setState({
                selectedPeople: newArray,
            });
        }
    };

    render() {
        return (
            <div className={cx("add-chat", { hidden: !this.props.visible })}>
                <div className="add-chat-header">
                    <button className="btn close-btn" onClick={this.props.addChatToggle}>
                        <img src={goBack} alt="" />
                    </button>
                    <div className="header">New Chat</div>
                </div>
                <form className="chat-form chat-form-search">
                    <input
                        type="text"
                        className="input-send"
                        placeholder="Search people"
                        value={this.state.searchTerm}
                        onChange={this.onChangeHandler}
                    />
                </form>
                <PeopleSearch
                    people={this.state.searchedPeople}
                    personIsSelected={this.personIsSelected}
                    toggleSelectedPeople={this.toggleSelectedPeople}
                    selectedPeople={this.state.selectedPeople}
                />
                {/* To be removed and added into another page into the future */}
                <form className="form form-room-name">
                    <div className="form-group">
                        <input 
                            name="roomName"
                            type="text" 
                            className="chat-room-name input"
                            value={this.state.roomName} 
                            onChange={e => this.setState({ roomName: e.target.value })}
                            placeholder="Enter the room name"
                            autoComplete="off"
                        />
                        <label htmlFor="roomName" className="label">Enter your room name:</label>
                    </div>
                </form>
                {this.state.selectedPeople.length !== 0 ? (
                    <button 
                        type="button"
                        className="btn btn-create-room"
                        onClick={this.onClickHandler}
                        disabled={this.state.roomName === "" || this.state.selectedPeople.length === 0}
                    >
                        Create Room
                    </button>
                ): null}
            </div>
        );
    }
}

export default connect(null, { createChatRoom })(AddChat);
