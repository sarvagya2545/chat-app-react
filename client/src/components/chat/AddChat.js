import React, { Component } from "react";
import cx from "classnames";
import goBack from "../../images/go_back.svg";
import PeopleSearch from "./PeopleSearch";
import axios from "axios";

class AddChat extends Component {
    state = {
        searchedPeople: [],
        selectedPeople: [],
        searchTerm: "",
    };

    completeUserList = [];

    componentDidMount() {
        axios.get('/users/all')
            .then(res => {
                this.setState({ searchedPeople: res.data.users })
                this.completeUserList = res.data.users;
            })
            .catch(err => console.log(err))
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
                {this.state.selectedPeople.length !== 0 ? (
                    <button className="btn btn-create-room">
                        Create Room
                    </button>
                ): null}
            </div>
        );
    }
}

export default AddChat;
