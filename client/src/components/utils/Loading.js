import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

class Loading extends Component {
    render() { 
        return (
            <>
                <div className="loader-bg"></div>
                <div className="loader">
                    <Loader
                        type="TailSpin"
                        timeout={3000}
                    />
                </div>
            </>
        );
    }
}
 
export default Loading;