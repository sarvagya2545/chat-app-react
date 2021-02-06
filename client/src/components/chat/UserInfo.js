import React, { Component } from 'react';
import cx from 'classnames';
import goBack from '../../images/go_back.svg';
import Pfp from './Pfp';
import pfp from '../../images/pfp.svg';
import { connect } from 'react-redux';

class UserInfo extends Component {
  render() { 
    const { username, email } = this.props;
    return (
      <div className={cx("user-info", { "hidden": !this.props.visible })}>
        <div className="user-info-header">
            <button className="btn close-btn" onClick={this.props.userInfoToggle}>
                <img src={goBack} alt="" />
            </button>
            <div className="header">User Info</div>
        </div>
        <div className="user-main-details">
            <Pfp pfp={pfp} size="xl" input username={username} src={this.props.src}/>
            <h3>{username}</h3>
            <p>{email}</p>
            <div className="actions">
              <h2>User Actions</h2>
              <button className="btn btn-submit">Change Password</button>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.user.auth.username,
    email: state.auth.user.auth.email,
    src: state.auth.user.pfpUrl
  }
}
 
export default connect(mapStateToProps)(UserInfo);