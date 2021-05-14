import React, { Component } from 'react';
import AttachmentInput from './utils/AttachementInput';
import { connect } from 'react-redux';
import cx from 'classnames';

class AttachmentMenu extends Component {
  render() { 
    return (
      <div className={cx("attachments", { "open": this.props.open })}>
        <ul>
          <li>
            <AttachmentInput
              accept="image/*"
              ui="img"
            />
          </li>
          <li>
            <AttachmentInput
              // accept=".txt, .pdf, .doc, .docx, .xls, .xlsx"
              ui="file"
            />
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.ui.attachmentPanelOpen
  }
}

export default connect(mapStateToProps)(AttachmentMenu);