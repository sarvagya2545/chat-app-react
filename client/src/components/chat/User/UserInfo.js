import React, { Component } from 'react';
import cx from 'classnames';
import goBack from '../../../images/go_back.svg';
import Pfp from './Pfp';
import pfp from '../../../images/pfp.svg';
import { connect } from 'react-redux';
import { sendResetPasswordLink } from '../../../redux/actions/authActions';
import Switch from '../../utils/Switch';

class UserInfo extends Component {
  state = {
    msg: '',
    msgStatus: 0
  }

  // 0 -> normal, 1 -> success, 2 -> error
  colors = ['black', 'green', 'red']

  changeMessage = (newMsg, isErr) => {
    this.setState({ msg: newMsg, msgStatus: isErr ? 2 : 1 });

    setTimeout(() => {
      this.setState({ msg: '', msgStatus: 0 });
    }, 2500);
  }

  changePasswordClick = e => {
    e.preventDefault();
    this.props.sendResetPasswordLink(this.props.email, this.changeMessage);
  }

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
          <Pfp pfp={pfp} size="xl" input username={username} src={this.props.src} />
          <h3>{username}</h3>
          <p>{email}</p>
          <div className="actions">
            <h2>User Actions</h2>
            <p style={{ color: this.colors[this.state.msgStatus], fontSize: '14px' }}>{this.state.msg}</p>
            <div>
              {this.props.method === 'local' && (
                <>
                  <h4>Password settings:</h4>
                  <button className="btn btn-submit" onClick={this.changePasswordClick}>Change Password</button>
                </>
              )}
            </div>
            {/* <div>
              <h4>Notification settings:</h4>
              <div className="notification">
                <Switch label={""} onClick={() => console.log('Halo')} checkedDefault={true}>
                  Notifications on or not?
                  </Switch>
                <Switch label={""} onClick={() => console.log('Notif')} disabled checkedDefault={false}>
                  Allow push notifications on desktop?
                  </Switch>
              </div>
            </div> */}
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
    src: state.auth.user.pfpUrl,
    method: state.auth.user.config.method
  }
}

export default connect(mapStateToProps, { sendResetPasswordLink })(UserInfo);