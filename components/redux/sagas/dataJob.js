import { takeEvery, takeLeading, all, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { getApi } from '../../../configApi';
import { ToastAndroid } from 'react-native';
import { GET_DATA_JOB_SUCCESS, GET_DATA_JOB } from '../actions/actions';

function* getDataJob() {
    const res = yield getApi.get('user/task/list-post-active').catch(error => {
        error.response &&
            ToastAndroid.showWithGravity(
                `${error.response.data.errors.message}`,
                5,
                ToastAndroid.CENTER
            );
    })
    yield put({ type: GET_DATA_JOB_SUCCESS, payload: res.data.data })
}

function* watchDataJob() {
    yield takeLeading(GET_DATA_JOB, getDataJob)
}

export default function* watchAllDataJob() {
    yield all([
        watchDataJob()
    ])
}
