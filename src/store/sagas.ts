import {
  takeEvery, call, select, put,
} from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { actions } from "./store";
import { storage } from "../plugins/firebase";
import {
  FeedTypes, IPost, IUpload, IUserState,
} from "../types";
import { baseUrl } from "../api";

const options = {
  headers: { "Access-Control-Allow-Origin": "*" },
};

const fileRef = storage.ref();

const fetchUpload = async (action: PayloadAction<IUpload>) => {
  if (!action.payload?.file) return;
  const { file } = action.payload;
  const { type } = action.payload;
  const uploadImage = fileRef.child(`images/${file.name}`);
  const uploadVideo = fileRef.child(`videos/${file.name}`);

  try {
    if (file && type === "image") {
      await uploadImage.put(file);
      const URL = await uploadImage.getDownloadURL();
      return { URL, type };
    } if (file && type === "video") {
      await uploadVideo.put(file);
      const URL = await uploadVideo.getDownloadURL();
      return { URL, type };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

// No mongo, terrible naming
const fetchMongoAdd = async (uploadRes: IPost, user: IUserState) => {
  const { email, photoURL, uid } = user.profile;
  const newPost = {
    avatarUrl: photoURL,
    uid,
    email,
    posts: uploadRes.URL,
    type: uploadRes.type,
  };

  try {
    const response = await axios.post(`${baseUrl}/feed`, newPost, options);
    const newPostId = response.data[0]?.id || Math.random();
    return {
      ...newPost,
      id: newPostId,
    };
  } catch (error) {
    console.error(error);
  }
};

function* workerUpload(action: PayloadAction<IUpload>) {
  //= ======= Lol it's progress bar ========//
  yield put(actions.Feed.setProgress({ progress: 10, done: false, uploading: true }));

  const uploadRes: IPost = yield call(fetchUpload, action);
  yield put(actions.Feed.setProgress({ progress: 25 }));

  const user: IUserState = yield select((state) => state.user);
  yield put(actions.Feed.setProgress({ progress: 50 }));

  const payload: FeedTypes = yield call(fetchMongoAdd, uploadRes, user);
  yield put(actions.Feed.setProgress({ progress: 75 }));

  if (payload) {
    yield put(actions.Feed.setPost(payload));
    yield put(actions.Feed.setProgress({ progress: 100, done: true, uploading: false }));
    yield put(actions.Feed.cleanFileToUpload({}));
  }
}

export default function* rootSaga(): Generator {
  yield takeEvery(actions.Feed.setUpload, workerUpload);
}
