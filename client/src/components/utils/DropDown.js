import React, { Component } from "react";
import cx from "classnames";
import threedots from "../../images/3dots.svg";

class DropDown extends Component {
    state = { isDropDown: false };

    handleClick = (item) => {
        item.callback();
        if (item.close) {
            this.setState({ isDropDown: false });
        }
    };

    render() {
        return (
            <div
                className={cx("three-dots", "custom-dropdown", {
                    hidden: !this.state.isDropDown,
                })}
            >
                <img
                    src={threedots}
                    alt="menu"
                    onClick={(e) => this.setState({ isDropDown: !this.state.isDropDown })}
                />
                <div className="list">
                    {this.props.listOfItems.map((item, index) => {
                        return (
                            <button
                                className="btn"
                                key={index}
                                onClick={(e) => this.handleClick(item)}
                            >
                                {item.text}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default DropDown;
