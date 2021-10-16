import {LOGIN, LOGIN_SUCCESS} from '../actions/actions';
import { takeEvery,takeLeading,all,put } from 'redux-saga/effects'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { getApi } from '../../../configApi';
import {ToastAndroid} from 'react-native';

function* Login(){
     
    
    // yield put({type:LOGIN_SUCCESS,payload:payload})
}

function* LoadField(){
        const test = yield AsyncStorage.getItem('idUser');
      const result = yield getApi.get(`user/get-one-info?id=${test}`)
      .catch(error => {
        error.response &&  
        ToastAndroid.showWithGravity(
        `${error.response.data.errors.message}`,
         5,
         ToastAndroid.CENTER
       );
       })
      yield result.data.data?.title_job && AsyncStorage.setItem('titleJob',result.data.data?.title_job);
    //    console.log('user',result.data.data)
      yield put({type:LOGIN_SUCCESS,payload:result.data.data})

}

function* watchUser(){
    yield takeLeading('login',Login)
    yield takeLeading('GET-INFO',LoadField)
}

export default function* watchAllUser(){
    yield all([
        watchUser()
    ])
}

//export default watchAllUser;
