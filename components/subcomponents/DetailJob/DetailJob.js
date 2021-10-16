import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, ImageBackground, Image, Text, ScrollView, TouchableHighlight, ToastAndroid, TouchableOpacity } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { icons } from '../../constants';
import { getApi } from '../../../configApi';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function DetailJob({ route, navigation }) {
    const [checkLike, setCheckLike] = useState(false);
    // const navigation = useNavigation();
    const { data } = route.params;

    console.log("PROPS " + data);

    const handleApply = async () => {
        const test = await AsyncStorage.getItem('idUser');
        const secret_key = await AsyncStorage.getItem('secretKey');
        const result = await getApi.get(`user/get-one-info?id=${test}`)
            .catch(error => {
                error.response &&
                    ToastAndroid.showWithGravity(
                        `${error.response.data.errors.message}`,
                        5,
                        ToastAndroid.CENTER
                    );
            })
        const checkData = Object.values(result.data.data).some(item => (item === null || item === ''));
        if (checkData) {
            ToastAndroid.showWithGravity(
                "Bạn phải cập nhật bản cv đầy đủ mới có thế apply",
                7,
                ToastAndroid.CENTER
            );
        } else {
            if (secret_key && data?._id) {
                getApi.post('user/task/apply-task', { secret_key, idTask: data._id, text: 'Mong nhà trường sớm xét duyệt ạ!' })
                    .then(res => {
                        if (res.status === 200) {
                            ToastAndroid.showWithGravity(
                                'Đăng kí thành công, bạn hãy chờ phê duyệt từ nhà trường',
                                6,
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


    }

    return (
        <ScrollView style={{
            backgroundColor: "#f8f8f8",
            height: "100%",
            paddingHorizontal: 20,

        }}>
            <ImageBackground source={icons.dev2Icon}
                style={{ marginLeft: 50, width: "100%", height: 250 }}>
                <View style={{
                    backgroundColor: "#000",
                    height: 30,
                    width: 40,
                    marginLeft: -50,
                    marginTop: 30,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '100%', flexDirection: 'row', height: '100%'
                    }}>
                        <FontAwesome5 name="arrow-left" color='#fff' fontSize={30} />
                    </TouchableOpacity>

                </View>
            </ImageBackground>
            <View style={{
                backgroundColor: "#FFF",
                padding: 10,
                borderRadius: 15
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",

                }}>
                    <View>
                        <Text style={{
                            fontSize: 18,
                            fontFamily: "ExtraBold",
                            fontWeight: 'bold'
                        }}>{data.name_job}
                        </Text>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                            <Text style={{
                                fontFamily: "ExtraBold",
                                color: "#000",

                                fontSize: 14
                            }}>{data?.name_company}</Text>

                            <Text style={{
                                fontFamily: "Bold",
                                fontSize: 13,
                                color: "#1F080F",
                                marginLeft: 25
                            }}>{data?.location}</Text>

                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'space-around',

                        }}>
                            <Text style={{
                                fontFamily: "ExtraBold",
                                color: "#000",
                                //  marginLeft: -60,
                                fontSize: 14
                            }}>
                                <FontAwesome5 name="clock" />
                                <Text style={{ marginLeft: 15 }}>Hạn nộp hồ sơ : {data?.expires}</Text>
                            </Text>
                            <TouchableHighlight onPress={() => console.log('an')}>
                                <FontAwesome5 name="heart" color='#000' style={{ marginRight: 50 }} />
                            </TouchableHighlight>

                        </View>
                    </View>
                    {/* <View style={{
                        backgroundColor: "#DFDFDF",
                        height: 32,
                        width: 32,
                        borderRadius: 5,
                        marginLeft: 50,
                        marginTop: 5,
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <FontAwesome5 name="heart" fontSize={28} />
                    </View> */}


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
                        Array.isArray(data.task_description) && data.task_description?.map(item =>
                            <Text style={{
                                fontFamily: "ExtraBold",
                                marginTop: 5

                            }}>- {item}</Text>
                        )
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
                        Array.isArray(data.require_candidate) && data.require_candidate[0].require.map(item =>
                            <Text style={{
                                fontFamily: "ExtraBold",
                                marginTop: 5

                            }}>-  {item}</Text>
                        )
                    }

                    {/* <Text style={{
                        fontFamily: "ExtraBold",
                        fontWeight: 'bold',
                        fontSize: 15,
                        marginTop: 5
                    }}>Ưu tiên :</Text>
                    <Text style={{
                        fontFamily: "ExtraBold",
                        marginTop: 5

                    }}>-  Có sản phẩm trên App store là 1 lợi thế</Text>
                    <Text style={{
                        fontFamily: "ExtraBold",
                        marginTop: 5

                    }}>-  Sử dụng các công nghệ và ngôn ngữ lập trình đa nền tảng (cross-platform) để hoàn thiện ứng dụng mobile</Text> */}

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
                        Array.isArray(data.benefits_enjoyed) && data.benefits_enjoyed?.map(item =>
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
                        )
                    }

                </View>

            </View>

            <View style={{
                width: "100%",
                display: 'flex',
                alignItems: "flex-end",
                height: 40,
                marginTop: 20
            }}>

                <TouchableOpacity style={{
                    width: 90, display: 'flex',
                    backgroundColor: '#000', height: '100%',
                    borderRadius: 10,
                    justifyContent: 'center', alignItems: 'center'
                }}
                    onPress={handleApply}
                >
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Regular"
                    }}>Apply</Text>

                </TouchableOpacity>

            </View>
            <View style={{
                height: 140
            }}>

            </View>
        </ScrollView>
    )
}