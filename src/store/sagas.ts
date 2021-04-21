import { takeEvery, call, select, put } from "redux-saga/effects";
import { actions, url } from "./store";
import { storage } from "../plugins/firebase";
import { IUserState } from "../types";
import axios from 'axios';

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

async function fetchMongoAdd(URL: string, user: IUserState) {
	console.log("ABOBA LINK:", URL);
	console.log("ABOBA DATA: ", user);
	let post = {
		email: user.profile.email,
		avatarUrl: user.profile.photoURL,
		uid: user.profile.uid,
		createdAt: new Date()
	}
	await axios.post(url, post);
	return post;
}

export default function* rootSaga() {
	yield takeEvery(actions.Feed.setUpload, workerUpload);
}

function* workerUpload(action: any) {
	const URL: string = yield call(fetchUpload, action);
	const user: IUserState = yield select((state) => state.user.profile);
	console.log(user);
	yield call(fetchMongoAdd, URL, user);
}
