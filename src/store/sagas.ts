import { takeEvery, call } from "redux-saga/effects";
import { actions } from "./store";
import { storage } from "../plugins/firebase";

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

function fetchMongoAdd(URL: string) {
	console.log("ABOBA LINK:", URL);
}

export default function* rootSaga() {
	yield takeEvery(actions.Feed.setUpload, workerUpload);
}

function* workerUpload(action: any) {
	const URL: string = yield call(fetchUpload, action);
	yield call(fetchMongoAdd, URL);
}
