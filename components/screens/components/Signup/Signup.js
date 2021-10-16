import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  ToastAndroid
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Textarea from 'react-native-textarea';
import { LOGIN, LOGIN_SUCCESS } from '../redux/actions/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { icons, images } from '../../../constants';
import { getApi } from '../../../../configApi';

const Signup = () => {

  const [passComfirm, setPassConfirm] = useState(null);
  const [visiblePass, setVisiblePass] = useState(true);
  const initialData = {
    email: null,
    password: null,
    name_company: null,
    name_Hr: null,
    phonenumber: null,
    address: null,
    company_summary: null,
    role: "company",
  }
  const [dataSignup, setDataSignUp] = useState(initialData);
  const [error, setError] = useState({
    emailErr: null,
    passErr: null,
    companyErr: null,
    fullNameErr: null,
    phoneErr: null,
    addressErr: null,
    summaryErr: null,
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignup = () => {
    const isEmptyError = Object.values(error).every(x => x === null || x === '');
    const isDataUser = Object.values(dataSignup).some(x => x === null || x === '');
    console.log('an', isDataUser);

    
    if (isEmptyError && !isDataUser) {
      getApi.post('user/register', dataSignup)
        .then((response) => {
          if (response.status === 200) {
            console.log("SUCCESSS")
            ToastAndroid.showWithGravity(
              "Đắng kí thành công !",
              5,
              ToastAndroid.CENTER
            );
            navigation.navigate("Maintab")

          } else{
            console.log("Lỗi server")
            ToastAndroid.showWithGravity(
              "Lỗi hệ thoonsh vui lòng thử lại sau!",
              5,
              ToastAndroid.CENTER
            );
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
    }
    else {

      ToastAndroid.showWithGravity(
        "Bạn phải ghi đầy đủ các thông tin trong form !",
        5,
        ToastAndroid.CENTER
      );

    }
  };

  const handleCheck = (field) => {
    // console.log(field);
    const textErr = 'Đây là trường bắt buộc không được phép để trống';
    const { email,
      password,
      name_company,
      name_Hr,
      phonenumber,
      address,
      company_summary
    } = dataSignup;
    switch (field) {
      case 'name_company':
        (name_company) ? setError({ ...error, 'companyErr': '' }) : setError({ ...error, 'companyErr': textErr })
        break;
      case 'name_Hr':
        (name_Hr) ? setError({ ...error, 'fullNameErr': '' }) : setError({ ...error, 'fullNameErr': textErr })
        break;
      case 'phonenumber': {
        console.log('test', phonenumber, phonenumber.length);
        ((phonenumber.length === 10) && (phonenumber % 1 === 0)) ? setError({ ...error, 'phoneErr': '' }) : setError({ ...error, 'phoneErr': 'số điện thoại phải gồm 10 chữ số' })
        break;
      }
      case 'email': {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
        if (email) {
          if (reg.test(email) === false) {
            setError({ ...error, 'emailErr': 'Sai định dạng email' })
          }
          else {
            setError({ ...error, 'emailErr': '' })
          }
        }
        else {
          setError({ ...error, 'emailErr': textErr })
        }
        break;
      }
      case 'address': {
        (address) ? setError({ ...error, 'addressErr': '' }) : setError({ ...error, 'addressErr': textErr })
        break;
      }
      case 'company_summary': {
        (company_summary) ? setError({ ...error, 'summaryErr': '' }) : setError({ ...error, 'summaryErr': textErr })
        break;
      }
      case 'password': {
        if(!password){
          setError({ ...error, 'passErr': textErr })
        }else{
          (password.length < 8) ?  setError({ ...error, 'passErr': 'Độ dài mật khẩu phải lớn hơn hoặc bằng 8 kí tự' }) : setError({ ...error, 'passErr': '' })
        } 
        break;
      }
    }
  }


  return (


    <KeyboardAwareScrollView style={{ backgroundColor: '#fff' }} behavior="height">
      <ScrollView
        onContentSizeChange={(contentWidth, contentHeight) => {
          _scrollToBottomY = contentHeight;
        }}>
        <View style={styles.container}>
          
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
          <Toast ref={ref => Toast.setRef(ref)} position="bottom" />
          <View style={styles.dataInput}>
            <View style={styles.viewField}>
              <View style={styles.viewInput}>
                <Image
                  source={icons.companyIcon}
                  resizeMode="contain"
                  style={{
                    width: 36,
                    height: 36,
                    marginLeft: -15,
                  }}
                />
                <TextInput
                  placeholder="Nhập tên công ty của bạn"
                  style={styles.textInput}
                  value={dataSignup.name_company}
                  placeholderTextColor="#4BAEEE"
                  onChangeText={val => setDataSignUp({ ...dataSignup, name_company: val })}
                  onBlur={() => handleCheck('name_company')}
                />

              </View>
              <Text style={styles.textError}>{error.companyErr && error.companyErr}</Text>
            </View>


            <View style={styles.viewField}>
              <View style={styles.viewInput}>
                <Image
                  source={icons.personIcon}
                  resizeMode="contain"
                  style={{
                    width: 34,
                    height: 25,
                    marginLeft: -15,
                  }}
                />
                <TextInput
                  placeholder="Nhập tên của bạn"
                  style={styles.textInput}
                  value={dataSignup.name_Hr}
                  placeholderTextColor="#4BAEEE"
                  onChangeText={val => setDataSignUp({ ...dataSignup, name_Hr: val })}
                  onBlur={() => handleCheck('name_Hr')}
                />
              </View>
              <Text style={styles.textError}>{error.fullNameErr && error.fullNameErr}</Text>
            </View>

            <View style={styles.viewField}>
              <View style={styles.viewInput}>
                <Image
                  source={icons.phoneIcon}
                  resizeMode="contain"
                  style={{
                    width: 34,
                    height: 25,
                    marginLeft: -15,
                  }}
                />
                <TextInput
                  placeholder="Nhập số điện thoại liên hệ"
                  style={styles.textInput}
                  value={dataSignup.phonenumber}
                  placeholderTextColor="#4BAEEE"
                  onChangeText={val => setDataSignUp({ ...dataSignup, phonenumber: val })}
                  onBlur={() => handleCheck('phonenumber')}
                />
              </View>
              <Text style={styles.textError}>{error.phoneErr && error.phoneErr}</Text>
            </View>

            <View style={styles.viewField}>
              <View style={styles.viewInput}>
                <Image
                  source={images.emailIcon}
                  resizeMode="contain"
                  style={{
                    width: 38,
                    height: 38,
                    marginLeft: -15,
                  }}
                />
                <TextInput
                  placeholder="Nhập email của bạn"
                  style={styles.textInput}
                  value={dataSignup.email}
                  placeholderTextColor="#4BAEEE"
                  onChangeText={val => setDataSignUp({ ...dataSignup, email: val })}
                  onBlur={() => handleCheck('email')}
                />
              </View>
              <Text style={styles.textError}>{error.emailErr && error.emailErr}</Text>
            </View>

            <View style={styles.viewField}>
              <View style={styles.viewInput}>
                <Image
                  source={icons.localIcon}
                  resizeMode="contain"
                  style={{
                    width: 31,
                    height: 31,
                    marginLeft: -15,
                  }}
                />
                <TextInput
                  placeholder="Nhập địa chỉ công ty"
                  style={styles.textInput}
                  value={dataSignup.address}
                  placeholderTextColor="#4BAEEE"
                  onChangeText={val => setDataSignUp({ ...dataSignup, address: val })}
                  onBlur={() => handleCheck('address')}
                />
              </View>
              <Text style={styles.textError}>{error.addressErr && error.addressErr}</Text>
            </View>

            <View style={styles.viewField}>
              <View style={styles.viewInputTextArea}>
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={{ color: '#4BAEEE' }}
                  onChangeText={val => setDataSignUp({ ...dataSignup, company_summary: val })}
                  defaultValue={dataSignup.company_summary}
                  // maxLength={120}
                  placeholder={'Tóm tắt về công ty'}

                  placeholderTextColor={'#4BAEEE'}
                  underlineColorAndroid={'transparent'}
                  onBlur={() => handleCheck('company_summary')}

                />
              </View>
              <Text style={styles.textError}>{error.summaryErr && error.summaryErr}</Text>
            </View>

            <View style={styles.viewField}>
              <View style={styles.viewInput}>
                <Image
                  source={images.passwordIcon}
                  resizeMode="contain"
                  style={{
                    width: 26,
                    height: 26,
                    marginLeft: 0,
                    marginRight: 3,
                  }}
                />
                <TextInput
                  placeholder="Đặt mật khẩu"
                  style={styles.textInputPassword}
                  value={dataSignup.password}
                  placeholderTextColor="#4BAEEE"
                  secureTextEntry={visiblePass}
                  onChangeText={val => setDataSignUp({ ...dataSignup, password: val })}
                  onBlur={() => handleCheck('password')}
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
              <Text style={styles.textError}>{error.passErr && error.passErr}</Text>
            </View>

            <View style={{
              marginBottom: 20, width: '73%', display: 'flex', flexDirection: 'row', justifyContent: 'center'
            }}>
              <Text style={{ fontFamily: 'Roboto-regular', fontSize: 16 }}>Nếu bạn đã có tài khoản <Text style={{ color: '#22B2F1' }} onPress={() => navigation.navigate('Login')}>Login</Text> </Text>

            </View>
            <TouchableOpacity
              accessible={true}
              activeOpacity={0.9}
              onPress={handleSignup}
              style={styles.loginBtn}>
              <Text style={styles.btnText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 80 }}>

          </View>
        </View>

      </ScrollView>
    </KeyboardAwareScrollView>

  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //  height: 1500,
    // marginTop: -800
  },
  viewField: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 20,
    marginBottom: 5
  },
  textError: {
    // fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#A12121',
    marginTop: -32,

  },
  mainHeader: {
    height: 260,
    marginBottom: 40,
    marginTop: 20,
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textareaContainer: {
    width: '100%',
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
    borderRadius: 5,
    fontSize: 17,

    fontFamily: 'Gluten-ExtraLight'
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
  viewInputTextArea: {
    backgroundColor: '#fff',
    borderRadius: 30,
    overflow: 'hidden',
    width: '80%',
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
    width: '75%',
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

    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff'
  },
  loginBtn: {
    width: '75%',
    borderRadius: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    //  marginTop: 40,
    backgroundColor: '#4BAEEE',
  },
  btnText: {
    fontSize: 18,
    fontFamily: 'Cochin',
    textAlign: 'center',
    color: '#fff',
  },
});


