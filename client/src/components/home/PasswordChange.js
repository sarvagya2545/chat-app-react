import axios from 'axios';
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';
import ErrBox from '../utils/ErrBox';
import { connect } from 'react-redux';
import { resetPassword, logout } from '../../redux/actions/authActions';

class PasswordChange extends Component {
  state = {
    loading: false,
    valid: false,
    token: null,
    msg: null,
    email: '',
    newPassword: '',
    confirmPassword: ''
  }

  componentDidMount() {
    this.props.logout();

    const token = new URLSearchParams(this.props.location.search).get("token");
    const userId = this.props.match.params.id;

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    this.setState({ loading: true })

    axios.post(`/api/users/pw_chng/${userId}?token=${token}`, {}, config)
      .then(res => {
        // console.log(res);
        if(res.status === 200) {
          this.setState({ valid: true, token: res.data.newToken, email: res.data.email });
          this.setState({ loading: false });
        }
      })
      .catch(err => {
        // console.log(err.response);
        if(err.response?.status === 401) {
          this.setState({ msg: err.response.data.msg })
          this.setState({ loading: false });
        }
      });


    // set a timeout for the page to lose it's token after 10 mins
    setTimeout(() => {
      this.setState({ token: null, msg: "Timeout! Refresh the page to get tokens back." });
    }, 10 * 60 * 1000)
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = async e => {
    e.preventDefault();
    const { newPassword, confirmPassword, token } = this.state;
    const response = await this.props.resetPassword({ newPassword, confirmPassword, token });
    
    if(response.status === 'OK') {
      this.setState({ token: null, msg: '' })
      alert('Password changed! Now log back in to continue');
      this.props.history.push('/');
    }
  }

  render() { 

    if(this.state.loading) {
      return (<Loader type="TailSpin"/>)
    }

    if(!this.state.valid) {
      return (
        <>
          <h1>Invalid link</h1>
          <p>The link is either expired or broken</p>
          <p>Please try again</p>
        </>
      )
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#999' }}>
        <form 
          className="form" 
          style={{ width: '450px', backgroundColor: '#fff', padding: '4rem', fontFamily: 'Montserrat' }}
          onSubmit={this.onSubmit}
        >
          <h1 style={{ paddingBottom: '1rem' }}>RESET PASSWORD</h1>
          <p style={{ padding: '0 0 1rem' }}>{this.state.email}</p>
          <div className="form-group">
            <input type="password" name="newPassword" className="input" placeholder="Enter new Password" value={this.state.newPassword} onChange={this.onChangeHandler}/> 
            <label htmlFor="password">Enter new Password</label>
          </div>
          <div className="form-group">
            <input type="password" name="confirmPassword" className="input" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChangeHandler}/> 
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
          <button type="submit" className="btn btn-submit">RESET PASSWORD</button>
        </form>
        <ErrBox/>
      </div>
    );
  }
}
 
export default withRouter(connect(null, { resetPassword, logout })(PasswordChange));