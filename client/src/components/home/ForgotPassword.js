import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { closeModal } from '../../redux/actions/uiActions';
import { sendResetPasswordLink } from '../../redux/actions/authActions';
import Loader from 'react-loader-spinner';

class ForgotPassword extends Component {
  state = { emailField: '' }

  onSubmit = async e => {
    e.preventDefault();

    // call the api to send a reset link to the email
    this.props.sendResetPasswordLink(this.state.emailField.trim())
    this.setState({ emailField: '' })
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
          {this.props.modalLoading ? (
            <Loader type="TailSpin"/>
          ) : (
            <>
              <div className="forgot-password-text">
                <h1>Forgot Password?</h1>
                {this.props.modalStatus !== 1 && <p>Don't worry! You will recieve an email with the link to reset your password.</p>}
              </div>
              <form className="form" onSubmit={this.onSubmit}>
                {this.props.modalStatus !== 1 && <div className="form-group">
                    <input type="email" name="email" className="input" placeholder="Email" value={this.state.emailField} onChange={this.onChangeHandler}/> 
                    <label htmlFor="email">Enter Email</label>
                </div>}
                {(this.props.modalStatus !== null) && <>
                  <p>{this.props.msg}</p>
                </>}
                <button type="submit" className="btn btn-submit btn-with-disabled btn-forgot-password btn-col-primary" disabled={this.state.emailField.trim() === ""}>
                  Send Link
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }
}
 
const mapStateToProps = state => {
  return {
    modalOpen: state.ui.modalOpen,
    modalLoading: state.ui.modalLoading,
    modalStatus: state.ui.modalMessage.status,
    msg: state.ui.modalMessage.msg
  }
}

export default connect(mapStateToProps, { closeModal, sendResetPasswordLink })(ForgotPassword);