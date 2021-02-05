import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import camera from '../../images/photo-camera.svg';
import { connect } from 'react-redux';
import { app } from '../../firebase';
import pfp from '../../images/pfp.svg';
import bin from '../../images/delete.svg';
import Loader from 'react-loader-spinner';

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

                const storageRef = app.storage().ref();
                const fileRef = 
                storageRef.child(`${group ? 'group':'profile'}-pics/${group ? currentChatRoom : username}`);
                console.log(fileRef)

                fileRef.delete().then(() => {
                    console.log('File deleted');
                    this.setState({ fileUrl: null, filePresent: false })
                })
                .catch(err => {
                    console.log('err', err);
                })
                this.setState({ fileLoading: false })
            }
            return;
        }

        if(this.props.input)
            this.input.click();
    }

    componentDidMount() {
        if(this.props.group && this.props.currentChatRoom) {
            const { group, currentChatRoom } = this.props;
            console.log('get the group image');
            this.loadImage({ group, currentChatRoom });
        }
        
        if(!this.props.group && this.props.username) {
            const { group, username } = this.props;
            console.log('get the user image');
            this.loadImage({ group, username });
        }
    }

    loadImage = ({ group, username, currentChatRoom }) => {
        console.log('load image called');
        console.log({ group, username, currentChatRoom });
        const file = group ? currentChatRoom : username;
        const folder = group ? 'group':'profile';
        
        console.log(file, folder);
        
        if(!file || !folder) {
            this.setState({ fileLoading: false })
            console.log(file)
            console.log(folder)
            return
        }

        this.setState({ fileLoading: true });
        const storageRef = app.storage().ref();
        storageRef.child(`${folder}-pics/${file}`)
            .getDownloadURL()
            .then(url => {
                this.setState({ fileUrl: url, fileLoading: false, filePresent: true })
            })
            .catch(err => {
                console.log('error');
                console.log(err);
                this.setState({ fileLoading: false })
            });

    }

    componentDidUpdate() {
        if(this.state.filePresent || !this.state.fileUrl)
            return;

        if(this.props.group && this.props.currentChatRoom) {
            const { group, currentChatRoom } = this.props;
            console.log('get the group image');
            this.loadImage({ group, currentChatRoom });
        }
        
        if(!this.props.group && this.props.username) {
            const { group, username } = this.props;
            console.log('get the user image');
            this.loadImage({ group, username });
        }
    }

    fileChange = async e => {
        console.log(e.target.files);

        this.setState({ fileLoading: true })

        const { username, currentChatRoom, group } = this.props;

        const files = e.target.files;
        if(files.length  !== 0) {
            const file = e.target.files[0]
            console.log(file);
            
            const storageRef = app.storage().ref();
            const fileRef = 
                storageRef.child(`${group ? 'group':'profile'}-pics/${group ? currentChatRoom : username}`)
            
            await fileRef.put(file).then(() => {
                this.setState({ filePresent: true, fileLoading: false })
            });
            const fileUrl = await fileRef.getDownloadURL();
            this.setState({ fileUrl });
        }

    }

    render() { 
        return (
            <div 
                className={cx('pfp', {'pfp-md' : this.props.size === "md"}, { 'pfp-xl': this.props.size === "xl" }, { 'pfp-input': this.props.input })}
                onClick={this.pfClick}
            >
                <img src={this.state.fileUrl || pfp} alt="pfp" className="pfp-img" />
                {this.props.input && (
                    <div className="take-photo-filter">
                        { this.state.fileLoading ? (
                            <Loader type="ThreeDots" color="#ffffff"/>
                            ): (
                                <Fragment>
                                <div className="images">
                                    <img src={camera} alt="camera" className="camera"/>
                                    {this.state.filePresent && <img 
                                        src={bin} 
                                        alt="delete" 
                                        className="bin" 
                                        onMouseEnter={() => this.setState({ hoverDelete: true })}
                                        onMouseLeave={() => this.setState({ hoverDelete: false })}
                                    />}
                                </div>
                                <Fragment>
                                    { !this.state.filePresent ? "ADD" : (this.state.hoverDelete ? "REMOVE" : "CHANGE") } { this.props.group ? "GROUP" : "PROFILE" } <br/> PHOTO 
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
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Pfp);