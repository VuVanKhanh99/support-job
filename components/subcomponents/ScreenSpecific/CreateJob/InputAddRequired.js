import React, { useState,useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, ImageBackground, Image, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { icons } from '../../constants';

function InputAddRequired(props){
    const {requiredJob, setValRequire,valRequire} = props;
    const [text, setText] = useState(null);
    console.log('led',text);

    const handleSaveText = () =>{
        setValRequire([...valRequire ,text]);
    }

    return(
        <TextInput
                style={styles.inputAdd}
                autoCapitalize="none"
                placeholderTextColor='white'
                value={text}
                onChangeText={val => setText(val)}
                onBlur={handleSaveText}
            />
    )
}

const styles = StyleSheet.create({
    inputAdd:{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Gluten-ExtraLight',
        marginBottom:10
    },
})

export default InputAddRequired;