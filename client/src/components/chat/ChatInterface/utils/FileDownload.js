import React, { Component } from 'react';
import download from '../../../../images/download.svg';
import axios from 'axios';
import fileDownload from 'js-file-download';

class FileDownload extends Component {

  downloadFile = (url, filename) => {
    axios.get(url, {
      responseType: 'blob'
    }).then(res => {
      fileDownload(res.data, filename)
    })
  }

  render() { 
    return (
      <div className="file-dl" onClick={e => this.downloadFile(this.props.src, this.props.name)}>
        <span>{this.props.name}</span>
        <button className="btn btn-dl">
          <img src={download} alt="download"/>
        </button>
      </div>
    );
  }
}
 
export default FileDownload;