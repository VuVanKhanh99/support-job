// App.js

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    ScrollView,
    ImageBackground
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { marginTop } from 'styled-system';

import { getApi } from '../../../../../../configApi';
import { icons } from '../../../../../constants';



export default function ShowDetailJob(props) {
    const { visible, data,handleApprove } = props;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        async function initialFunc() {
            setIsVisible(visible);
           
        }
        initialFunc();
    }, [data]);

    const handleApply = () => {
        console.log('272', data._id);
       data._id && handleApprove(data._id);
    }


    return (
        <View>
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={isVisible}
            >
                {data &&
                    <>
                        <ScrollView style={{
                            backgroundColor: "#f8f8f8",
                            height: "100%",
                            width: '100%',
                            paddingBottom: 20,
                        }}>
                            <View style={styles.container}>
                                <ImageBackground source={icons.dev2Icon}
                                    style={{ marginLeft: 50, width: "100%", height: 250 }}>
                                    {/* <View style={{
                                    backgroundColor: "#000",
                                    height: 30,
                                    width: 40,
                                    marginLeft: -50,
                                    marginTop: 30,
                                    borderRadius: 8,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>

                                </View> */}
                                </ImageBackground>
                                <View style={{
                                    backgroundColor: "#FFF",
                                    padding: 10,
                                    borderRadius: 15,
                                    width: '96%'
                                }}>
                                    <View style={{
                                        display: 'flex',
                                        flexDirectionL: 'column',
                                        alignItems: "center",
                                        alignItems: 'flex-start'

                                    }}>
                                        <Text style={{
                                            fontSize: 18,
                                            fontFamily: "ExtraBold",
                                            fontWeight: 'bold'
                                        }}>{data.name_job}
                                        </Text>
                                        <View style={{display:'flex',flexDirection:'row'}}>
                                        <View style={{
                                            display: 'flex',
                                            flexDirectionL: 'column',
                                            alignItems: "center",
                                            alignItems: 'flex-start'
                                        }}>
                                            <Text style={{
                                                fontFamily: "ExtraBold",
                                                color: "#000",

                                                fontSize: 14
                                            }}>{data?.name_company}</Text>
                                                 <Text style={{
                                                    fontFamily: "ExtraBold",
                                                    color: "#000",
                                                    //  marginLeft: -60,
                                                    fontSize: 14
                                                }}>
                                                    <FontAwesome5 name="clock" />
                                                    <Text style={{ marginLeft: 15 }}>H???n n???p h??? s?? : {data?.expires}</Text>
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                                            <Text style={{
                                                fontFamily: "Bold",
                                                fontSize: 13,
                                                color: "#1F080F",
                                                marginLeft: 25
                                            }}>{data?.location}</Text>

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
                                    width: '96%',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-around'
                                }}>
                                    <View style={{
                                        backgroundColor: "#FFF",
                                        paddingVertical: 10,    
                                        padding: 10,
                                        borderRadius: 8,
                                        width: '100%'
                                    }}>

                                        <Text style={{
                                            fontFamily: "Roboto-Regular",
                                            color: "#1F080F",
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>M?? t??? c??ng vi???c</Text>
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
                                        padding: 10,
                                        marginTop: 20,
                                        borderRadius: 8,
                                        width: '100%'
                                    }}>
                                        <Text style={{
                                            fontFamily: "Roboto-Regular",
                                            color: "#1F080F",
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        }}>Y??u c???u ???ng vi??n</Text>

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
                    }}>??u ti??n :</Text>
                    <Text style={{
                        fontFamily: "ExtraBold",
                        marginTop: 5

                    }}>-  C?? s???n ph???m tr??n App store l?? 1 l???i th???</Text>
                    <Text style={{
                        fontFamily: "ExtraBold",
                        marginTop: 5

                    }}>-  S??? d???ng c??c c??ng ngh??? v?? ng??n ng??? l???p tr??nh ??a n???n t???ng (cross-platform) ????? ho??n thi???n ???ng d???ng mobile</Text> */}

                                    </View>

                                    <View style={{
                                        backgroundColor: "#FFF",
                                        paddingVertical: 10,
                                        padding: 10,
                                        borderRadius: 8,
                                        width: '100%',
                                        marginTop: 20
                                    }}>
                                        <Text style={{
                                            fontFamily: "Roboto-Regular",
                                            color: "#1F080F",
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>Quy???n l???i ???????c h?????ng</Text>
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
                                        }}>Duy???t</Text>

                                    </TouchableOpacity>

                                </View>
                                <View style={{
                                    height: 140
                                }}>

                                </View>
                            </View>

                        </ScrollView>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setIsVisible(!isVisible)}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </>
                }
            </Modal>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '86%',
        flexDirection: 'column',
        backgroundColor: '#09D6BF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 50,

    },
    button: {
        display: 'flex',
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginLeft: '10%',
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    closeButton: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF3974',
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    buttonText: {
        color: '#057594',
        fontSize: 22,
    },
    image: {
        marginTop: 50,
        marginBottom: 10,
        width: '100%',
        height: 350,
    },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    }
});