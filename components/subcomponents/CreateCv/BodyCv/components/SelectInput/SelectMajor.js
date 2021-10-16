import "react-native-gesture-handler";

import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Picker } from "@react-native-picker/picker";

function SelectMajor(props) {


  const {handleMajor,majorData,dataSet} = props;
  const [major, setMajor] = useState('cntt');

  useEffect(()=>{
    handleMajor(major);
  },[major])

  useEffect(()=>{
    majorData && setMajor(majorData)
  },[majorData])

  return (
    <View style={styles.screen}>
      <Picker
        selectedValue={major}
        onValueChange={(value, index) => setMajor(value)}
        mode="dropdown" 
        
        style={styles.picker}
      >
        
        <Picker.Item label="Công nghệ thông tin" value="cntt" fontFamily='Gluten-ExtraLight'  />
        <Picker.Item label="An toàn thông tin" value="attt" fontFamily='Gluten-ExtraLight' />
        <Picker.Item label="Điện tử viễn thông" value="dtvt" fontFamily='Gluten-ExtraLight' />
      </Picker>
    </View>
  );
}

export default SelectMajor;
const styles = StyleSheet.create({
  screen: {
    width: '100%',
    marginTop: 15,
    marginLeft:20,
    marginRight:20,
    borderColor: '#fff',
    borderWidth:1,
    borderRadius: 5,
    alignSelf: 'center'
  },
  text: {
    fontSize: 24,
  },
  picker: {
    color:'#fff',
    fontSize: 17,
    fontFamily: 'Gluten-ExtraLight'
  },
});

