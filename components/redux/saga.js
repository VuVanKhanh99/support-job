import watchAllUser from "./sagas/userSaga";
import {all,fork} from 'redux-saga/effects';
import watchAllDataJob from "./sagas/dataJob";

export default function* rootSaga(){
    yield all([
        fork(watchAllUser),
        fork(watchAllDataJob)
    ])
}