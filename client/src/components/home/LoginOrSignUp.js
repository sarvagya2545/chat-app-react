import React, { Component } from "react";
import cx from "classnames";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { googleLogin } from '../../redux/actions/authActions';
import GoogleLogin from 'react-google-login';
import GoogleIcon from '../../images/google_icon.svg';

class LoginOrSignUp extends Component {
  state = {
    // screen => 1 for login, 2 for signup
    screen: 2,
  };

  setScreen = (screen) => this.setState({ screen });

  onSuccess = (res) => {
    this.props.googleLogin(res);
  }

  onFailure = res => {
    console.log(res);
  } 

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
        <div className="divider">
          OR
        </div>
        <div className="social-login">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login With Google"
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            render={renderProps => (
              <button className="btn btn-google" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <img className="social-icons" src={GoogleIcon} alt="Google"/>
                <p>
                  {this.state.screen === 1 ? "Login with Google" : "Signup with Google"}
                </p>
              </button>
            )}
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading
  }
}

export default connect(mapStateToProps, { googleLogin })(LoginOrSignUp);
