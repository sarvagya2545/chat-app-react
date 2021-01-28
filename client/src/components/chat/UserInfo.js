import React, { Component } from 'react';
import cx from 'classnames';
import goBack from '../../images/go_back.svg';

class UserInfo extends Component {
  render() { 
    return (
      <div className={cx("user-info", { "hidden": !this.props.visible })}>
        <div className="user-info-header">
            <button className="btn close-btn" onClick={this.props.userInfoToggle}>
                <img src={goBack} alt="" />
            </button>
            <div className="header">User Info</div>
        </div>
      </div>
    );
  }
}
 
export default UserInfo;