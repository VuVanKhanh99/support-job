import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    View, ImageBackground, Image, Text, ScrollView, TouchableHighlight, StyleSheet, Dimensions, SafeAreaView,
    StatusBar, ToastAndroid, TouchableOpacity
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { CommonActions, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { groupBy } from 'lodash';
import Modal from 'react-native-modal';
import { getApi } from '../../../../../../../configApi';
import SummaryNTD from '../../SummaryNTD';
import Toast from 'react-native-toast-message';



export default function PenAcc() {
    const [dataNtd, setDataNtd] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [ntd, setNtd] = useState([]);

    async function initialFunc() {
        const result = await getApi.get("user/get-list-ntd-unactive")
            .catch(error => {
                error.response &&
                    ToastAndroid.showWithGravity(
                        `${error.response.data.errors.message}`,
                        5,
                        ToastAndroid.CENTER
                    );
            })
        result?.data?.data && setDataNtd(result.data.data);
    }

    useEffect(() => {
        initialFunc();
    }, [])

    const handleShowNtd = (id) => {
        setShowModal(true);
        const data = dataNtd.filter(item => item._id === id);
        (data.length > 0) && setNtd(data);
        // console.log('data',data);
        // setNtd(id)
    }

    const handleApprove = async (id) => {

        const secret_key = await AsyncStorage.getItem('secretKey');
        const dataTest = { secret_key, "arrIdCompany": [id] };
        console.log('id', dataTest);
        if (secret_key && id) {
            getApi.post('user/confirm-account', { secret_key, "arrIdCompany": [id] })
                .then(res => {
                    ToastAndroid.showWithGravity(
                        "Duy???t th??nh c??ng",
                        5,
                        ToastAndroid.CENTER

                    );
                    initialFunc();
                }
                )
                .catch(err =>
                    ToastAndroid.showWithGravity(
                        "L???i h??? th???ng vui l??ng th??? l???i sau",
                        5,
                        ToastAndroid.CENTER
                    ))

        }
    }
    return (

        <View style={styles.container}>

            {
                (dataNtd?.length > 0) && dataNtd.map(item => {

                    return (
                        <View style={styles.itemView} key={item._id}>
                            <View style={styles.containerLeft}>
                                <Text style={styles.textLabel}>{item?.name_company}</Text>
                                {/* <Text style={styles.textMail}>{item?.email}</Text> */}
                            </View>

                            <View style={styles.containerBtn}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => handleShowNtd(item._id)}
                                    style={styles.detail}>
                                    <Text style={styles.btnTextDetail} >Chi ti???t</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={styles.approve}
                                    onPress={() => handleApprove(item._id)}
                                >
                                    <Text style={styles.btnTextApprove}>Ph?? duy???t</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )
                })}
            <SummaryNTD visible={showModal} dataNtd={ntd} />

            <View style={{
                height: 140
            }}>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
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
    containerLeft: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    containerBtn: {
        width: '50%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: 10
    },
    detail: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FC2727',
        width: '48%',
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