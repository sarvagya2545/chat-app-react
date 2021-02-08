import React, { Component, createRef } from 'react';
import img from '../../images/img.jpg';
import img2 from '../../images/img2.jpg';
import sendIcon from '../../images/send_img.svg';

class SharePanel extends Component {
  state = {
    caption: ''
  }

  btnRef = createRef();

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();
  }

  click = () => {
    this.btnRef.click();
  }

  render() { 

    return (
      <div className="share-panel">
        <div className="share-panel-header">
          <button className="btn btn-close-preview">&#x2715;</button>
          Preview
        </div>

        <div className="share-panel-middle">
          <img src={img} alt="panel" className="chat-panel-img"/>
          <form className="form" style={{ width: '70%', minWidth: '30rem' }} onSubmit={this.onSubmit}>
            <div className="form-group">
                <input type="text" name="caption" className="input" placeholder="Add a caption..." value={this.state.caption} onChange={this.onChangeHandler}/> 
                <label htmlFor="caption">Add a caption...</label>
            </div>
            <button type="submit" style={{ display: 'none' }} ref={btnRef => this.btnRef = btnRef}/>
          </form>
        </div>

        <button className="btn btn-send-share" onClick={() => this.click()}>
          <img src={sendIcon} alt="Send"/>
        </button>

        <div className="share-panel-footer">
          <div className="img-box">
            <span className="close">&#10005;</span>
            <img src={img} alt="img"/>
          </div>
          <div className="img-box selected">
            <span className="close">&#10005;</span>
            <img src={img2} alt="img"/>
          </div>
          <div className="img-box add">
            <span className="plus">&#x2B;</span>
            <span className="name">ADD FILE</span>
          </div>
        </div>
      </div>
    );
  }
}
 
export default SharePanel;