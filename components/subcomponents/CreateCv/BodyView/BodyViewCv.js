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
  useWindowDimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import PaperSelect from 'react-native-paper-select';
//import DatePickerInput from '../BodyCv/components/DatePicker/DatePicker';
import ObjectiveInput from '../BodyCv/components/TextArea/Objective';
import SkillsInput from '../BodyCv/components/TextArea/Objective';
import ExperienceInput from '../BodyCv/components/TextArea/Experience';
import CertificationInput from '../BodyCv/components/TextArea/Certification';
import AddtionalInfoInput from '../BodyCv/components/TextArea/AddtionalInfo';
//import SelectGender from '../BodyCv/components/SelectInput/SelectGender';
//import SelectMajor from '../BodyCv/components/SelectInput/SelectMajor';
//import SelectTypeStudent from '../BodyCv/components/SelectInput/SelectTypeStudent';


const initialSv = {
  objective: '',
  fullname: '',
  gender: '',
  birthday: '',
  phone_number: '',
  email: '',
  address: '',
  skills: '',
  name_of_shools: '',
  experience: '',
  major: '',
  type_of_student: '',
  certification: '',
  additional_info: '',
}
export default class BodyViewCv extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userSv: { ...initialSv },
      keyboardStatus: null,
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
  }

  componentDidUpdate() {
    if (this.state.userSv !== this.props.dataBody) {
      this.props.dataBody && this.setState({ userSv: this.props.dataBody })
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowSubscription.remove();
    this.keyboardDidHideSubscription.remove();
  }

  render() {

    const { error, userSv } = this.state;
    const {dataBody} = this.props;
   
    return (

      <ScrollView style={styles.container}
      >
        <View style={styles.viewText}>
          <Text style={styles.labelText}>Mục tiêu</Text>
          <Text style={styles.textDescription}>{dataBody.objective}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 20, justifyContent: 'flex-start' }}>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="address-book" size={21}
              color={'#fff'}
            />
            <Text style={styles.labelSection}>Thông tin cá nhân</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
        </View>

        <View className={styles.viewSection}>
          <View style={styles.flexText}>
            <View style={styles.viewInput}>
              <FontAwesome5 name="user-alt" size={17}
                color={'#fff'}
              />
              <Text style={styles.inputText}>{this.props.dataBody?.gender}</Text>
            </View>
            <View style={styles.viewInputRight}>
              <FontAwesome5 name="calendar-times" size={17}
                color={'#fff'}
              />
              <Text style={styles.inputText}>{dataBody?.birthday}</Text>
            </View>
          </View>

          <View style={styles.flexText}>
            <View style={styles.viewInput}>
              <FontAwesome5 name="mobile-alt" size={17}
                color={'#fff'}
              />
              <Text style={styles.inputText}>{this.props.dataBody?.phone_number || this.props.dataBody?.phonenumber}</Text>

            </View>
            <View style={styles.viewInputRight}>
              <FontAwesome5 name="envelope" size={17}
                color={'#fff'}
              />
              <Text style={styles.inputText}>{dataBody?.email}</Text>
            </View>
          </View>
          <View style={styles.flexText}>
            <View style={styles.viewInput}>
              <FontAwesome5 name="map-marker-alt" size={17}
                color={'#fff'}
              />
              <Text style={styles.inputText}>{dataBody?.address}</Text>

            </View>
            <View style={styles.viewInputRight}>
            </View>
          </View>
        </View>


        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 20, justifyContent: 'flex-start' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="briefcase" size={21}
              color={'#fff'}
            />
            <Text style={styles.labelSectionEducation}>Education</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
        </View>

        <View className={styles.viewSection}>
          <View style={styles.flexText}>
            <View style={styles.viewInput}>
              <FontAwesome5 name="school" size={17}
                color={'#fff'}
              />
              <Text style={styles.inputText}>{dataBody?.name_of_school}</Text>
            </View>
            <View style={styles.viewInputLess}>
              <FontAwesome5 name="book-reader" size={16}
                color={'#fff'}
              />
              <Text style={styles.inputText}>{dataBody?.major}</Text>
            </View>
          </View>

          <View style={styles.flexText}>
            <View style={styles.viewInput}>
              <FontAwesome5 name="bookmark" size={18}
                color={'#fff'}
              />
              <Text style={styles.inputText}>{dataBody?.type_of_student}</Text>

            </View>
            <View style={styles.viewInputRight}>
            </View>
          </View>
        </View>


        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 20, justifyContent: 'flex-start' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="tools" size={21}
              color={'#fff'}
            />
            <Text style={styles.labelSectionSkill}>Skills</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
        </View>

        <View style={styles.viewInput}>
          <Text style={styles.inputText}>{dataBody.skills}</Text>
        </View>


        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 20, justifyContent: 'flex-start' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="network-wired" size={21}
              color={'#fff'}
            />
            <Text style={styles.labelSectionExperience}>Work Experience</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
        </View>
        <View style={styles.viewInput}>

          <Text style={styles.inputText}>{dataBody?.experience}</Text>

        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 20, justifyContent: 'flex-start' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="certificate" size={21}
              color={'#fff'}
            />
            <Text style={styles.labelSectionCertification}>Certifications</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
        </View>
        <View style={styles.viewInput}>

          <Text style={styles.inputText}>{dataBody?.certification}</Text>

        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 20, justifyContent: 'flex-start' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="pen" size={21}
              color={'#fff'}
            />
            <Text style={styles.labelSectionAddtionalInfo}>Additional Information</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
        </View>
        <View style={styles.viewInput}>

          <Text style={styles.inputText}>{dataBody?.additional_info}</Text>

        </View>
        {/* <View style={styles.viewBtnSubmit}>
          <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmitForm.bind(this)}>
            <Text style={styles.btnText}>Đăng kí hồ sơ</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.viewBottom}>

        </View>
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#09D6BF',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 20,
    width: '100%',
    paddingTop: 20
  },
  bottomStyle:{
    width:'100%',
    display:'flex',
    justifyContent:'space-around'
  },
  styleViewCv: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', width: '5%', flexDirection: 'row', height: '15%', backgroundColor: '#000', borderRadius: 5,
    marginLeft:10
},
  labelText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Slabo27px-Regular'
  },
  viewSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 550
  },
  flexText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  labelSection: {
    width: 200,
    fontSize: 20,
    fontFamily: 'Slabo27px-Regular',
    color: '#fff',
    marginLeft: 8
  },
  inputText: {
    color: '#fff',
    fontSize: 19,
    paddingLeft: 7,
    fontFamily: 'Slabo27px-Regular'
  },
  textDescription: {
    color: '#fff',
    fontSize: 21,
    fontFamily: 'Slabo27px-Regular'
  },
  viewText: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  viewInput: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: 10,
    alignItems: 'center',
    flexDirection: "row"
  },
  viewInputLess: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 15,
    width: '44%',
    alignItems: 'center',
    flexDirection: "row"
  },
  viewInputRight: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: 10,
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: "row"
  },
  viewInputDropDown: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 40,

  },
  labelSectionSkill: {
    width: 80,
    fontSize: 20,
    //   fontFamily: 'Gluten-Regular',
    color: '#fff',
    marginLeft: 8,
    fontFamily: 'Slabo27px-Regular'
  },
  labelSectionEducation: {
    width: 130,
    fontSize: 20,
    //   fontFamily: 'Gluten-Regular',
    color: '#fff',
    marginLeft: 8,
    fontFamily: 'Slabo27px-Regular'
  },
  labelSectionExperience: {
    width: 189,
    fontSize: 20,
    //   fontFamily: 'Gluten-Regular',
    fontFamily: 'Slabo27px-Regular',
    color: '#fff',
    marginLeft: 8,
  },
  labelSectionCertification: {
    width: 167,
    fontSize: 20,
    // fontFamily: 'Gluten-Regular',
    fontFamily: 'Slabo27px-Regular',
    color: '#fff',
    marginLeft: 8,
  },
  labelSectionAddtionalInfo: {
    width: 250,
    fontSize: 20,
    //  fontFamily: 'Gluten-Regular',
    fontFamily: 'Slabo27px-Regular',
    color: '#fff',
    marginLeft: 8,
  },
  viewBottom: {
    marginBottom: 30
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
    //fontFamily: 'Gluten-Regular',
    fontFamily: 'Slabo27px-Regular',
    left: '13%'
  }
})

