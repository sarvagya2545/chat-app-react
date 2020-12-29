import React, { Component } from 'react';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
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
        // register the user
    }

    render() { 
        return (
            <form className="form" onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                    <input type="text" name="username" className="input" placeholder="Username" value={this.state.username} onChange={this.onChangeHandler}/> 
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-group">
                    <input type="email" name="email" className="input" placeholder="Email" value={this.state.email} onChange={this.onChangeHandler}/> 
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-group">
                    <input type="password" name="password" className="input" placeholder="Password" value={this.state.password} onChange={this.onChangeHandler}/> 
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-group">
                    <input type="password" name="confirmPassword" className="input" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChangeHandler}/> 
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <button type="submit" className="btn btn-submit">Register</button>
            </form>
        );
    }
}
 
export default SignUpForm;