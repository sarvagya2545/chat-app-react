import React, { Component } from "react";
import cx from "classnames";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

class LoginOrSignUp extends Component {
  componentDidMount() {
    // get the token from localStorage
    // if no token, show login screen
    // if token is found, get the user details and log in
  }

  state = {
    // screen => 1 for login, 2 for signup
    screen: 2,
  };

  setScreen = (screen) => this.setState({ screen });

  render() {
    return (
      <div className="login-or-signup">
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

export default LoginOrSignUp;
