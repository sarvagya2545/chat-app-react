import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: '',
            password: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitHandler(e) {
        e.preventDefault();
        console.log(e);
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
 
export default LoginForm;