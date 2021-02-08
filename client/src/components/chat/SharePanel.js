import React, { Component, createRef } from 'react';
import img from '../../images/img.jpg';
import sendIcon from '../../images/send_img.svg';
import { connect } from 'react-redux';
import ImgBox from './img-box';

class SharePanel extends Component {
  state = {
    selectedFileIndex: 0
  }

  btnRef = createRef();

  onSubmit = e => {
    e.preventDefault();
  }

  click = () => {
    this.btnRef.click();
  }

  changeSlide = (index) => {
    this.setState({ selectedFileIndex: index })
  }

  render() { 

    return (
      <div className="share-panel">
        <div className="share-panel-header">
          <button className="btn btn-close-preview">&#x2715;</button>
          Preview
        </div>

        <div className="share-panel-middle">
          <img src={this.props.files[this.state.selectedFileIndex].fileUrl} alt="panel" className="chat-panel-img"/>
          <form className="form" style={{ width: '70%', minWidth: '30rem' }} onSubmit={this.onSubmit}>
            <button type="submit" style={{ display: 'none' }} ref={btnRef => this.btnRef = btnRef}/>
          </form>
        </div>

        <button className="btn btn-send-share" onClick={() => this.click()}>
          <img src={sendIcon} alt="Send"/>
        </button>

        <div className="share-panel-footer">
          {this.props.files.map((file,index) => (
            <ImgBox 
              imgSrc={file.fileType === 'image' ? file.fileUrl : null} 
              selected={index === this.state.selectedFileIndex}
              key={index}
              onClick={() => this.changeSlide(index)}
            />
          ))}
          <div className="img-box add">
            <span className="plus">&#x2B;</span>
            <span className="name">ADD FILE</span>
          </div>
        </div>
      </div>
    );
  }
}
 
const mapStateToProps = state => {
  return {
    files: state.files.filesObject[state.chat.currentChatRoom]
  }
}

export default connect(mapStateToProps)(SharePanel);