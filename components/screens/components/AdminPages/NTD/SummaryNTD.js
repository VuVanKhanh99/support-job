// App.js

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal
} from 'react-native';
import { getApi } from '../../../../../configApi';
import { icons } from '../../../../constants';
import ShowSummary from './components/ShowSummary';

export default function SummaryNTD(props) {
    const { visible, dataNtd } = props;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
       
        (dataNtd.length >0) && setIsVisible(props?.visible);
    }, [dataNtd, visible]);

    useEffect(() => {

        async function initialFunc() {

            // const result = await getApi.get(`user/get-one-info?id=${props?.idNtd}`)
            //     .catch(error => {
            //         error.response &&
            //             ToastAndroid.showWithGravity(
            //                 `${error.response.data.errors.message}`,
            //                 5,
            //                 ToastAndroid.CENTER
            //             );
            //     })
            // console.log('resCheckData', result.data.data)
        }
        initialFunc();
    }, []);


    return (
        <View>
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={isVisible}
            >
                {(dataNtd.length >0) && 
                <>
                <View style={styles.container}>
                    {/* <Image
                        source={icons.kmaIcon}
                        style={styles.image} /> */}

                    {/* <Text style={styles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas eget tempus augue, a convallis velit.</Text> */}
                   <ShowSummary dataBody= {dataNtd[0]} />

                </View>
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
        display:'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '86%',
        flexDirection:'column',
        backgroundColor: '#09D6BF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop:50
    },
    button: {
        display: 'flex',
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginLeft:'10%',
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