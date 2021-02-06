import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import camera from '../../images/photo-camera.svg';
import { connect } from 'react-redux';
import pfp from '../../images/pfp.svg';
import bin from '../../images/delete.svg';
import Loader from 'react-loader-spinner';
import { uploadFile } from '../../redux/actions/imageActions';

class Pfp extends Component {

    state = {
        fileUrl: null,
        hoverDelete: false,
        filePresent: false,
        fileLoading: false
    }

    input = React.createRef();

    pfClick = e => {
        if(e.target.classList.contains('bin')) {
            let isDelete = window.confirm('DO YOU REALLY WANT TO REMOVE THE PICTURE?');

            if(isDelete) {
                this.setState({ fileLoading: true })
                const { group, currentChatRoom, username } = this.props;
            }
            return;
        }

        if(this.props.input)
            this.input.click();
    }

    fileChange = async e => {
        console.log(e.target.files);

        const { username, currentChatRoom, group } = this.props;

        const files = e.target.files;
        if(files.length  !== 0) {
            const file = e.target.files[0]
            console.log(file);

            const fileName = group ? currentChatRoom : username;
            const folder = group ? 'group-pics' : 'profile-pics';

            console.log('fileName', fileName)
            console.log('folder', folder)

            await this.props.uploadFile({ file, fileName, folder });
        }

    }

    render() { 
        return (
            <div 
                className={cx('pfp', {'pfp-md' : this.props.size === "md"}, { 'pfp-xl': this.props.size === "xl" }, { 'pfp-input': this.props.input })}
                onClick={this.pfClick}
            >
                <img src={this.props.src || pfp} alt="pfp" className="pfp-img" />
                {this.props.input && (
                    <div className="take-photo-filter">
                        { this.state.fileLoading ? (
                            <Loader type="ThreeDots" color="#ffffff"/>
                            ): (
                                <Fragment>
                                <div className="images">
                                    <img src={camera} alt="camera" className="camera"/>
                                    {this.props.src && <img 
                                        src={bin} 
                                        alt="delete" 
                                        className="bin" 
                                        onMouseEnter={() => this.setState({ hoverDelete: true })}
                                        onMouseLeave={() => this.setState({ hoverDelete: false })}
                                    />}
                                </div>
                                <Fragment>
                                    { !this.props.src ? "ADD" : (this.state.hoverDelete ? "REMOVE" : "CHANGE") } { this.props.group ? "GROUP" : "PROFILE" } <br/> PHOTO 
                                </Fragment>
                            </Fragment>
                            )
                        }
                        <input 
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }} 
                            ref={input => this.input = input}
                            onChange={this.fileChange}
                        />
                    </div>
                )}
            </div>
        );
    }
}
 
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        currentChatRoom: state.chat.currentChatRoom
    }
}

export default connect(mapStateToProps, { uploadFile })(Pfp);