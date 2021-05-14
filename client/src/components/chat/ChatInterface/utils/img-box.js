import React, { Component } from 'react';
import cx from 'classnames';
import fileIcon from '../../../../images/files.svg';

class ImgBox extends Component {
  render() { 
    return (
      <div className={cx("img-box", { "selected" : this.props.selected })} onClick={this.props.onClick}>
        <span className="close" data-val="close" data-index={this.props.index}>&#10005;</span>
        {this.props.imgSrc ? <img src={this.props.imgSrc} alt="img"/> : (
          <div className="file-icon">
            <img className="file-icon-preview" src={fileIcon} alt="file"/>
          </div>
        )}
      </div>
    );
  }
}
 
export default ImgBox;