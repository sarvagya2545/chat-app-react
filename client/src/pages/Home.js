import React, { Component } from 'react';
import LoginOrSignUp from '../components/home/LoginOrSignUp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
    componentDidUpdate() {
        if(this.props.isAuthenticated) {
            this.props.history.push('/chat')
        }
    }

    render() {
        return (
            <div className="home">
                <div className="hero-section">
                    <h1 className="header-main">Chat all you want!</h1>
                    <h2 className="header-secondary">With anybody you want!</h2>
                </div>
                <LoginOrSignUp/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default withRouter(connect(mapStateToProps)(Home));