import "react-native-gesture-handler";

import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Picker } from "@react-native-picker/picker";

function SelectTypeStudent(props) {
  const {handleTypeStudent,typeofstuden} = props;
  const [typeStudent, setTypeStudent] = useState('at14');

  useEffect(()=>{
    handleTypeStudent(typeStudent);

  },[typeStudent])
  
  useEffect(()=>{
    typeofstuden && setTypeStudent(typeofstuden)
  },[typeofstuden])

  return (
    <View style={styles.screen}>
      <Picker
        selectedValue={typeStudent}
        onValueChange={(value, index) => setTypeStudent(value)}
        mode="dropdown" // Android only
        
        style={styles.picker}
      >
        <Picker.Item label="AT14 - CT2" value="at14" fontFamily='Gluten-ExtraLight'  />
        <Picker.Item label="AT15 - CT3" value="at15" fontFamily='Gluten-ExtraLight'  />
        <Picker.Item label="AT16 - CT4" value="at16" fontFamily='Gluten-ExtraLight'  />
        <Picker.Item label="AT17 - CT5" value="at17" fontFamily='Gluten-ExtraLight'  />
      </Picker>
    </View>
  );
}

export default SelectTypeStudent;
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

