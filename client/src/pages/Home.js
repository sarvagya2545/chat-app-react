import React from 'react';
import LoginOrSignUp from '../components/LoginOrSignUp';

function Home() {
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

export default Home;