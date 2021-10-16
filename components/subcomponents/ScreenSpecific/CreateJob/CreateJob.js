import React, { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, ImageBackground, Image, Text, ScrollView, TextInput, StyleSheet, ToastAndroid ,TouchableOpacity} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { icons } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputAddDes from './InputAddDes';
import InputAddRequired from './InputAddRequired';
import InputAddBenifit from './InputAddBenifit';
import DatePickerInput from '../../CreateCv/BodyCv/components/DatePicker/DatePicker';
import moment from 'moment';
import { getCurrentDay } from '../../Functions/days';
import { getApi } from '../../../../configApi';

function CreateJob() {
    const err = { nameJobErr: '', locationErr: '', expireErr: '' };
    const [desJob, setDesJob] = useState([]);
    const [valueDes, setValueDes] = useState([]);
    const [requiredJob, setRequired] = useState([]);
    const [valRequire, setValRequire] = useState([]);
    const [benefitJob, setBenefit] = useState([]);
    const [valBenefit, setValBenefit] = useState([]);
    const [nameJob, setNameJob] = useState(null);
    const [location, setLocation] = useState(null);
    const [expires, setExpires] = useState(moment(new Date()).add(1, 'months').format("DD-MM-YYYY"));
    const [error, setError] = useState(err);


    const handleAddDesJob = async () => {
        await (desJob.length === valueDes.length) &&
            setDesJob([...desJob,
            <InputAddDes desJob={desJob}
                key={desJob.length}
                setValueDes={setValueDes}
                valueDes={valueDes}
            />])
    }
    // console.log('wir',moment(new Date()).add(1, 'months').format("DD-MM-YYYY"))
    const handleCheckError = (val) => {
        const err = 'Đây là trường bắt buộc không được phép để trống';
        switch (val) {
            case 'jobname':
                nameJob ? setError({ ...error, nameJobErr: '' }) : setError({ ...error, nameJobErr: err });
                break;
            case 'location':
                location ? setError({ ...error, locationErr: '' }) : setError({ ...error, locationErr: err });
        }
    }

    const handleBirthday = async (val) => {


        var dateChoose = moment(val, "DD-MM-YYYY");
        var now = moment(getCurrentDay(), "DD-MM-YYYY");
        const err = "Hạn nộp hồ sơ phải lớn hơn ngày hiện tại hiện tại";

        if (moment(now).isBefore(dateChoose, 'day')) {
            setExpires(val);
            setError({ ...error, expireErr: '' })
            console.log("Go");
        } else {
            setError({ ...error, expireErr: err })
            ToastAndroid.showWithGravity(
                "Hạn nộp hồ sơ phải lớn hơn ngày hiện tại hiện tại",
                5,
                ToastAndroid.CENTER
            );
        }
        //  console.log('time',val);
    }

    const handleAddRequire = async () => {

        await (requiredJob.length === valRequire.length) &&
            setRequired([...requiredJob,
            <InputAddRequired requiredJob={requiredJob}
                key={requiredJob.length}
                setValRequire={setValRequire}
                valRequire={valRequire}
            />])
    }


    const handleAddBenifit = async () => {

        await (benefitJob.length === valBenefit.length) &&
            setBenefit([...benefitJob,
            <InputAddBenifit benefitJob={benefitJob}
                key={benefitJob.length}
                setValBenefit={setValBenefit}
                valBenefit={valBenefit}
            />])
    }
    const handlePostJob =async () => {
        const secret =await AsyncStorage.getItem('secretKey');
        const nameCompany = await AsyncStorage.getItem('nameCompany');
           
        console.log('secre',secret);
        if (!error.expireErr) {
            const isEmptyError = Object.values(error).every(x => x === null || x === '');
            if (isEmptyError) {

                const data = {
                    secret_key:secret,
                    name_job: nameJob,
                    task_description: valueDes,
                    location: location,
                    expires: expires,
                    name_company: nameCompany,
                    require: valRequire,
                    benefits_enjoyed: valBenefit
                }
                console.log(data);
                getApi.post('user/task/post-task',data).then(res => {
                    if(res.status === 200){
                        ToastAndroid.showWithGravity(
                            "Đăng bài tuyển dụng thành công",
                            5,
                            ToastAndroid.CENTER
                        );
                    }else{
                        ToastAndroid.showWithGravity(
                            "Lỗi hệ thống vui lòng thử lại sau",
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

        }
        else {
            ToastAndroid.showWithGravity(
                "Hạn nộp hồ sơ phải lớn hơn ngày hiện tại hiện tại",
                5,
                ToastAndroid.CENTER
            );
        }

    }

    console.log('ledSum', valueDes, valRequire, valBenefit);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>Tạo việc làm</Text>
                <View style={styles.viewInput}>
                    <Text style={styles.labelText}>Tên công việc</Text>
                    <TextInput
                        style={styles.inputText}
                        autoCapitalize="none"
                        name="jobname"
                        placeholderTextColor='white'
                        onChangeText={val => setNameJob(val)}
                        onBlur={() => handleCheckError('jobname')}
                    />
                    <Text style={styles.textError}>{error?.nameJobErr}</Text>
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.labelText}>Hạn nộp hồ sơ</Text>
                    <DatePickerInput handleBirthday={handleBirthday} />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.labelText}>Địa chỉ chi tiết của công ty</Text>
                    <TextInput
                        style={styles.inputText}
                        autoCapitalize="none"
                        name="fullName"
                        placeholderTextColor='white'
                        onChangeText={val => setLocation(val)}
                        onBlur={() => handleCheckError('location')}
                    />
                    <Text style={styles.textError}>{error.locationErr}</Text>
                </View>

                <View style={styles.viewSection}>
                    <View style={styles.viewInput}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, marginTop: 10, alignItems: 'center', justifyContent: 'flex-start' }}>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome5 name="address-book" size={21}
                                    color={'#fff'}
                                />
                                <Text style={styles.labelSectionDescript}>Mô tả công việc</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
                        </View>

                        <TouchableOpacity style={styles.addField} onPress={handleAddDesJob}>
                            <FontAwesome5 name="plus" fontSize={50} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewInput}>
                        {
                            desJob.length > 0 && desJob.map(item => (
                                item
                            ))
                        }
                    </View>
                </View>

                <View style={styles.viewSection}>
                    <View style={styles.viewInput}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, marginTop: 30, alignItems: 'center', justifyContent: 'flex-start' }}>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome5 name="address-book" size={21}
                                    color={'#fff'}
                                />
                                <Text style={styles.labelSectionDescript}>Yêu cầu ứng viên</Text>
                            </View>

                            <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
                        </View>

                        <TouchableOpacity style={styles.addField} onPress={handleAddRequire}>
                            <FontAwesome5 name="plus" fontSize={50} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addFieldBottom} >
                            <FontAwesome5 name="plus" fontSize={50} color="#fff" />
                            <Text style={{
                                color: '#fff',
                                fontSize: 17,
                                fontFamily: 'Gluten-ExtraLight',
                                marginLeft: 10
                            }}>Ưu tiên (Optional)</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewInput}>

                        {
                            requiredJob.length > 0 && requiredJob.map(item => (
                                item
                            ))
                        }
                    </View>
                </View>

                <View style={styles.viewSection}>
                    <View style={styles.viewInput}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, marginTop: 30, alignItems: 'center', justifyContent: 'flex-start' }}>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome5 name="address-book" size={21}
                                    color={'#fff'}
                                />
                                <Text style={styles.labelSectionBenefit}>Quyền lợi được hưởng</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
                        </View>

                        <TouchableOpacity style={styles.addField} onPress={handleAddBenifit}>
                            <FontAwesome5 name="plus" fontSize={50} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewInput}>
                        {
                            benefitJob.length > 0 && benefitJob.map(item => (
                                item
                            ))
                        }
                    </View>

                </View>
                <TouchableOpacity style={styles.buttonSubmit} onPress={handlePostJob}>
                    <Text style={styles.btnText}>Đăng bài tuyển dụng</Text>
                </TouchableOpacity>
                <View style={styles.bottomView}>

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#09D6BF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 50,
    },
    viewSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    bottomView: {
        height: 100,
    },
    btnText: {
        color: '#fff',
        fontSize: 19,
        fontFamily: 'Gluten-Light',
        padding: 5,
    },
    labelSectionDescript: {
        width: 200,
        fontSize: 20,
        fontFamily: 'Gluten-Regular',
        color: '#fff',
        marginLeft: 8
    },
    labelSectionBenefit: {
        width: 250,
        fontSize: 20,
        fontFamily: 'Gluten-Regular',
        color: '#fff',
        marginLeft: 8
    },
    viewInput: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '93%'
    },
    labelText: {
        color: '#fff',
        fontSize: 19,
        fontFamily: 'Gluten-ExtraLight'
    },
    inputText: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Gluten-ExtraLight'
    },
    inputAdd: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Gluten-ExtraLight',
        marginBottom: 10
    },
    textError: {
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        color: '#A12121'
    },
    addField: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        height: 43,
        fontFamily: 'Gluten-ExtraLight',
        display: 'flex',
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "center"
    },
    buttonSubmit: {
        borderRadius: 5,
        backgroundColor: '#1B5D89',
        color: '#fff',
        height: 43,
        fontFamily: 'Gluten-ExtraLight',
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        width: '70%'
    },
    addFieldBottom: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        height: 43,
        fontFamily: 'Gluten-ExtraLight',
        display: 'flex',
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "center",
        marginTop: 5
    }
})

export default CreateJob
