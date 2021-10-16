import "react-native-gesture-handler";

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Picker } from "@react-native-picker/picker";

function SelectGender(props) {
  const { handleGender, genderData, dataSet } = props;
  const [gender, setGender] = useState(null);


  useEffect(() => {
    handleGender(gender);
  }, [gender])

  useEffect(() => {
    genderData && setGender(genderData)
  }, [genderData])

  return (
    <View style={styles.screen}>

      <Picker
        selectedValue={gender}
        onValueChange={(value, index) => setGender(value)}
        mode="dropdown" // Android only
        itemStyle={{ fontFamily: 'Gluten-ExtraLight' }}
        style={styles.picker}
      >

        <Picker.Item label="Nam" value={dataSet && dataSet[0]} fontFamily='Gluten-ExtraLight' />
        <Picker.Item label="Nữ" value={dataSet && dataSet[1]} fontFamily='Gluten-ExtraLight' />
        <Picker.Item label="Khác" value={dataSet && dataSet[2]} fontFamily='Gluten-ExtraLight' />
      </Picker>
    </View>
  );
}

export default SelectGender;
const styles = StyleSheet.create({
  screen: {
    width: '100%',
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center'
  },
  text: {
    fontSize: 24,
  },
  picker: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Gluten-ExtraLight'
  },
});

