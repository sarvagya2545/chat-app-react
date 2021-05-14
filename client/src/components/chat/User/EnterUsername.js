import React, { Component } from 'react';
import axios from 'axios';
import { tokenConfig } from '../../../redux/actions/authActions';
import { GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';
import { USERNAME_UPDATE } from '../../../redux/actions/types';
import store from '../../../redux/store';

class EnterUsername extends Component {
  state = {
    username: '',
    errors: {
      isError: false,
      msg: ''
    }
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value, errors: { isError: false, msg: '' } });
    
  }

  submitUserName = async (e) => {
    e.preventDefault();
    const config = tokenConfig();
    axios.patch(`/api/users/username/update`, { username: this.state.username },config)
      .then(res => {
        if(res.status === 200) {
          store.dispatch({ type: USERNAME_UPDATE, payload: res.data.username })
          // console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({
          errors: {
            isError: true,
            msg: err.response.data.errors ? err.response.data.errors.username : err.response.data.error
          }
        })
      });
  }

  render() {
    return (
      <div className="enter-username">
        <form className="form" onSubmit={this.submitUserName}>
          <h3>Enter a unique username</h3>
          <p>You can use the app once you create a username</p>
          <div className="form-group">
              <input type="text" name="username" className="input" placeholder="Enter a unique username" value={this.state.username} onChange={this.onChangeHandler}/> 
              <label htmlFor="username">Username</label>
          </div>
          {this.state.errors.isError ? (<p className="err-text">{this.state.errors.msg}</p>) : null}
          <button 
            className="btn btn-with-disabled btn-change-username btn-col-primary"
            disabled={this.state.username.trim() === ''}
          >
            CREATE
          </button>
          <GoogleLogout
            clientId="962267269360-1t0fcfnl8hjbg94gpr96kq6p3pljlbg2.apps.googleusercontent.com"
            buttonText="Log Out"
            onLogoutSuccess={this.props.logout}
            render={renderProps => (
              <button className="btn btn-submit" onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</button>
            )}
          />
        </form>
      </div>
    );
  }
}


export default connect(null, { logout })(EnterUsername);