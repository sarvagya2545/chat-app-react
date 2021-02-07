import React, { Component } from 'react';

class SharePanel extends Component {
  render() { 
    return (
      <div className="share-panel">
        <div className="share-panel-header">
          <button className="btn btn-close-preview">&#x2715;</button>
          Preview
        </div>

        <div className="share-panel-middle">
          MIDDLE
        </div>

        <div className="share-panel-footer">
          FOOTER
        </div>
      </div>
    );
  }
}
 
export default SharePanel;