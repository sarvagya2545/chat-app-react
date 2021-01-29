import axios from 'axios';
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';

class PasswordChange extends Component {
  state = {
    loading: false,
    valid: false
  }

  componentDidMount() {
    const token = new URLSearchParams(this.props.location.search).get("token");
    const userId = this.props.match.params.id;

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    this.setState({ loading: true })

    axios.post(`/api/users/pw_chng/${userId}?token=${token}`, {}, config)
      .then(res => console.log(res))
      .catch(err => console.log(err));
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

    return (<h1>Password change</h1>);
  }
}
 
export default withRouter(PasswordChange);