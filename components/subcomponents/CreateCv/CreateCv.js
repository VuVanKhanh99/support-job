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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AvatarPicker from './Avatar/AvatarPicker';
import BodyCv from './BodyCv/BodyCv';
import { getApi } from '../../../configApi';

function CreateCv() {
    const [userData,setUserData ] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [titleJob, setTitleJob] = useState(null);
    const [bodyCv, setBodyCv] = useState(null);
    const [titleJobErr, setTitleJobErr] = useState(null);
     const dispatch = useDispatch();
     dispatch({type:'GET-INFO'});
     const infoUser = useSelector(state => state.userSlice.data);
     useEffect(() => {
        setTitleJob(infoUser?.title_job);
     }, [])
    // useEffect(()=>{
   
    //     async function initialFunc(){
    //      // AsyncStorage.getItem('idUser', (error, result) => console.log('test'))
    //      const test = AsyncStorage.getItem('idUser');
    //      const result =  getApi.get(`user/get-one-info?id=${test}`)
    //      .catch(error => {
    //       error.response &&  
    //       ToastAndroid.showWithGravity(
    //       `${error.response.data.errors.message}`,
    //        5,
    //        ToastAndroid.CENTER
    //      );
    //      })
    //      setUserData(result.data.data);
    //     }
    //     initialFunc();
    //   },[])


    const SendFileToBackend = (uri, id) => {
        const form = new FormData();
        form.append("Files", {
            name: `anh.jpg`,
            uri: uri,
            type: "image/jpg",
        });
    };



    useEffect(() => {
        async function getData(){
           if(bodyCv && titleJob){
           await setBodyCv({...bodyCv,titleJob:titleJob})
            }
           // avatar && bodyCv && SendFileToBackend(avatar[0].uri)
        }
      
        getData();
    }, [bodyCv])

    

    const handleSendData = async () => {
        if (bodyCv && titleJob) {
           // console.log('test', bodyCv)
        }
        // avatar && bodyCv && SendFileToBackend(avatar[0].uri)

        await bodyCv && console.log(bodyCv);
    }

    const handleTitle = () => {
        setTitleJobErr(null)
        // setTitleJob()
    }

    const handleCheckTitle = () => {
        setTitleJobErr((titleJob.length < 3) ? 'Đây là trường bắt buộc không được phép để trống' : handleTitle())
    }
    
    return (
        <ScrollView>
            <SafeAreaView style={styles.backgroundStyle}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        alignSelf: 'center',
                        height: 185,
                        top: 20
                    }}
                >
                    {avatar && console.log('734WER', avatar[0].uri)}
                    {avatar ?

                        <Image source={{ uri: avatar[0].uri }}
                            style={styles.avatarStyle}
                        />
                        :
                        <FontAwesome5 name={'user-circle'} size={89}
                            color={'#748c94'}
                        />
                    }
                    <AvatarPicker setAvatar={setAvatar} />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.labelText}>Tên công việc</Text>
                    <TextInput
                        style={styles.inputText}
                        value={titleJob}
                        autoCapitalize="none"
                        name="titleJob"
                        placeholderTextColor='white'
                        onBlur={handleCheckTitle}
                        onChangeText={val => setTitleJob(val)}
                    />
                    <Text style={styles.textError}>{titleJobErr && titleJobErr}</Text>
                </View>
                <ScrollView style={styles.bodyCv}>
                    <BodyCv titleJob={!titleJobErr && titleJob} userData={infoUser} handleSendData={handleSendData} avatar={avatar} />
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
        justifyContent: 'space-between',
        marginTop: 20,
        width: '90%',
        marginLeft: '5%'
    },
    labelText: {
        color: '#000',
        fontSize: 19,
        fontFamily: 'Gluten-ExtraLight'
    },
    inputText: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        color: '#000',
        textAlign:'center',
        fontSize: 17,
        fontFamily: 'Gluten-ExtraLight'
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
export default CreateCv
