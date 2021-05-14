import React, { Component } from 'react';
import download from '../../../../images/download.svg';
import axios from 'axios';
import fileDownload from 'js-file-download';

class ImageDownload extends Component {

  downloadFile = (url, filename) => {
    axios.get(url, {
      responseType: 'blob'
    }).then(res => {
      fileDownload(res.data, filename)
    })
  }

  render() { 
    return (
      <div className="img-download">
        <img src={this.props.src} alt="img" className="chat-msg-img"/>
        <div className="filter">
          <button className="btn btn-dl btn-dl-img" onClick={e => this.downloadFile(this.props.src, this.props.name)}>
            <img src={download} alt="download"/>
          </button>
        </div>
      </div>
    );
  }
}
 
export default ImageDownload;