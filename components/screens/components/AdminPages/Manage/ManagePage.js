import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  View, ImageBackground, Image, Text, ScrollView, TouchableHighlight, StyleSheet, Dimensions, SafeAreaView,
  StatusBar, ToastAndroid, TouchableOpacity, Button, TextInput,Checkbox
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { getApi } from '../../../../../configApi';
import ViewDetailManage from './ViewDetailManage';

function ManagePage() {

  const [dataJob, setDataJob] = useState([]);

  useEffect(() => {

    async function initialFunc() {
      const result = await getApi.get("user/task/list-post-active")
        .catch(error => {
          error.response &&
            ToastAndroid.showWithGravity(
              `${error.response.data.errors.message}`,
              5,
              ToastAndroid.CENTER
            );
        })
      setDataJob(result.data.data);
      //console.log('resCheckData', result.data.data)
    }
    initialFunc();
  }, [])


  return (
    
      <ScrollView stickyHeaderIndices={[0]} >
      <View style={styles.filterSection}>
        <Text>asdisdwi</Text>
      </View>
      <View style={styles.container}>
        {
          (dataJob.length >0) && dataJob.map(item => {
            return (
              <>
                <ViewDetailManage item={item}/>
              <View>
                
              </View>
              </>
            )
          })
        }
        </View>
        <View style={{height:300}}>

        </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  filterSection: {
    width:'100%',
    height:120,
    backgroundColor:'#3BE0C0',
    color:'#fff'
  },
  container:{
    marginLeft:'5%',
    width:'90%',
    display:'flex',
    flexDirection:"column",
    justifyContent:'space-between',
    alignItems:"center"
  },
  itemView: {
    height: 60,
    backgroundColor:'#E8F1EF',
    marginTop: 16,
    paddingLeft: 20,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#1F8FC2',
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between'
  },

  textLabel: {
    fontFamily: "Bold",
    fontSize: 16,
    color: '#1FACDE'
  },
  containerBtn: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingRight: 10
  },
})
export default ManagePage
