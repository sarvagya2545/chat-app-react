import React, { Component } from 'react';
import cx from 'classnames';

class Pfp extends Component {
    state = {  }
    render() { 
        return (
            <div className={cx('pfp', {'pfp-md' : this.props.size === "md"})}>
                <img src={this.props.pfp} alt="pfp" className="pfp-img" />
            </div>
        );
    }
}
 
export default Pfp;