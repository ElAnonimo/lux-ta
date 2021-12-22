import { call, takeEvery, put, take, fork } from "redux-saga/effects";
import { matchPath } from "react-router-dom";
import { push, LOCATION_CHANGE } from "connected-react-router";
import {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  LIST_USERS_FAIL,
  LIST_USERS_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL
} from "../../reducers/user/actions";
import {
  getRouteConfig,
  LIST_USERS_ROUTE,
  LOAD_USER_ROUTE
} from "../../../routes";
import api from "../../../api";
import {
  LOAD_USER_DETAILS,
  LOAD_USER_DETAILS_FAIL,
  LOAD_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS,
  UPDATE_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS_SUCCESS
} from "../../reducers/userDetails/actions";

function* routeChangeSaga() {
  while (true) {
    const action = yield take(LOCATION_CHANGE);

    if (matchPath(action.payload.location.pathname, getRouteConfig(LIST_USERS_ROUTE))) {
      yield put({
        type: LIST_USERS_ROUTE
      });
    }

    const detailsPage = matchPath(action.payload.location.pathname, getRouteConfig(LOAD_USER_ROUTE));
    if (detailsPage) {
      const { id } = detailsPage.params;

      if (id) {
        yield put({
          type: LOAD_USER_DETAILS,
          payload: { id }
        });
      }
    }
  }
}

function* listUsersSaga() {
  try {
    const res = yield call(api.get, "/users");
    yield put({
      type: LIST_USERS_SUCCESS,
      payload: res.data.data
    });
  } catch(ex) {
    yield put({
      type: LIST_USERS_FAIL,
      payload: ex.message
    });
  }
}

function* addUserSaga({ payload }) {
  try {
    const res = yield call(api.post, "/users", payload);
    yield put({
      type: ADD_USER_SUCCESS,
      payload: res.data.data
    });
    yield put(push("/users"));
  } catch(ex) {
    yield put({
      type: ADD_USER_FAIL,
      payload: ex.message
    });
  }
}

function* updateUserSaga({ payload }) {
  const { id, ...restUserProps } = payload;

  try {
    const res = yield call(api.put, `/users/${id}`, restUserProps);
    yield put({
      type: UPDATE_USER_DETAILS_SUCCESS,
      payload: res.data.data
    });
    yield put(push("/users"));
  } catch(ex) {
    yield put({
      type: UPDATE_USER_DETAILS_FAIL,
      payload: ex.message
    });
  }
}

function* loadUserDetailsSaga({ payload }) {
  const { id } = payload;

  try {
    const res = yield call(api.get, `/users/${id}`);
    yield put({
      type: LOAD_USER_DETAILS_SUCCESS,
      payload: res.data.data
    });
  } catch(ex) {
    yield put({
      type: LOAD_USER_DETAILS_FAIL,
      payload: ex.message
    });
  }
}

function* deleteUserSaga({ payload }) {
  // there is only a 204 statusCode response from the API on a delete call
  try {
    yield call(api.delete, `/users/${payload}`);
    yield put({
      type: DELETE_USER_SUCCESS,
      payload
    });
    yield put(push("/users"));
  } catch(ex) {
    yield put({
      type: DELETE_USER_FAIL,
      payload: ex.message
    });
  }
}

export default function* userSaga() {
  yield fork(routeChangeSaga);
  yield takeEvery(ADD_USER, addUserSaga);
  yield takeEvery(LIST_USERS_ROUTE, listUsersSaga);
  yield takeEvery(LOAD_USER_DETAILS, loadUserDetailsSaga);
  yield takeEvery(UPDATE_USER_DETAILS, updateUserSaga);
  yield takeEvery(DELETE_USER, deleteUserSaga);
}
