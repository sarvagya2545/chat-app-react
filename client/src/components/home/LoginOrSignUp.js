import React, { Component } from "react";
import cx from "classnames";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

class LoginOrSignUp extends Component {
  state = {
    // screen => 1 for login, 2 for signup
    screen: 2,
  };

  setScreen = (screen) => this.setState({ screen });

  render() {
    const { isLoading } = this.props;

    return (
      <div className="login-or-signup">
        {isLoading && (<>
          <div className="loader-bg"></div>
          <div className="loader">
            <Loader
              type="TailSpin"
            />
          </div>
        </>)}
        <div className="tab-group">
          <button onClick={() => this.setScreen(2)} className={cx("tab", { "tab-active": this.state.screen === 2 })}>
            Sign Up
          </button>
          <button onClick={() => this.setScreen(1)} className={cx("tab", { "tab-active": this.state.screen === 1 })}>
            Log In
          </button>
        </div>
        {this.state.screen === 1 ? <LoginForm/> : <SignUpForm/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading
  }
}

export default connect(mapStateToProps)(LoginOrSignUp);
