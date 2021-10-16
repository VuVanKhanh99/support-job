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
import { getApi } from '../../../../../../configApi';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const initialSv = {
//     name_company: '',
//     fullname: '',
//     email: '',
//     phonenumber: '',
//     phone_number: '',
//     name_Hr: '',
//     company_summary: '',
//     address: '',
// }

export default class ShowSummary extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     userNtd: this.props.dataBody ? this.props.dataBody : { ...initialSv },
        //     keyboardStatus: null,
        //     // error: {
        //     //     objectiveErr: '',
        //     //     fullnameErr: '',
        //     //     phoneNumberErr: '',
        //     //     experienceErr: '',
        //     //     certificationErr: '',
        //     //     skillsErr: '',
        //     //     additionalInfoErr: '',
        //     //     emailError: '',
        //     //     addressErr: ''
        //     // }
        // }
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
    }

    componentWillUnmount() {
        this.keyboardDidShowSubscription.remove();
        this.keyboardDidHideSubscription.remove();
    }

    async handleSubmitForm() {
        const {_id} = this.props.dataBody;
        const secret_key = await AsyncStorage.getItem('secretKey');
        const dataTest = {secret_key,"arrIdCompany":[_id]};
        console.log('id', dataTest);
        if(secret_key && _id){
            getApi.post('user/confirm-account',{secret_key,"arrIdCompany":[_id]})
            .then(res => {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Phê duyệt tài khoản thành công !',
                    // text2: 'Login sucessfully !',
                    visibilityTime: 4000,
                    fontSize: 35,
                    autoHide: true,
                    topOffset: 10,
                    bottomOffset: 30,
                  });
            })
            .catch(err => 
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Login Nofication',
                    text2: 'Lỗi hệ thống vui lòng thử lại sau',
                    visibilityTime: 4000,
                    fontSize: 25,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                  })
            )

        }
    }


    render() {

        //const { userNtd } = this.state;
        const { name_company,
            fullname,
            email,
            phonenumber,
            name_Hr,
            company_summary,
            address } = this.props.dataBody;
        return (

            <ScrollView style={styles.container}
            >
                <View style={styles.viewText}>
                    <Text style={styles.labelText}>Tên công ty</Text>
                    <Text style={styles.textDescription}>{name_company}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 20, justifyContent: 'flex-start' }}>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name="address-book" size={21}
                            color={'#fff'}
                        />
                        <Text style={styles.labelSection}>Thông tin công ty</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
                </View>
                <Toast ref={ref => Toast.setRef(ref)} />
                <View className={styles.viewSection}>
                    <View style={styles.flexText}>
                        <View style={styles.viewInput}>
                            <FontAwesome5 name="user-alt" size={17}
                                color={'#fff'}
                            />
                            <Text style={styles.inputText}>{name_Hr}</Text>
                        </View>
                        <View style={styles.viewInputRight}>
                            <FontAwesome5 name="mobile-alt" size={17}
                                color={'#fff'}
                            />
                            <Text style={styles.inputText}>{phonenumber}</Text>
                        </View>
                    </View>

                    <View style={styles.flexText}>
                        {/* <View style={styles.viewInput}>
                            <FontAwesome5 name="mobile-alt" size={17}
                                color={'#fff'}
                            />
                            <Text style={styles.inputText}>{userSv.phone_number}</Text>

                        </View> */}
                        <View style={styles.viewInputFull}>
                            <FontAwesome5 name="envelope" size={17}
                                color={'#fff'}
                            />
                            <Text style={styles.inputText}>{email}</Text>
                        </View>
                    </View>
                    <View style={styles.flexText}>
                        <View style={styles.viewInput}>
                            <FontAwesome5 name="map-marker-alt" size={17}
                                color={'#fff'}
                            />
                            <Text style={styles.inputText}>{address}</Text>

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
                        <Text style={styles.labelSectionAddtionalInfo}>Summary about company</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
                </View>

                <View style={styles.viewInput}>
                    <Text style={styles.inputText}>{company_summary}</Text>
                </View>

                <View style={styles.viewBtnSubmit}>
                    <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmitForm.bind(this)}>
                        <Text style={styles.btnText}>Duyệt hồ sơ</Text>
                    </TouchableOpacity>
                </View>
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
    bottomStyle: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    styleViewCv: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', width: '5%', flexDirection: 'row', height: '15%', backgroundColor: '#000', borderRadius: 5,
        marginLeft: 10
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
        marginTop: 5,
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
    viewInputFull: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: 10,
        width: '100%',
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
        marginBottom: 200
    },
    viewBtnSubmit: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50,
        width: '100%',
    }
    ,
    submitBtn: {
        marginLeft: '25%',
        color: '#fff',
        width: '50%',
        height: 45,
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
        marginLeft:'25%'
    }
})

