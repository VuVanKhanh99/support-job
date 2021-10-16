import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  Keyboard,
  ToastAndroid,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import PaperSelect from 'react-native-paper-select';
import SelectGender from './components/SelectInput/SelectGender';
import DatePickerInput from './components/DatePicker/DatePicker';
import ObjectiveInput from './components/TextArea/Objective';
import SkillsInput from './components/TextArea/Skills';
import SelectMajor from './components/SelectInput/SelectMajor';
import SelectTypeStudent from './components/SelectInput/SelectTypeStudent';
import ExperienceInput from './components/TextArea/Experience';
import CertificationInput from './components/TextArea/Certification';
import AddtionalInfoInput from './components/TextArea/AddtionalInfo';
import axios from 'axios';
import { getApi } from '../../../../configApi';

const initialSv = {
  objective: '',
  fullName: '',
  gender: 'male',
  birthday: '09-10-1999',
  phonenumber: '',
  email: '',
  address: '',
  skills: '',
  name_of_school: 'Học viện Kỹ thuật Mật mã',
  experience: '',
  major: 'cntt',
  type_of_student: 'at14',
  certification: '',
  additional_info: '',
}

export default class BodyCv extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userSv: this.props.userData ? this.props.userData : { ...initialSv },
      keyboardStatus: null,
      dataStructure: null,
      secret_key: null,
      cvStatus:'create',
      error: {
        objectiveErr: '',
        fullnameErr: '',
        phoneNumberErr: '',
        experienceErr: '',
        certificationErr: '',
        skillsErr: '',
        additionalInfoErr: '',
        emailError: '',
        addressErr: ''
      }
    }

    //this.handleObjective = this.handleObjective.bind(this);
  }


  componentDidMount() {
    this.keyboardDidShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({ keyboardStatus: 'Keyboard Shown' });
      },
    );
    this.keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({ keyboardStatus: 'Keyboard Hidden' });
      },
    );

    AsyncStorage.getItem('secretKey', (error, result) => this.setState({ secret_key: result }))
    AsyncStorage.getItem('cvStatus', (error, result) => this.setState({ cvStatus: result }))

  }

  // componentDidUpdate() {
  //   if (!this.state.userSv) {

  //   }
  // }


  componentWillUnmount() {
    this.keyboardDidShowSubscription.remove();
    this.keyboardDidHideSubscription.remove();
    this._isMounted = false;
    this.setState = (state, callback) => {
      return;
    };
  }

  onChangeText(key, val) {
    this.setState({
      userSv: {
        ...this.state.userSv, [key]: val
      }
    })
  }
  onChange(e) {
    console.log(e)
  }

  handleObjective = (val, err) => {
    //  console.log('obj',err);
    val && this.setState({
      userSv: {
        ...this.state.userSv, objective: val
      }
    })
    this.setState({
      error: {
        ...this.state.error, objectiveErr: err ? err : null
      }
    })
  }


  handleSkills = (val, err) => {
    val && this.setState({
      userSv: {
        ...this.state.userSv, skills: val
      }
    })
    this.setState({
      error: {
        ...this.state.error, skillsErr: err ? err : null
      }
    })
  }
  handleExperience = (val, err) => {
    val && this.setState({
      userSv: {
        ...this.state.userSv, experience: val
      }
    })
    this.setState({
      error: {
        ...this.state.error, experienceErr: err ? err : null
      }
    })
  }

  handleCertification = (val, err) => {
    console.log('err345235', err);
    val && this.setState({
      userSv: {

        ...this.state.userSv, certification: val
      }
    })
    this.setState({
      error: {
        ...this.state.error, certificationErr: err ? err : null
      }
    })
  }

  handleAdditionalInfo = (val, err) => {
    val && this.setState({
      userSv: {
        ...this.state.userSv, additional_info: val
      }
    })
    this.setState({
      error: {
        ...this.state.error, additionalInfoErr: err ? err : null
      }
    })
  }

  handleGender = (val) => {
    val && this.setState({
      userSv: {
        ...this.state.userSv, gender: val
      }
    })
  }

  handleBirthday = (val) => {
    val && this.setState({
      userSv: {
        ...this.state.userSv, birthday: val
      }
    });
  }

  handleMajor = (val) => {
    val && this.setState({
      userSv: {
        ...this.state.userSv, major: val
      }
    })
  }

  handleTypeStudent = (val) => {
    val && this.setState({
      userSv: {
        ...this.state.userSv, type_of_student: val
      }
    })
  }

  async handleSubmitForm() {
   

    // if (avatar) {
    //   console.log('24', userSv);
    //   const form = new FormData();
    //   await form.append("image", {
    //     name: "avatar.jpg",
    //     uri: avatar[0].uri,
    //     type: "image/jpg",
    //   });
    //   let dataImg = { secret_key, image: form };
    //   console.log('te', dataImg)
    //   await getApi.post('user/student-update-image', dataImg)
    //     .then(response => console.log(response)
    //     .catch(error => {
    //       error.response &&  
    //       ToastAndroid.showWithGravity(
    //       `${error.response.data.errors.message}`,
    //        5,
    //        ToastAndroid.CENTER
    //      );
    //      })
    //       //   {
    //       //   if(response.status == 1){
    //       //     ToastAndroid.showWithGravity(
    //       //       "Cập nhật avatar thành công",
    //       //       5,
    //       //       ToastAndroid.CENTER
    //       //     );

    //       //   }else {
    //       //     ToastAndroid.showWithGravity(
    //       //       "Cập nhật avatar thất bại",
    //       //       5,
    //       //       ToastAndroid.CENTER
    //       //     );
    //       //   }
    //       // }
    //     )
    // }
    const { navigation } = this.props;
   // navigation.navigate('Home');
    const { userSv, error, secret_key } = this.state;
    const { titleJob, avatar } = this.props;
    
    const isEmptyError = Object.values(error).every(x => x === null || x === '');
    const isEmptyUser = Object.values(userSv).every(x => x === null || x === '');
   
    if (isEmptyError && !isEmptyUser && secret_key) {
      if (this.props.titleJob) {

        await this.setState({
          userSv: {
            ...userSv, title_job: titleJob, secret_key: secret_key,
          }
        })
       
        //  const params = await JSON.stringify(this.state.userSv);
        // await console.log('24HJD', avatar[0].uri)
        await getApi.post('user/update-cv', this.state.userSv)
          .then((response) => {
            if (response.status === 200) {
              ToastAndroid.showWithGravity(
                "Cập nhật cv thành công",
                5,
                ToastAndroid.CENTER
              );
             
            } else if (response.status === 500) {
              console.log("Lỗi server")
              ToastAndroid.showWithGravity(
                "Cập nhật thất bại , vui lòng thử lại sau",
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

        // const form = new FormData();
        // await form.append("image", {
        //     name: "avatar",
        //     uri: avatar[0].uri,
        //     type: "image/jpg",
        // });
        // await getApi.post('user/student-update-image',form)
        // .then((response) => {
        //   if(response.status === 200){
        //     ToastAndroid.showWithGravity(
        //       "Cập nhật avatar thành công",
        //       5,
        //       ToastAndroid.CENTER
        //     );

        //   }else if(response.status === 500){
        //     ToastAndroid.showWithGravity(
        //       "Cập nhật avatar thất bại",
        //       5,
        //       ToastAndroid.CENTER
        //     );
        //   }
        // })


      }

      this.props.handleSendData();
    }
  }

  handleCheckErrText(val) {
    const textErr = 'Đây là trường bắt buộc không được phép để trống';
    const { fullName, phonenumber, email, address } = this.state.userSv;

    switch (val) {
      case 'fullName':
        (fullName.length > 2) ? this.setState({ error: { ...this.state.error, fullnameErr: '' } })
          : this.setState({ error: { ...this.state.error, fullnameErr: textErr } })
        break;
      case 'phonenumber':
        if (phonenumber % 1 === 0) {
          if (phonenumber.length !== 10) {
            this.setState({ error: { ...this.state.error, phoneNumberErr: 'Số điện thoại phải có 10 số' } })
          } else {
            this.setState({ error: { ...this.state.error, phoneNumberErr: '' } })
          }
        }
        else {
          this.setState({ error: { ...this.state.error, phoneNumberErr: 'Số điện thoại là một chuỗi số' } })
        }
        break;
      case 'email': {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (email.length < 1) {
          this.setState({ error: { ...this.state.error, emailError: textErr } })
        }
        else {
          if (reg.test(email)) {
            this.setState({ error: { ...this.state.error, emailError: '' } })
          }
          else {
            this.setState({ error: { ...this.state.error, emailError: 'Sai định dạng email' } })
          }
        }
        break;
      }
      case 'address': {
        (address.length > 2) ? this.setState({ error: { ...this.state.error, addressErr: '' } })
          : this.setState({ error: { ...this.state.error, addressErr: textErr } })
        break;
      }
    }

  }

  render() {

    
    const { error, userSv, dataStructure } = this.state;
   
    const { objective,
      fullName,
      gender,
      birthday,
      phonenumber,
      email,
      address,
      skills,
      name_of_school,
      experience,
      major,
      type_of_student,
      certification,
      additional_info
    } = userSv;
    return (

      <View style={styles.container}
      >
        <View style={styles.viewInput}>
          <Text style={styles.labelText}>Mục tiêu</Text>

          <ObjectiveInput handleObjective={this.handleObjective} objectiveData={objective} />
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 40, justifyContent: 'flex-start' }}>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="address-book" size={21}
              color={'#fff'}
            />
            <Text style={styles.labelSection}>Thông tin cá nhân</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
        </View>

        <View style={styles.viewInput}>
          <Text style={styles.labelText}>Full name</Text>
          <TextInput
            style={styles.inputText}
            value={fullName}
            autoCapitalize="none"
            name="fullName"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('fullName', val)}
            onBlur={() => this.handleCheckErrText('fullName')}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.textError}>{error.fullnameErr && error.fullnameErr}</Text>
        </View>

        <View style={styles.viewInputDropDown}>
          <Text style={styles.labelText}>Giới tính</Text>
          <SelectGender handleGender={this.handleGender} genderData={gender} />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelText}>Ngày sinh</Text>
          <DatePickerInput handleBirthday={this.handleBirthday} birthdayData={birthday} />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelText}>Số điện thoại</Text>
          <TextInput
            style={styles.inputText}
            value={phonenumber}
            autoCapitalize="none"
            name="phonenumber"
            placeholderTextColor='white'
            onBlur={() => this.handleCheckErrText('phonenumber')}
            onChangeText={val => this.onChangeText('phonenumber', val)}
          />
          <Text style={styles.textError}>{error.phoneNumberErr && error.phoneNumberErr}</Text>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.inputText}
            value={email}
            autoCapitalize="none"
            name="email"
            placeholderTextColor='white'
            onBlur={() => this.handleCheckErrText('email')}
            onChangeText={val => this.onChangeText('email', val)}
          />
          <Text style={styles.textError}>{error.emailError && error.emailError}</Text>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelText}>Địa chỉ liên hệ</Text>
          <TextInput
            style={styles.inputText}
            value={address}
            autoCapitalize="none"
            name="address"
            placeholderTextColor='white'
            onBlur={() => this.handleCheckErrText('address')}
            onChangeText={val => this.onChangeText('address', val)}
          />
          <Text style={styles.textError}>{error.addressErr && error.addressErr}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 40, justifyContent: 'flex-start' }}>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="briefcase" size={21}
              color={'#fff'}
            />
            <Text style={styles.labelSectionEducation}>Education</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelText}>Tên trường</Text>
          <TextInput
            style={styles.inputText}
            value={name_of_school}
            autoCapitalize="none"
            name="name_of_school"
            editable={false}
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('name_of_school', val)}
          />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelText}>Ngành học</Text>
          <SelectMajor handleMajor={this.handleMajor} majorData={major} />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelText}>Khóa</Text>
          <SelectTypeStudent handleTypeStudent={this.handleTypeStudent} typeofstudent={type_of_student} />
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 40, justifyContent: 'flex-start' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="tools" size={21}
              color={'#fff'}
            />
            <Text style={styles.labelSectionSkill}>Skills</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
        </View>

        <View style={styles.viewInput}>
          <SkillsInput handleSkills={this.handleSkills} skillData={skills} />
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 40, justifyContent: 'flex-start' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="network-wired" size={21}
              color={'#fff'}
            />
            <Text style={styles.labelSectionExperience}>Work Experience</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
        </View>
        <View style={styles.viewInput}>
          <ExperienceInput handleExperience={this.handleExperience} experienceData={experience} />
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 40, justifyContent: 'flex-start' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="certificate" size={21}
              color={'#fff'}
            />
            <Text style={styles.labelSectionCertification}>Certifications</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
        </View>
        <View style={styles.viewInput}>
          <CertificationInput handleCertification={this.handleCertification} certificationData={certification} />
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 40, justifyContent: 'flex-start' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="pen" size={21}
              color={'#fff'}
            />
            <Text style={styles.labelSectionAddtionalInfo}>Additional Information</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
        </View>
        <View style={styles.viewInput}>
          <AddtionalInfoInput handleAdditionalInfo={this.handleAdditionalInfo} additionalData={additional_info} />
        </View>
        <View style={styles.viewBtnSubmit}>
          <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmitForm.bind(this)}>
            <Text style={styles.btnText}>{this.state.cvStatus === 'update' ? 'Cập nhật hồ sơ': 'Đăng kí hồ sơ'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewBottom}>

        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#09D6BF',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 20,
    width: '100%'
  },
  labelText: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'Gluten-ExtraLight'
  },
  labelSection: {
    width: 200,
    fontSize: 20,
    fontFamily: 'Gluten-Regular',
    color: '#fff',
    marginLeft: 8
  },
  inputText: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Gluten-ExtraLight'
  },
  textError: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#A12121'
  },
  viewInput: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,

  },
  viewInputDropDown: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 40,

  },
  labelSectionSkill: {
    width: 80,
    fontSize: 20,
    fontFamily: 'Gluten-Regular',
    color: '#fff',
    marginLeft: 8
  },
  labelSectionEducation: {
    width: 130,
    fontSize: 20,
    fontFamily: 'Gluten-Regular',
    color: '#fff',
    marginLeft: 8,
  },
  labelSectionExperience: {
    width: 189,
    fontSize: 20,
    fontFamily: 'Gluten-Regular',
    color: '#fff',
    marginLeft: 8,
  },
  labelSectionCertification: {
    width: 167,
    fontSize: 20,
    fontFamily: 'Gluten-Regular',
    color: '#fff',
    marginLeft: 8,
  },
  labelSectionAddtionalInfo: {
    width: 250,
    fontSize: 20,
    fontFamily: 'Gluten-Regular',
    color: '#fff',
    marginLeft: 8,
  },
  viewBottom: {
    marginBottom: 400
  },
  viewBtnSubmit: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40,
    width: '100%',
  }
  ,
  submitBtn: {
    marginLeft: '25%',
    color: '#fff',
    width: '50%',
    height: 47,
    borderRadius: 5,
    backgroundColor: '#278DCB',
    display: 'flex',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'Gluten-Regular',
    left: '13%'
  }
})
