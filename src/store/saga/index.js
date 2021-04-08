import {takeEvery} from "redux-saga/effects";

import * as actionTypes from "../actions/actionType";
import {logoutSaga} from "./auth";

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}