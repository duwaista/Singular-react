import { takeEvery, call, select, put } from "redux-saga/effects";
import { actions, url } from "./store";
import { storage } from "../plugins/firebase";
import { FeedTypes, IPost, IUserState } from "../types";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

const fileRef = storage.ref();
const options = {
	headers: { "Access-Control-Allow-Origin": "*" },
};

async function fetchUpload(action: any) {
	const file = action.payload.file;
	const type = action.payload.type;
	const uploadImage = fileRef.child("images/" + file.name);
	const uploadVideo = fileRef.child("videos/" + file.name);

	try {
		if (file && type === "image") {
			await uploadImage.put(file);
			const URL = await uploadImage.getDownloadURL();
			return { URL, type };
		} else if (file && type === "video") {
			await uploadVideo.put(file);
			const URL = await uploadVideo.getDownloadURL();
			return { URL, type };
		}
	} catch (error) {
		console.log(error);
	}
}

async function fetchMongoAdd(uploadRes: IPost, user: IUserState) {
	const post = {
		email: user.profile.email,
		avatarUrl: user.profile.photoURL,
		posts: uploadRes.URL,
		type: uploadRes.type,
		uid: user.profile.uid,
		createdAt: new Date(),
	};
	try {
		await axios.post(url, post, options);
		return post;
	} catch (err) {
		console.log(err);
	}
}

export default function* rootSaga(): Generator {
	yield takeEvery(actions.Feed.setUpload, workerUpload);
}

function* workerUpload(action: PayloadAction) {
	//======== Lol it's progress bar ========//
	yield put(actions.Feed.setProgress({ progress: 10, done: false, uploading: true }));

	const uploadRes: IPost = yield call(fetchUpload, action);
	yield put(actions.Feed.setProgress({ progress: 25, done: false, uploading: true }));

	const user: IUserState = yield select((state) => state.user);
	yield put(actions.Feed.setProgress({ progress: 50, done: false, uploading: true }));

	const payload: FeedTypes = yield call(fetchMongoAdd, uploadRes, user);
	yield put(actions.Feed.setProgress({ progress: 75, done: false, uploading: true }));

	yield put(actions.Feed.setPost(payload));
	yield put(actions.Feed.setProgress({ progress: 100, done: true, uploading: false }));
}
