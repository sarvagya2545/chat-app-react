import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { closeModal } from '../../redux/actions/uiActions';

class ForgotPassword extends Component {
  state = { emailField: '' }

  onSubmit = e => {
    e.preventDefault();

    // call the api to send a reset link to the email
  }

  onChangeHandler = e => {
    this.setState({ emailField: e.target.value });
  }

  closeBtnHandler = e => {
    this.props.closeModal();
    this.setState({ emailField: '' })
  }

  render() { 
    return (
      <div className={cx("popup-container", { "hidden": !this.props.modalOpen })}>
        <div className="popup">
          <div className="btn btn-close close" onClick={this.closeBtnHandler}>&#x2716;</div>
          <div className="forgot-password-text">
            <h1>Forgot Password?</h1>
            <p>Don't worry! You will recieve an email with the link to reset your password.</p>
          </div>
          <form className="form" onSubmit={this.onSubmit}>
            <div className="form-group">
                <input type="email" name="email" className="input" placeholder="Email" value={this.state.emailField} onChange={this.onChangeHandler}/> 
                <label htmlFor="email">Enter Email</label>
            </div>
            <button type="submit" className="btn btn-submit btn-with-disabled btn-forgot-password btn-col-primary" disabled={this.state.emailField.trim() === ""}>
              Send Link
            </button>
          </form>
        </div>
      </div>
    );
  }
}
 
const mapStateToProps = state => {
  return {
    modalOpen: state.ui.modalOpen
  }
}

export default connect(mapStateToProps, { closeModal })(ForgotPassword);