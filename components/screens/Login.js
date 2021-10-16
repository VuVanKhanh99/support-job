import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { icons, images } from '../constants';
import { useDispatch } from 'react-redux';
import { LOGIN, LOGIN_SUCCESS } from '../redux/actions/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getApi } from '../../configApi';
import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [visiblePass, setVisiblePass] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSuccess =  () =>{
    navigation.navigate("Drawer");
    setEmail(null);
    setPassword(null);
  }

  const validateEmail = async (emailCheck, passwordCheck) => {
  
    //  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

    if (reg.test(emailCheck) === true) {

      await getApi.post('user/login', {
        email: emailCheck,
        password: passwordCheck
      })
        .then((response) => {
          if (response.status === 200) {
            const secretKey = response.data.data?.secret_key;

            const decoded = jwt_decode(secretKey);
            if (secretKey) {

              AsyncStorage.setItem('secretKey', secretKey);
              AsyncStorage.setItem('idUser', decoded._id);
              console.log("SUCCESSS")
             dispatch({ type: 'login' });
             Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Login Nofication',
                text2: 'Login sucessfully !',
                visibilityTime: 2000,
                fontSize: 35,
                autoHide: true,
                topOffset: 50,
                bottomOffset: 70,
                onHide: () => handleSuccess()
              });
            }

          } else {
            console.log("Lỗi server", response.error);
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Login Nofication',
              text2: 'Lỗi hệ thống vui lòng thử lại sau',
              visibilityTime: 2000,
              fontSize: 25,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
            });
          }
        })
        .catch(error => {
         error.response &&  
         ToastAndroid.showWithGravity(
         `${error.response.data.errors.message}`,
          5,
          ToastAndroid.CENTER
        );
        })



      // if (email !== 'AT14@edu.vn') {
      //   Toast.show({
      //     type: 'error',
      //     position: 'top',
      //     text1: 'Login Nofication',
      //     text2: 'Invalid email',
      //     visibilityTime: 4000,
      //     fontSize: 25,
      //     autoHide: true,
      //     topOffset: 30,
      //     bottomOffset: 40,
      //   });
      // } else if (passwordCheck !== 'jk12') {
      //   Toast.show({
      //     type: 'error',
      //     position: 'top',
      //     text1: 'Login Nofication',
      //     text2: 'Invalid password',
      //     visibilityTime: 4000,
      //     fontSize: 25,
      //     autoHide: true,
      //     topOffset: 30,
      //     bottomOffset: 40,
      //   });
      // } else {

      //   dispatch({ type: 'annam', payload: email });
      //   Toast.show({
      //     type: 'success',
      //     position: 'top',
      //     text1: 'Login Nofication',
      //     text2: 'Login sucessfully !',
      //     visibilityTime: 2000,
      //     fontSize: 25,
      //     autoHide: true,
      //     topOffset: 30,
      //     bottomOffset: 40,
      //     onHide: () => navigation.navigate("Maintab")
      //   });

      // }
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Login Nofication',
        text2: 'Invalid format email',
        visibilityTime: 4000,
        fontSize: 25,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  const handleLogin = () => {
    validateEmail(email, password);
  };

  return (


    <KeyboardAwareScrollView style={{ backgroundColor: '#fff' }} behavior="height">
      <View style={styles.container}>
        <Toast ref={ref => Toast.setRef(ref)} />
        <View style={styles.mainHeader}>
          <Image
            source={icons.kmaIcon}
            resizeMode="contain"
            style={{ width: 200, height: 200, marginBottom: -3 }}
          />
          <Text
            style={{ fontFamily: 'Roboto-regular', fontSize: 27, lineHeight: 55 }}>
            Welcome to KMA
          </Text>
        </View>
        <View style={styles.dataInput}>
          <View style={styles.viewInput}>
            <Image
              source={icons.microsoftIcon}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                marginLeft: 10,
                marginRight: 5,
              }}
            />
            <TextInput
              placeholder="Input your Microsoft email"
              style={styles.textInput}
              value={email}
              placeholderTextColor="#4BAEEE"
              onChangeText={email => setEmail(email)}
            />
          </View>
          <View style={styles.viewInput}>
            <Image
              source={images.passwordIcon}
              resizeMode="contain"
              style={{
                width: 26,
                height: 26,
                marginLeft: -2,
                marginRight: 0,
              }}
            />
            <TextInput
              placeholder="Input your password"
              style={styles.textInputPassword}
              value={password}
              placeholderTextColor="#4BAEEE"
              secureTextEntry={visiblePass}
              onChangeText={password => setPassword(password)}
            />
            <TouchableOpacity onPress={() => setVisiblePass(!visiblePass)}>
              <Image source={images.eyeIcon}
                resizeMode="contain"
                onPress={() => setVisiblePass(!visiblePass)}
                style={{
                  width: 19,
                  height: 19,
                  marginRight: 4
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{
            marginBottom: 20, width: '73%', display: 'flex', flexDirection: 'row', justifyContent: 'center'
          }}>
            <Text style={{ fontFamily: 'Roboto-regular', fontSize: 16 }}>Nếu bạn là nhà tuyển dụng chưa có tài khoản <Text style={{ color: '#22B2F1' }} onPress={() => navigation.navigate('Signup')}>Sign up</Text> </Text>

          </View>
          <TouchableOpacity
            accessible={true}
            activeOpacity={0.9}
            onPress={() => handleLogin()}
            style={styles.loginBtn}>
            <Text style={styles.btnText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>


  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 780,
    marginTop: -50
  },
  mainHeader: {
    height: 260,
    width: '90%',
    marginBottom: 40,
    marginTop: 50,

    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  viewInput: {
    backgroundColor: '#fff',
    borderRadius: 30,
    overflow: 'hidden',
    width: '80%',
    height: 50,
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4BAEEE',
    marginBottom: 33,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  textInputPassword: {
    height: 50,
    width: '70%',
    fontSize: 18,
    fontFamily: 'Cochin',
    // padding: 10,
    marginLeft: 5,
    marginRight: 5,
    color: '#4BAEEE',
    borderLeftWidth: 1,
    borderLeftColor: '#4BAEEE',
    paddingLeft: 20,
  },
  textInput: {
    height: 50,
    width: '83%',
    fontSize: 18,
    fontFamily: 'Cochin',
    // padding: 10,
    marginLeft: 5,
    color: '#4BAEEE',
    borderLeftWidth: 1,
    borderLeftColor: '#4BAEEE',
    paddingLeft: 20,
  },
  dataInput: {
    display: 'flex',
    justifyContent: 'space-around',
    height: '30%',
    alignItems: 'center',
    width: '100%',

  },
  loginBtn: {
    width: '75%',
    borderRadius: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#4BAEEE',
  },
  btnText: {
    fontSize: 18,
    fontFamily: 'Cochin',
    textAlign: 'center',
    color: '#fff',
  },
});

export default Login;
