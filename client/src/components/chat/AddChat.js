import React, { Component } from "react";
import cx from "classnames";
import goBack from "../../images/go_back.svg";
import PeopleSearch from "./PeopleSearch";
import axios from "axios";

class AddChat extends Component {
    state = {
        searchedPeople: [],
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
            return user.username.toLowerCase().includes(e.target.value.toLowerCase()) || user.email.toLowerCase().includes(e.target.value.toLowerCase()) 
        })
        this.setState({ searchTerm: e.target.value ,searchedPeople: filteredUserList })
    }

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
                <PeopleSearch people={this.state.searchedPeople} />
            </div>
        );
    }
}

export default AddChat;
