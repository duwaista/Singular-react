import { takeEvery, call, select } from "redux-saga/effects";
import { actions } from "./store";
import state from "./store";
import { storage } from "../plugins/firebase";
import { IUserState } from "../types";

const fileRef = storage.ref();

async function fetchUpload(action: any) {
	let file = action.payload.file;
	let type = action.payload.type;
	const uploadImage = fileRef.child("images/" + file.name);
	const uploadVideo = fileRef.child("videos/" + file.name);

	try {
		if (file && type === "image") {
			await uploadImage.put(file);
			const URL = await uploadImage.getDownloadURL();
			return URL;
		} else if (file && type === "video") {
			await uploadVideo.put(file);
			const URL = await uploadVideo.getDownloadURL();
			return URL;
		}
	} catch (error) {
		console.log(error);
	}
}

function fetchMongoAdd(URL: string, data: {}) {
	console.log("ABOBA LINK:", URL);
	// @ts-ignore
	console.log("ABOBA DATA:", data.user.profile);
}

export default function* rootSaga() {
	yield takeEvery(actions.Feed.setUpload, workerUpload);
}

function* workerUpload(action: any) {
	const URL: string = yield call(fetchUpload, action);
	const data: {} = yield select(state.getState);
	yield call(fetchMongoAdd, URL, data);
}
