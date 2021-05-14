import React, { Component } from 'react';
import uploadImg from '../../../../images/upload.svg';

class DragOver extends Component {

    dragover = e => {
        e.preventDefault();
    }

    render() { 
        return (
            <div 
                className="dragover" 
                onDragOver={this.dragover} 
                onDragLeave={this.props.onDragLeave} 
                onDrop={this.props.onDrop}
            >
                <div className="dragover-header">
                    <button className="btn btn-close-preview">&#x2715;</button>
                    Preview
                </div>
                <div className="dragover-body">
                    <img className="upload-img" src={uploadImg} alt="upload"/>
                    DROP FILES HERE TO UPLOAD
                </div>
            </div>
        );
    }
}
 
export default DragOver;