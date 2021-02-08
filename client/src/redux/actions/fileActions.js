import { ADD_FILES, REMOVE_FILE } from "./types";

export const addFiles = (files, currentChatRoom) => dispatch => {
	console.log('files', files);
	const filesObjList = Array.from(files).map(file => {
		return {
			file,
			fileUrl: URL.createObjectURL(file),
			fileType: file.type.split('/')[0] === 'image' ? 'image' : 'others',
			caption: ''
		}
	});

	console.log('filesObjList', filesObjList);

	dispatch({ type: ADD_FILES, payload: { filesObjList, currentChatRoom } })
}

export const removeFile = (currentIndex, currentChatRoom) => dispatch => {
	console.log(currentIndex, currentChatRoom);
	dispatch({ type: REMOVE_FILE, payload: { currentIndex, currentChatRoom } })
}