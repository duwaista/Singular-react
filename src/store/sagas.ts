import { takeEvery, call, select, put } from "redux-saga/effects";
import { actions, url } from "./store";
import { storage } from "../plugins/firebase";
import { FeedTypes, IPost, IUserState } from "../types";
import axios from "axios";

const fileRef = storage.ref();
const options = {
	headers: { "Access-Control-Allow-Origin": "*" },
};

async function fetchUpload(action: any) {
	let file = action.payload.file;
	let type = action.payload.type;
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
	let post = {
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

async function deletePostFetch(action: any) {
	try {
		await axios.delete(url + action.payload.feed._id);
	} catch (err) {
		console.log(err);
	}
}

export default function* rootSaga() {
	yield takeEvery(actions.Feed.setUpload, workerUpload);
	yield takeEvery(actions.Feed.deletePost, workerDelete);
}

function* workerUpload(action: any) {
	const uploadRes: IPost = yield call(fetchUpload, action);
	const user: IUserState = yield select((state) => state.user);
	const payload: FeedTypes = yield call(fetchMongoAdd, uploadRes, user);
	yield put(actions.Feed.setPost(payload));
}

function* workerDelete(action: any) {
	yield call(deletePostFetch, action);
}