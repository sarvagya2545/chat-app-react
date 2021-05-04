import { ADD_FILES, CLEAR_GROUP_FILES, CLOSE_ATTACHMENT_PANEL, REMOVE_FILE } from "./types";
import socket from '../../socket';
import { app } from '../../firebase';

export const addFiles = (files, currentChatRoom) => dispatch => {
    // console.log('files', files);
    const filesObjList = Array.from(files).map(file => {
        return {
            file,
            fileUrl: URL.createObjectURL(file),
            fileType: file.type.split('/')[0] === 'image' ? 'image' : 'others',
            caption: ''
        }
    });

    dispatch({ type: CLOSE_ATTACHMENT_PANEL })

    // console.log('filesObjList', filesObjList);

    dispatch({ type: ADD_FILES, payload: { filesObjList, currentChatRoom } })
}

export const removeFile = (currentIndex, currentChatRoom) => dispatch => {
    // console.log(currentIndex, currentChatRoom);
    dispatch({ type: REMOVE_FILE, payload: { currentIndex, currentChatRoom } })
}

export const clearFiles = (currentChatRoom) => dispatch => {
    // console.log(currentChatRoom);
    dispatch({ type: CLEAR_GROUP_FILES, payload: currentChatRoom })
}

export const sendFiles = ({ room, files, userName, userId }) => async dispatch => {

    // console.log(files);
    // const fileUrls = [];

    const fileUrls = await Promise.all(files.map(file => {
        return new Promise((resolve, reject) => {
            const timeStamp = new Date().getTime();
            const fileName = `${file.file.name.split('.')[0]}-${timeStamp}.${file.file.name.split('.')[1]}`;
            const storageRef = app.storage().ref().child(`images-in-chats/${room}/${fileName}`);

            storageRef
                .put(file.file)
                .on('state_changed', (snapshot) => {

                }, reject, () => {
                    storageRef.getDownloadURL()
                        .then(url => {
                            resolve({ url, isImage: file.fileType === 'image', fileName });
                        })
                })
        })
    }))

    // console.log(fileUrls);

    await Promise.all(fileUrls.map(({ url, isImage, fileName }) => {
        return new Promise((resolve, reject) => {
            const messageObject = {
                room,
                content: {
                    fileURL: url,
                    isImage,
                    fileName
                },
                by: userName,
                senderId: userId,
                time: new Date()
            }

            socket.sendSocketEvent('message', { room, messageObject })
        })
    }))
}

export const changePfp = ({ isGroupImg, payload, user, currentUserId }) => {
    console.log('change pfp')
    socket.sendSocketEvent('pfpChange', { isGroupImg, payload, user, currentUserId })
}

export const deletePfp = ({ isGroupImg, payload, user, currentUserId }) => {
    // console.log('remove pfp');
    socket.sendSocketEvent('pfpRemove', { isGroupImg, payload, user, currentUserId });
}