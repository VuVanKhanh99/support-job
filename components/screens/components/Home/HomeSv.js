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
  Alert
} from 'react-native';
import { icons, images } from '../../../constants';
import { useNavigation } from '@react-navigation/native'
import { LOGIN } from '../redux/actions/actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { flexDirection } from 'styled-system';
import get from 'lodash.get';
import { getApi } from '../../../../configApi';
import { useDispatch, useSelector } from 'react-redux';
import { GET_DATA_JOB } from '../../../redux/actions/actions';



function HomeSv() {
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch({ type: GET_DATA_JOB })
    dispatch({ type: 'GET-INFO' })
  }, [])
  const infoUser = useSelector(state => state.userSlice.data);
  const dataJobApi = useSelector(state => state.dataJob.dataJob);
  const [user, setUser] = useState(null);
  const [textSearch, setTextSerach] = useState();
  const [dataJob, setDataJob] = useState([]);
  const navigation = useNavigation();
 
  // console.log('an', dataJobApi);
  // console.log('user', infoUser);

  useEffect(() => {
    dataJobApi && setDataJob(dataJobApi)
    let indexEmail = infoUser?.email?.indexOf('@');
    const userName = infoUser?.fullName || infoUser?.email?.slice(0, indexEmail);
    setUser(userName);
  }, [dataJobApi, infoUser])


  const handleSearchJob = (val) => {

    if (val) {
      
      const dataSearch = dataJob.filter(item => {
        const nameJob = item.name_job.split(" ");
        const resultName = nameJob[0] + " " + nameJob[1];
        console.log('dataSearch', resultName);
        return(
          resultName.toUpperCase().includes(val.toUpperCase())
        )  
      });
     
    setDataJob(dataSearch)
    } else {
      setDataJob(dataJobApi)
    }
  }

  const renderListItem = () => {
    return (
      <ScrollView horizontal style={styles.viewContainer} >

      </ScrollView>
    );
  };

  return (
    <ScrollView style={styles.viewContainer}>
      <Text style={{
        color: "#030619",
        marginTop: 40,
        fontFamily: "Bold",
        fontSize: 15
      }}>Hello, {user && user}</Text>

      <Text style={{
        fontFamily: "ExtraBold",
        fontSize: 18,
        marginTop: 13
      }}>Tìm công việc ban ưu thích</Text>

      <View style={{
        backgroundColor: "#FFF",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        height: 43,
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'space-between'
      }}>
        <TextInput
          placeholder="Nhập công việc bạn muốn tìm"
          placeholderTextColor="#B0B0B0"
          style={{
            fontFamily: "Medium",
            paddingHorizontal: 10,
            width: '80%',
          }}
          value
          onChangeText={handleSearchJob}
        />

        <TouchableOpacity style={{
          width: '30%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#000',
          flexDirection: 'row',
          justifyContent: 'center',
          height: 48
        }}>
          <FontAwesome5 name="search" color='#fff' fontSize={30} style={{ marginRight: 33 }} />
        </TouchableOpacity>
      </View>
      <Text style={{
        fontFamily: "ExtraBold",
        marginTop: 20,
        fontSize: 15
      }}>Recommended</Text>

      <ScrollView>
        <View style={{
          display: 'flex',
          width: '100%',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          // backgroundColor: '#000'
        }}>
          {
            (dataJob?.length >0 ) && dataJob.map(item => {
              const nameJob = item.name_job.split(" ");
              const resultName = nameJob[0] + " " + nameJob[1];
              const day = item.expires.split("-");
              const resultDay = day[0] + "/" + day[1];
              return (
                <TouchableOpacity style={{
                  backgroundColor: "#FFF",
                  height: 210,
                  width: 170,
                  borderRadius: 5,
                  marginTop: 35,
                  marginHorizontal: 7.85,
                }}
                key={item._id}
                  onPress={() => navigation.navigate('DetailJob',{data: item}) }
                >
                  <Image source={icons.devIcon} style={{ width: 150, height: 150 }} />
                  <View
                    style={{
                      backgroundColor: "#000",
                      height: 60,
                      borderRadius: 5,
                      marginTop: 0,
                      paddingHorizontal: 8,
                      paddingVertical: 8
                    }}>
                    <Text style={{
                      color: "#FFF",
                      fontFamily: "Roboto-Bold",
                      fontSize: 13,
                    }}>{resultName}</Text>

                    <View style={{
                      flexDirection: "row", marginTop: 4, display: 'flex',
                      alignItems: "center",
                      justifyContent:'space-between'
                    }}>
                      <View style={{
                        backgroundColor: "#3E3C3C",
                        paddingHorizontal: 5,
                        display: 'flex',
                        alignItems: "center",
                        borderRadius: 5,
                        justifyContent:'space-between',
                        flexDirection: 'row',

                      }}>
                        <Text style={{
                          color: "#B0B0B0",
                          fontFamily: "Roboto-Bold",
                          fontSize: 13
                        }}>{resultDay}</Text>
                      </View>

                      <Text style={{
                        color: "#fff",
                        fontFamily: "Roboto-Bold",
                        fontSize: 13,
                      }}>{item?.name_company}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          }

          {/* <TouchableOpacity style={{
            backgroundColor: "#FFF",
            height: 210,
            width: 170,
            borderRadius: 5,
            marginTop: 35,
            marginHorizontal: 7.85,
          }}
            onPress={() => navigation.navigate('DetailJob')}
          >
            <Image source={icons.devIcon} style={{ width: 150, height: 150 }} />
            <View

              style={{
                backgroundColor: "#000",
                height: 60,
                borderRadius: 5,
                marginTop: 0,
                paddingHorizontal: 8,
                paddingVertical: 8
              }}>
              <Text style={{
                color: "#FFF",
                fontFamily: "Roboto-Bold",
                fontSize: 13,
              }}>Software Developer</Text>

              <View style={{ flexDirection: "row", marginTop: 4 }}>
                <View style={{
                  backgroundColor: "#3E3C3C",
                  paddingHorizontal: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  flexDirection: 'row',
                }}>
                  <Text style={{
                    color: "#B0B0B0",
                    fontFamily: "Roboto-Bold",
                    fontSize: 13
                  }}>Cầu giấy</Text>
                </View>

                <Text style={{
                  color: "#fff",
                  fontFamily: "Roboto-Bold",
                  fontSize: 13,
                  marginLeft: 25
                }}>15-20 triệu</Text>
              </View>
            </View>
          </TouchableOpacity> */}

          {/* <View style={{
          backgroundColor: "#FFF",
          height: 200,
          width: 150,
          borderRadius: 20,
          marginTop: 35,

        }}>
          <Image source={require('../images/driver.png')} style={{ width: 150, height: 150 }} />
          <View style={{
            backgroundColor: "#FFF",
            height: 60,
            borderRadius: 20,
            marginTop: -10,
            paddingHorizontal: 8,
            paddingVertical: 8
          }}>

            <Text style={{
              color: "#000",
              fontFamily: "Roboto-Bold",
              fontSize: 13,
            }}>Car driver</Text>


            <View style={{ flexDirection: "row", marginTop: 4 }}>
              <View style={{
                backgroundColor: "#DFDFDF",
                paddingHorizontal: 5,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                flexWrap:'wrap',
              }}>
                <Text style={{
                  color: "#B0B0B0",
                  fontFamily: "Roboto-Bold",
                  fontSize: 13
                }}>Bac Tu Liem</Text>
              </View>
              <Text style={{
                color: "#B0B0B0",
                fontFamily: "Roboto-Bold",
                fontSize: 13,
                marginLeft: 25
              }}>15-20 triệu</Text>
            </View>
          </View>
        </View> */}
          <View style={{ height: 400 }}>

          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  helloText: {
    fontFamily: 'Roboto-Bold',
    color: '#303D46',
    marginTop: 40,
    fontSize: 25,
  },
  viewContainer: {
    fontFamily: 'Roboto-Bold',
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#E5E5E5'
  },
  viewSearchContainer: {
    backgroundColor: '#000',
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  textSearch: {
    fontFamily: 'Roboto-Bold',
    paddingHorizontal: 20
  }
});
export default HomeSv;
