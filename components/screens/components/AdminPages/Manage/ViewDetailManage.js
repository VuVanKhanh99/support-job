import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity,ToastAndroid } from 'react-native';
import { getInfoUser } from '../../../../constants/function';
import CheckBox from '@react-native-community/checkbox';
import { getApi } from '../../../../../configApi';
import { borderColor } from 'styled-system';
import DetailCheck from './DetailCheck';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ViewDetailManage(props) {
    const [viewSv, setViewSv] = useState([]);
    const [checkView, setCheckView] = useState(false);
    const [dataSv, setDataSv] = useState([]);

    const { item } = props;

    useEffect(() => {

        async function initialFunc() {
            const listSv = item?.list_student_apply;
            setViewSv(listSv)
            console.log(listSv);
        }
        initialFunc();

    }, [item]);


    useEffect(() => {
        //  console.log('data', dataSv)
        //  console.log('data',)
    }, [dataSv])

    const handleNetwork = async () => {
        console.log('data', dataSv)
        console.log('id', item?._id);
        const secret_key = await AsyncStorage.getItem('secretKey');
        getApi.post('user/task/apply-task', { secret_key, text: "Mong được nhận vào cty", arrIdUser: dataSv })
            .then(res => console.log(res))
            .catch(error => {
                error.response &&
                    ToastAndroid.showWithGravity(
                        "Lỗi hệ thống vui lòng thử lại sau",
                        5,
                        ToastAndroid.CENTER
                    );
            })

    }
    const getInfoUser = async (id) => {
        try {
            const result = await getApi.get(`user/get-one-info?id=${id}`)
                .catch(error => {
                    error.response &&
                        ToastAndroid.showWithGravity(
                            `${error.response.data.errors.message}`,
                            6,
                            ToastAndroid.CENTER
                        );
                })
            //   return result.data.data;
        } catch (error) {

        }

    }

    //console.log('2372',dataSv);
    return (
        <>
            <View style={styles.itemView} key={item._id}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#1CC2B1'
                }}>{item?.name_job}</Text>
                <View style={styles.viewContent}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}>
                        <Text style={styles.textLabel}>{item?.name_company}</Text>
                        <Text style={{ fontWeight: 'bold' }}>{item?.company_email}</Text>
                    </View>
                    <View style={styles.containerBtn}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={styles.approve}
                            onPress={() => setCheckView(!checkView)}
                        >
                            <Text style={styles.btnTextApprove}>Xem chi tiết</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ width: '100%' }}>
                {

                    checkView &&
                    <>
                        <View style={{ width: '100%', marginTop: 30 }}>
                            {(item?.list_student_apply.length > 0) ? item?.list_student_apply.map(item => {
                                //console.log('an',item?.list_student_apply.length)
                                return (
                                    <DetailCheck id={item?.idStudent} dataSv={dataSv} setDataSv={setDataSv} />
                                )
                            }) : null}
                            <TouchableOpacity style={styles.networkBtn} onPress={handleNetwork}>
                                <Text style={{ color: '#2AE185', fontSize: 16, }}>Kết nối</Text>
                            </TouchableOpacity>
                        </View>
                    </>

                }

            </View>


        </>
    )
}

const styles = StyleSheet.create({
    itemView: {
        height: 70,
        backgroundColor: '#E8F1EF',
        marginTop: 16,
        width: '100%',
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#1F8FC2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    viewContent: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingLeft: 20,
    },
    btnTextApprove: {
        fontFamily: 'Roboto-Light',
        fontSize: 15,
        color: '#E45252',
        fontWeight: 'bold'
    },
    networkBtn: {
        height: 40,
        marginTop: 10,
        width: '30%',
        borderRadius: 10,
        backgroundColor: '#BAE3F5',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        marginLeft: '35%'
    },
    viewSection: {
        display: 'flex',
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#000'
    },
    checkbox: {
        alignSelf: "center",
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
})
export default ViewDetailManage
