import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    View, ImageBackground, Image, Text, ScrollView, TouchableHighlight, StyleSheet, Dimensions, SafeAreaView,
    StatusBar, ToastAndroid, TouchableOpacity, Button, TextInput
} from 'react-native';

import { CommonActions, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { groupBy } from 'lodash';
import Modal from 'react-native-modal';
import { getApi } from '../../../../../../configApi';
import PenAcc from './PenAcc/PenAcc';
import PenJob from './PenJob/PenJob';



export default function NTDController() {
    const [penAcc, setPenAcc] = useState(false);
    const [penJob, setPenJob] = useState(false);
    const [list, setList] = useState(false);
    const [dataNtd, setDataNtd] = useState([]);
    const [dataIni, setDataIni] = useState([]);
    const [textSearch, setTextSearch] = useState(null);

    useEffect(() => {
        async function initialFunc() {
            getApi.get('user/get-list-ntd-active')
                .then(res => {
                    setDataIni(res.data?.data);
                    setDataNtd(res.data?.data);
                })
                .catch(err =>
                    ToastAndroid.showWithGravity(
                        "Không thể lấy được danh sách nhà tuyển dụng",
                        5,
                        ToastAndroid.CENTER
                    ))
        }
        initialFunc();
    }, [])
    // console.log('2328q',dataNtd);
    const handleSearch = (val) => {
        setTextSearch(val)
        if (val) {
            const dataSearch = dataNtd.filter(item => {
                return item.name_company?.toUpperCase().includes(val.toUpperCase())
            })
            setDataNtd(dataSearch);
            console.log('VAL', dataSearch);
        }
        else{
            setDataNtd(dataIni);
        }
        

    }


    return (
        <ScrollView style={{
            backgroundColor: "#f8f8f8",
            height: "100%",
            width: '100%',
            paddingHorizontal: 20,

        }}>

            <View style={{
                backgroundColor: "#FFF",
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                height: 43,
                borderWidth: 1,
                borderColor: '#000',
                display: 'flex',
                overflow: 'hidden',
                justifyContent: 'space-between'
            }}>
                <TextInput
                    placeholder="Nhập tên nhà tuyển dụng muốn tìm"
                    placeholderTextColor="#8B8D8E"
                    style={{
                        fontFamily: "Medium",
                        paddingHorizontal: 10,
                        width: '80%',
                    }}
                    value={textSearch}
                    onChangeText={handleSearch}
                />

                <TouchableOpacity style={{
                    width: '30%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#000',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    height: 48
                }}>
                    <FontAwesome5 name="search" color='#fff' fontSize={30} style={{ marginRight: 33 }} />
                </TouchableOpacity>
            </View>
            { textSearch && (dataNtd.length > 0)   ?
            <View style={styles.containerNtd}>
                {
                     dataNtd.map(item => {
                        
                        return (
                            <View style={styles.itemView} key={item._id}>
                                <Text style={styles.textLabel}>{item?.name_company}</Text>
                                <View style={styles.containerBtn}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                       
                                        style={styles.detail}>
                                        <Text style={styles.btnTextDetail} >Chi tiết</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity
                                        activeOpacity={0.9}
                                        style={styles.approve}
                                       // onPress={() => handleApprove(item._id)}
                                    >
                                        <Text style={styles.btnTextApprove}>Phê duyệt</Text>
                                    </TouchableOpacity> */}
                                </View>

                            </View>
                        )
                    })
                }
                <View style={{
                    height: 20
                }}>
                </View>
            </View> : null
            }
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setPenAcc(!penAcc)}
                    style={styles.pendingBtn}>
                    <Text style={styles.btnText}>Các tài khoản chờ duyệt</Text>
                </TouchableOpacity>
                {
                    penAcc && <PenAcc />
                }
                <TouchableOpacity
                    accessible={true}
                    activeOpacity={0.9}
                    onPress={() => setPenJob(!penJob)}
                    style={styles.jobPendingBtn}>
                    <Text style={styles.btnText}>Các job chờ duyệt</Text>
                </TouchableOpacity>
                {
                    penJob && <PenJob />
                }
                <TouchableOpacity
                    accessible={true}
                    activeOpacity={0.9}
                    onPress={() => setList(!list)}
                    style={styles.listBtn}>
                    <Text style={styles.btnText}>Danh sách nhà tuyển dụng</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                height: 400
            }}>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pendingBtn: {
        width: '95%',
        borderRadius: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#009688',
    },
    jobPendingBtn: {
        width: '95%',
        borderRadius: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#717571',
    },
    listBtn: {
        width: '95%',
        borderRadius: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#4BAEEE',
    },
    container: {
        display: 'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 780,
    },
    btnText: {
        fontSize: 19,
        fontFamily: 'Roboto-Light',
        textAlign: 'center',
        color: '#fff',
    },
    itemView: {
        height: 60,
        marginTop: 16,
        paddingLeft: 20,
        width: '100%',
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#1F8FC2',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    textLabel: {
        fontFamily: "Bold",
        fontSize: 16,
        color: '#1FACDE'
    },
    containerBtn: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingRight: 10
    },
    detail: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FC2727',
        width: '68%',
        height: 34,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    approve: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#459D4D',
        width: '48%',
        height: 34,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pendingBtn: {
        width: '95%',
        borderRadius: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#009688',
    },
    jobPendingBtn: {
        width: '95%',
        borderRadius: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#fa5035',
    },
    listBtn: {
        width: '95%',
        borderRadius: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#4BAEEE',
    },
    container: {
        display: 'flex',
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: "center",
        width: '100%',
        //  backgroundColor: '#000'
    },
    viewList: {
        display: 'flex',
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: "center",
        width: '90%',
        backgroundColor: '#fff'
    },
    btnTextDetail: {
        fontSize: 15,
        // fontFamily: 'Roboto-Light',
        textAlign: 'center',
        color: '#FC2727',
        fontFamily: "Bold",
    },
    btnTextApprove: {
        fontSize: 15,
        // fontFamily: 'Roboto-Light',
        textAlign: 'center',
        color: '#459D4D',
        fontFamily: "Bold",
    },
})