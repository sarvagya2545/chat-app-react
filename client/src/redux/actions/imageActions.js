import axios from 'axios';
import { app } from '../../firebase';
import { tokenConfig } from './authActions';
import { PROFILE_PIC_UPLOAD, GROUP_PIC_UPLOAD, GROUP_PIC_DELETE, PROFILE_PIC_DELETE } from './types';

export const uploadFile = ({ fileName, folder, file }) => async dispatch => {
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(`${folder}/${fileName}`);
    const isGroupImg = folder === 'group-pics';

    await fileRef.put(file).then(() => {
        // this.setState({ filePresent: true, fileLoading: false })
    }).catch(err => console.log(err));
    const fileUrl = await fileRef.getDownloadURL();
    // this.setState({ fileUrl });

    // console.log(`/api/${isGroupImg ? "rooms" : "users" }/profile/pic`)
    // console.log(fileUrl);

    const body = isGroupImg ? { roomId: fileName } : {};

    axios
        .post(`/api/${ isGroupImg ? "rooms" : "users" }/profile/pic`, 
            { url: fileUrl, ...body }, 
            tokenConfig()
        )
        .then(res => {
            const type = isGroupImg ? GROUP_PIC_UPLOAD : PROFILE_PIC_UPLOAD;
            const payload =  isGroupImg ? { url: fileUrl, roomId: fileName } : { url: fileUrl };
            dispatch({ type , payload })
        })
        .catch(err => {
            console.log(err.response);
        });
}

export const deleteFile = ({ folder, fileName }) => async dispatch => {
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(`${folder}/${fileName}`);
    const isGroupImg = folder === 'group-pics';

    console.log(tokenConfig());
    // return;

    await fileRef.delete().then(() => {

    }).catch(err => {
        console.log(err.response);
    });

    const body = isGroupImg ? { roomId: fileName } : {};

    console.log(body);

    axios
        .delete(`/api/${isGroupImg ? "rooms" : "users"}/profile/pic`,
            { ...tokenConfig(), data: body },
        )
        .then(res => {
            const type = isGroupImg ? GROUP_PIC_DELETE : PROFILE_PIC_DELETE;
            const payload = isGroupImg ? { roomId: fileName } : {};
            dispatch({ type, payload });
        })
        .catch(err => console.log(err.response));
}