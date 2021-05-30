import React from 'react';
import disconnected from '../../images/disconnected-phones.svg'

const DisconnectBanner = () => {
    return (
        <div className="disconnect-banner">
            <img src={disconnected} alt="Disconnected!" />
            <h1>Disconnected!</h1>
        </div>
    );
}
 
export default DisconnectBanner;