import { all, spawn } from "redux-saga/effects";
import userSaga from "./user";

export default function* rootSaga() {
  const sagas = [userSaga];
  yield all(sagas.map(s => spawn(s)));
}
