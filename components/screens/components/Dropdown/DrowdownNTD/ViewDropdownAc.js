import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet,Modal } from "react-native";
import { groupBy } from 'lodash';
import { Picker } from "@react-native-picker/picker";

function DropdownJobAc(props) {


  const {handleJobActive,type,dataList} = props;
  const [arrJob, setArrJob] = useState([]);
  const [job, setJob] = useState(null);

  useEffect(() => {
  //  handleJob(job);
    if (dataList.length > 0) {
      const test = groupBy(dataList, 'name_job');
      const arr = Object.keys(test);
      (arr.length >0) && setArrJob(arr);
    }

  }, [dataList])

  useEffect(() => {
    handleJobActive(job);
  }, [job])

  return (
    <View style={styles.screen}>
      <Picker
        selectedValue={job}
        onValueChange={(value, index) => setJob(value)}
        mode="dropdown"
        
        style={styles.picker}
      >

        <Picker.Item label="Chọn bài đã được duyệt" value="active" fontFamily='Gluten-ExtraLight' />
        {
          arrJob.map(item => (
            <Picker.Item label={item} value={item} fontFamily='Gluten-ExtraLight' />
          ))
        }
      </Picker>
    </View>
  );
}

export default DropdownJobAc;
const styles = StyleSheet.create({
  screen: {
    width: '100%',
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center'
  },
  text: {
    fontSize: 24,
  },
  picker: {
    color: '#000',
    fontSize: 17,
    fontFamily: 'Gluten-ExtraLight'
  },
});

