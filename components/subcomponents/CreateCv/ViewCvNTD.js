import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    ScrollView,
    useWindowDimensions
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { borderTop } from 'styled-system';
import { CommonActions, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AvatarPicker from './Avatar/AvatarPicker';
import BodyViewCv from './BodyView/BodyViewCv';
import { getIdUser, getToken } from '../constants/values';
import { getApi } from '../../../configApi';
import BodyViewNTD from './BodyView/BodyViewNTD';

function ViewCvNTD(props) {

    const {dataShow, setDataShow} = props;
    console.log(dataShow[0]);
   // const { idUser } = route.params;
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState(null);
    const [titleJob, setTitleJob] = useState(null);
    const [bodyCv, setBodyCv] = useState(null);

    useEffect(() => {

        async function initialFunc() {
            // AsyncStorage.getItem('idUser', (error, result) => console.log('test'))
            // const test = await AsyncStorage.getItem('idUser');
            // if (idUser) {
            //     const result = await getApi.get(`user/get-one-info?id=${idUser}`)
            //         .catch(error => {
            //             error.response &&
            //                 ToastAndroid.showWithGravity(
            //                     `${error.response.data.errors.message}`,
            //                     5,
            //                     ToastAndroid.CENTER
            //                 );
            //         })
            //     setUserData(result.data.data);
            // }
           
            setUserData(dataShow[0])
        }
        initialFunc();
    }, [])

    const SendFileToBackend = (uri, id) => {
        const form = new FormData();
        form.append("Files", {
            name: `avartar${id || null}.jpeg`,
            uri: uri,
            type: "image/jpg",
        });
    };


    useEffect(() => {

        // if(bodyCv){
        //     setBodyCv({...bodyCv,titleJob:titleJob})
        // }
        // avatar && bodyCv && SendFileToBackend(avatar[0].uri)
        // if(userData){
        //     setTitleJob(userData.titleJob)
        // }
    }, [])

    const handleCheckTitle = () => {
        setTitleJobErr((titleJob.length < 3) ? 'Đây là trường bắt buộc không được phép để trống' : null)
    }
    const handleGoBack=()=>{
       // navigation.navigate("user-home");
      //  navigation.goBack();
      setDataShow([]);
    }
 
    return (
        <ScrollView>
            <SafeAreaView style={styles.backgroundStyle}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        display: 'flex',
                        alignSelf: 'center',
                        justifyContent: 'flex-start',
                        height: 185,
                        top: 20
                    }}
                >
                   
                    {avatar ?

                        <Image source={{ uri: avatar[0].uri }}
                            style={styles.avatarStyle}
                        />
                        :
                        <FontAwesome5 name={'user-circle'} size={89}
                            color={'#748c94'}
                        />
                    }

                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.namePerson}>{userData?.fullName}</Text>
                    <Text style={styles.labelText}>{userData?.title_job}</Text>
                </View>
                <ScrollView style={styles.bodyCv}>
                    <BodyViewNTD dataBody={userData} setBodyCv={setBodyCv} handleGoBack={handleGoBack} />
                </ScrollView>
                
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    avatarStyle: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderWidth: 1
    },
    textError: {
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        color: '#A12121'
    },
    backgroundStyle: {
        display: 'flex',
        justifyContent: 'center'
    },

    viewInput: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: 20,
        width: '90%',
        marginLeft: '5%',
        alignItems: 'center'
    },
    labelText: {
        color: '#000',
        fontSize: 19,
        fontFamily: 'Slabo27px-Regular'
    },
    namePerson: {
        color: '#000',
        fontSize: 22,
        //  fontFamily: 'Gluten-ExtraLight',
        //   fontFamily: 'ScheherazadeNew-Regular',
        fontFamily: 'Slabo27px-Regular'
    },
    inputText: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        color: '#000',
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'Gluten-ExtraLight',
        borderWidth: 0,
        borderBottomWidth: 1
    },
    btnAvatar: {
        borderRadius: 3,
        backgroundColor: '#54948D',
        color: '#fff',
        width: 100,
        height: 40,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyCv: {
        marginTop: 20
    }
})
export default ViewCvNTD
