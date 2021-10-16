import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { getApi } from '../../../../../configApi';

function DetailCheck(props) {
    const { id,dataSv, setDataSv } = props;
    const [isSelected, setSelection] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        async function initialFunc() {
            const result = await getApi.get(`user/get-one-info?id=${id}`)
                .catch(error => {
                    error.response &&
                        ToastAndroid.showWithGravity(
                            `${error.response.data.errors.message}`,
                            5,
                            ToastAndroid.CENTER
                        );
                })
            const data = result.data.data;

            setData(data);
        }
        initialFunc();
    }, [id])

    const checkBoxChanged = (check) => {
        setSelection(!isSelected)
        const dataCheck = dataSv.filter(item => item !== id);
        setDataSv(check ? [...dataSv,id] : dataCheck)
    }

    return (
        <>
            {data &&
                <View style={styles.viewSection}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={(val) => checkBoxChanged(val)}
                    />
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        // backgroundColor:'#000'
                    }}>
                        <Text style={{ color: '#629DA4', fontWeight: 'bold' }}>{data?.fullName}</Text>
                        <Text style={{ color: '#629DA4', fontWeight: 'bold' }}>{data?.email}</Text>
                    </View>
                </View>
            }
        </>

    )
}
const styles = StyleSheet.create({
    viewSection: {
        display: 'flex',
        width: '90%',
        height: 60,
        borderWidth: 1,
        borderColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginLeft: '5%',
        borderRadius: 10,
    },
})
export default DetailCheck
