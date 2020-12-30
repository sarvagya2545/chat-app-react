import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';

class LoginForm extends Component {
    state = {
        usernameOrEmail: '',
        password: ''
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.login(this.state)
    }

    render() { 
        return (
            <form className="form" onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                    <input type="text" name="usernameOrEmail" className="input" placeholder="Username / Email" value={this.state.usernameOrEmail} onChange={this.onChangeHandler}/> 
                    <label htmlFor="usernameOrEmail">Username/Email</label>
                </div>
                <div className="form-group">
                    <input type="password" name="password" className="input" placeholder="Password" value={this.state.password} onChange={this.onChangeHandler}/> 
                    <label htmlFor="password">Password</label>
                </div>
                <button type="submit" className="btn btn-submit">Login</button>
            </form>
        );
    }
}
 
export default connect(null, { login })(LoginForm);