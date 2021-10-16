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
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { borderTop } from 'styled-system';
import { CommonActions, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BodyViewCv from '../../../../subcomponents/CreateCv/BodyView/BodyViewCv';
import Modal from 'react-native-modal';


function ViewCvModal(props) {
    const { userData,visible } = props;
    const [isVisible, setIsVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [titleJob, setTitleJob] = useState(null);

    useEffect(() => {
        setIsVisible(visible);
    }, [userData])

    const SendFileToBackend = (uri, id) => {
        const form = new FormData();
        form.append("Files", {
            name: `avartar${id || null}.jpeg`,
            uri: uri,
            type: "image/jpg",
        });
    };

    console.log(visible,userData);
    return (
        <View>
        <Modal
            animationType={"slide"}
            transparent={false}
            visible={isVisible}
            
        >
                <View style={{width:'100%'}}>
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
                                <BodyViewCv dataBody={userData} />
                            </ScrollView>

                        </SafeAreaView>
                    </ScrollView>
                    <TouchableOpacity
                    style={{
                        marginLeft:'43%',
                        
                    }}
                    onPress={() => setIsVisible(!isVisible)}>
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
                </View>
        </Modal>
        </View>
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
    buttonText: {
        color: '#057594',
        fontSize: 22,
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
export default ViewCvModal
