import React, { Component, createRef } from 'react';
import sendIcon from '../../../images/send_img.svg';
import { connect } from 'react-redux';
import ImgBox from './utils/img-box';
import { removeFile, addFiles, clearFiles, sendFiles } from '../../../redux/actions/fileActions';
import fileIcon from '../../../images/files.svg';

class SharePanel extends Component {
  state = {
    selectedFileIndex: 0
  }

  btnRef = createRef();
  inputRef = createRef();

  onSubmit = e => {
    e.preventDefault();
    const { currentChatRoom, userId, userName, files } = this.props;
    this.props.sendFiles({ room: currentChatRoom, userId, userName, files });
    this.props.clearFiles(this.props.currentChatRoom);
  }

  click = () => {
    this.btnRef.click();
  }

  changeSlide = (index,e) => {
    // console.log(e.target.dataset);

    if(e.target.dataset.val === 'close') {
      this.props.removeFile(e.target.dataset.index, this.props.currentChatRoom);
      this.setState({ selectedFileIndex: 0 });

      return;
    }

    this.setState({ selectedFileIndex: index })
  }

  fileAdd = () => {
    this.inputRef.click();
  }

  onFileAddition = e => {
    // console.log(e.target.files);
    this.props.addFiles(e.target.files, this.props.currentChatRoom);
  }

  clickClose = e => {
    this.props.clearFiles(this.props.currentChatRoom);
  }

  render() { 

    return (
      <div className="share-panel">
        <div className="share-panel-header">
          <button className="btn btn-close-preview" onClick={this.clickClose}>&#x2715;</button>
          Preview
        </div>

        <div className="share-panel-middle">
          {this.props.files[this.state.selectedFileIndex] && this.props.files[this.state.selectedFileIndex].fileType === 'image' ? (
            <img 
              src={this.props.files[this.state.selectedFileIndex].fileUrl} 
              alt="panel" 
              className="chat-panel-img"
            />
          ) : (
            <div className="file-preview">
              <img
                src={fileIcon}
                alt="FILE"
                className="chat-panel-img smol"
              />
              <p>{this.props.files[this.state.selectedFileIndex] && this.props.files[this.state.selectedFileIndex].file.name}</p>
            </div>
          )}
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
              index={index}
              onClick={e => this.changeSlide(index,e)}
            />
          ))}
          <div className="img-box add" onClick={this.fileAdd}>
            <span className="plus">&#x2B;</span>
            <span className="name">ADD FILE</span>
            <input 
              type="file" 
              style={{ display: 'none' }} 
              ref={inputRef => this.inputRef = inputRef}
              onChange={this.onFileAddition}
            />
          </div>
        </div>
      </div>
    );
  }
}
 
const mapStateToProps = state => {
  return {
    files: state.files.filesObject[state.chat.currentChatRoom],
    currentChatRoom: state.chat.currentChatRoom,
    userName: state.auth.user.auth.username,
    userId: state.auth.user._id
  }
}

export default connect(mapStateToProps, { removeFile, addFiles, clearFiles, sendFiles })(SharePanel);