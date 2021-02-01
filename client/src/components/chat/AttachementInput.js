import React, { Component } from 'react';
import file from '../../images/document.svg';
import image from '../../images/image.svg';
import cx from 'classnames';

class AttachmentInput extends Component {
  input = React.createRef();
  
  openFileChooser = e => {
    this.input.click();
  }
  
  onFileChange = e => {
    console.log(e.target.files);
  }

  render() {
    let src;
    switch(this.props.ui) {
      case "img":
        src = image;
        break;
      default:
        src = file;
    }


    return (
      <>
        <div 
          className={cx("attachment", { "attachment-file": this.props.ui === "file" }, { "attachment-img": this.props.ui === "img" })}
          onClick={this.openFileChooser}
        >
          <img src={src} alt="file-icon" className="file-icon"/>
        </div>
        <input 
            type="file" 
            accept={this.props.accept} 
            ref={input => this.input = input} 
            className="file-input"
            onChange={this.onFileChange}
        />
      </>
    );
  }
}
 
export default AttachmentInput;