import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import rootSaga from "./sagas";
import appReducer from "./app";
import userReducer from "./user";

const isDevMode = process.env.NODE_ENV === "development";
const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  app: appReducer,
  user: userReducer,
});

// Spread kill types :(
const middleware = getDefaultMiddleware().concat(sagaMiddleware);

if (isDevMode) middleware.push(logger);

const state = configureStore({
  reducer,
  middleware,
});

// sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof state.getState>;
export type AppDispatch = typeof state.dispatch;

export default state;
