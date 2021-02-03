import React, { Component } from 'react';
import cx from 'classnames';
import camera from '../../images/photo-camera.svg';

class Pfp extends Component {
    input = React.createRef();

    pfClick = e => {
        this.input.click();
    }

    fileChange = e => {
        console.log(e.target.files);
    }

    render() { 
        return (
            <div 
                className={cx('pfp', {'pfp-md' : this.props.size === "md"}, { 'pfp-xl': this.props.size === "xl" }, { 'pfp-input': this.props.input })}
                onClick={this.pfClick}
            >
                <img src={this.props.pfp} alt="pfp" className="pfp-img" />
                {this.props.input && <div className="take-photo-filter">
                    <img src={camera} alt="camera" className="camera"/>
                    ADD PROFILE <br/> PHOTO
                </div>}
                <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    ref={input => this.input = input}
                    onChange={this.fileChange}
                />
            </div>
        );
    }
}
 
export default Pfp;