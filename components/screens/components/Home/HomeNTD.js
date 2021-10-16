import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    View, ImageBackground, Image, Text, ScrollView, TouchableHighlight, StyleSheet, Dimensions, SafeAreaView,
    StatusBar, ToastAndroid,TouchableOpacity,Button,TouchableNativeFeedback
} from 'react-native';

import { CommonActions, useNavigation } from '@react-navigation/native'
import { icons } from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApi } from '../../../../configApi';
import { groupBy } from 'lodash';
import Modal from 'react-native-modal';
import DropdownJobAc from '../Dropdown/DrowdownNTD/ViewDropdownAc';
import DropdownJobUnAc from '../Dropdown/DrowdownNTD/ViewDropdownUnAc';
import WatchCv from '../../../subcomponents/DetailJob/WatchCvModal/WatchCv';
import ViewCvNTD from '../../../subcomponents/CreateCv/ViewCvNTD';


export default function HomeNTD() {
    const [postActive, setPostActive] = useState([]);
    const [postUnActive, setPostUnActive] = useState([]);
    const [currJob, setCurrJob] = useState([]);
    const [actionSheet, setActionSheet] = useState(false);
    const [actionItem, setActionItem] = useState([]);
    const [dataSv, setDataSv] = useState([]);
    const [dataShow, setDataShow] = useState([]);
    const navigation = useNavigation();

    const handleWatchCv = (val) => {
       const test = dataSv.filter(item => item._id===val);
       setDataShow(test);
      
       // item && navigation.navigate('WatchCv',{idUser: item})
    }

    useEffect(() => {
        async function initialFunc() {
            const idUser = await AsyncStorage.getItem('idUser');
            const resultUnActive = await getApi.get("user/task/list-post-unactive")
                .catch(error => {
                    error.response &&
                        ToastAndroid.showWithGravity(
                            " `${error.response.data.errors.message}`",
                            5,
                            ToastAndroid.CENTER
                        );
                })
            const postUnAc = resultUnActive.data?.data.filter(item => item.task_owner_id === idUser);
            (postUnAc.length > 0) && setPostUnActive(postUnAc)
            const resultActive = await getApi.get("user/task/list-post-active")
                .catch(error => {
                    error.response &&
                        ToastAndroid.showWithGravity(
                            `${error.response.data.errors.message}`,
                            5,
                            ToastAndroid.CENTER
                        );
                })
            const postAc = resultActive?.data.data.filter(item => item.task_owner_id === idUser);
            (postAc.length > 0) && setPostActive(postAc);
        }

        initialFunc();
    }, [])

    useEffect(() => {
        async function getDataSv() {
            if (currJob.length > 0) {
                const data = currJob[0]?.list_student_apply;
                // console.log('an', data);
                var arrSv = [];
                await data.map((item) => {
                    getApi.get(`user/get-one-info?id=${item.idStudent}`).then(res => setDataSv([...dataSv, res.data.data]))
                })
            }
        }
        getDataSv();
    }, [currJob])

    useEffect(() => {
        
        if (dataSv.length > 0) {
            let arr = [];
            dataSv.map(item => {
                
                let obj = {
                    id: item.toString().charAt(1),
                    label: `${item?.fullName + "   " + item?.title_job}`,
                    onPress: () => handleWatchCv(item._id)
                }
                // arr=[...arr,obj];
                setActionItem([...actionItem, obj])
            })


        }
        // setActionItem([
        //     {
        //         id: 1,
        //         label: 'Take Photo',
        //         // onPress: () => openCamera()
        //     },
        //     {
        //         id: 2,
        //         label: 'Choose Photo Libray',
        //         // onPress: () => openCamera()
        //     }
        // ])

    }, [dataSv])

    useEffect(() => {
        // console.log('an27362', actionItem);
    }, [actionItem])

    const handleJobActive = (val) => {
        const result = postActive.filter(item => item.name_job === val);
        (result.length > 0) && setCurrJob(result);
    }

    const handleJobUnActive = (val) => {
        const result = postUnActive.filter(item => item.name_job === val);
        (result.length > 0) && setCurrJob(result);
    }

    const closeActionSheet = () => setActionSheet(false);

    const handleShowModal = () => {
        (currJob.length > 0) ?
        setActionSheet(true)
        :
        ToastAndroid.showWithGravity(
           "Bạn phải chọn job đã được phê duyệt",
             5,
             ToastAndroid.CENTER
           )
    }
    
    return (
        <>
        {   
            (dataShow.length >0) ? 
            <ViewCvNTD setDataShow={setDataShow} dataShow={dataShow}/>
            :
        <ScrollView style={{
            backgroundColor: "#f8f8f8",
            height: "100%",
            paddingHorizontal: 20,

        }}>
            <ImageBackground source={icons.dev2Icon}
                style={{ marginLeft: 50, width: "100%", height: 250 }}>
            </ImageBackground>
            <View style={{ marginTop: 10 }}>
                <DropdownJobAc dataList={postActive} handleJobActive={handleJobActive} type="active" />
            </View>
            <View style={{ marginTop: 10 }}>
                <DropdownJobUnAc dataList={postUnActive} handleJobUnActive={handleJobUnActive} type="unactive" />
            </View>
            {currJob.map(item => {
                return (
                    <View>
                        <View style={{
                            backgroundColor: "#FFF",
                            padding: 10,
                            borderRadius: 15,
                            marginTop: 20
                        }}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",

                            }}>
                                <View style={{ width: '100%' }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontFamily: "ExtraBold",
                                        fontWeight: 'bold'
                                    }}>{item?.name_job}
                                    </Text>

                                    <View style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexDirection: "row", alignItems: "center"
                                    }}>
                                        <Text style={{
                                            fontFamily: "ExtraBold",
                                            color: "#000",

                                            fontSize: 14
                                        }}>{item?.name_company}</Text>

                                        <Text style={{
                                            fontFamily: "Bold",
                                            fontSize: 13,
                                            color: "#1F080F",
                                            marginLeft: 25
                                        }}>{item?.location}</Text>

                                    </View>
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: 'space-between',

                                    }}>
                                        <Text style={{
                                            fontFamily: "ExtraBold",
                                            color: "#000",
                                            fontSize: 14
                                        }}>
                                            <FontAwesome5 name="clock" />
                                            <Text style={{ marginLeft: 6 }}>Hạn nộp hồ sơ : {item?.expires}</Text>
                                        </Text>
                                        {/* <TouchableHighlight onPress={() => console.log('an')}>
                                        <FontAwesome5 name="heart" color='#000' style={{ marginRight: 50 }} />
                                    </TouchableHighlight> */}

                                    </View>
                                </View>


                            </View>
                        </View>

                        <View style={{
                            display: 'flex',
                            flexDirection: "column",
                            marginTop: 20,
                            minHeight: 300,
                            width: '100%',
                            alignItems: 'flex-start',
                            justifyContent: 'space-around'
                        }}>
                            <View style={{
                                backgroundColor: "#FFF",
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                borderRadius: 8,
                                width: '100%'
                            }}>
                                <Text style={{
                                    fontFamily: "Roboto-Regular",
                                    color: "#1F080F",
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>Mô tả công việc</Text>

                                {
                                    item.task_description.map(item => (
                                        <Text style={{
                                            fontFamily: "ExtraBold",
                                            marginTop: 5

                                        }}>- {item}</Text>
                                    ))
                                }

                            </View>
                            <View style={{
                                backgroundColor: "#FFF",
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                borderRadius: 8,
                                width: '100%',
                                marginTop: 20
                            }}>
                                <Text style={{
                                    fontFamily: "Roboto-Regular",
                                    color: "#1F080F",
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>Yêu cầu ứng viên</Text>
                                {
                                    item.require_candidate[0].require.map(item => (
                                        <Text style={{
                                            fontFamily: "ExtraBold",
                                            marginTop: 5

                                        }}>- {item}</Text>
                                    ))
                                }
                            </View>
                            <View style={{
                                backgroundColor: "#FFF",
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                borderRadius: 8,
                                width: '100%'
                            }}>
                                <Text style={{
                                    fontFamily: "Roboto-Regular",
                                    color: "#1F080F",
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>Quyền lợi được hưởng</Text>

                                {
                                    item.benefits_enjoyed.map(item => (
                                        <Text style={{
                                            fontFamily: "ExtraBold",
                                            marginTop: 5
                                        }}>
                                            <FontAwesome5 name="hand-point-right" color="#000" fontSize={12} />
                                            <Text style={{
                                                paddingHorizontal: 5,
                                                paddingLeft: 10
                                            }}> {item}</Text>

                                        </Text>
                                    ))
                                }

                            </View>

                        </View>

                    </View>
                )
            })}

            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <TouchableOpacity activeOpacity={0.5} onPress={handleShowModal}
                    // onLongPress={handleShowModal}
                    // style={{
                    //     position:"absolute",zIndex: 0
                    // }}
                    style={styles.buttonStyle}
                >
                    <View style={{flex:1}}><Text style={styles.buttonText}>Xem danh sách sinh viên</Text></View>
                </TouchableOpacity>
               
                <Modal
                    isVisible={actionSheet}
                    style={{
                        margin: 0,
                        justifyContent: 'flex-end'
                    }}
                >
                    <WatchCv actionItems={actionItem}
                        onCancel={closeActionSheet} />
                </Modal>

            </SafeAreaView>
            <View style={{
                height: 140
            }}>

            </View>

        </ScrollView>
        }
        </>
    )
}

const styles = StyleSheet.create({
    submitBtn: {
        marginLeft: '15%',
        color: '#fff',
        width: '70%',
        height: 47,
        borderRadius: 5,
        backgroundColor: '#278DCB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    btnText: {
        color: '#fff',
        fontSize: 17,

    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginLeft: '5%',
        marginTop: 30,
    },
    buttonStyle: {
        height: 45,
        backgroundColor: 'rgb(0,98,255)',
        width: Dimensions.get('window').width - 220,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        // margin: 5
    },
    buttonText: {
        fontSize: 20,
        color: 'rgb(255,255,255)',
        fontFamily: 'Gluten-ExtraLight',
    }
})