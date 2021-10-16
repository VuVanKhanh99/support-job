import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,

} from 'react-native';
import { icons, images } from '../../../constants';
import { useNavigation } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApi } from '../../../../configApi';
import { useDispatch, useSelector } from 'react-redux';
import { GET_DATA_JOB } from '../../../redux/actions/actions';
import CarouselCards from '../../../subcomponents/Carousel/CarouselCards';
import moment from 'moment';
import SummaryNTD from '../AdminPages/NTD/SummaryNTD';

function HomeAdmin() {
  const dispatch = useDispatch();
  const [dataNtd, setDataNtd] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ntd, setNtd] = useState([]);
  const infoUser = useSelector(state => state.userSlice.data);

  useEffect(()=>{
    dispatch({ type: 'GET-INFO' });
    let indexEmail = infoUser?.email?.indexOf('@');
    const userName = infoUser?.fullName || infoUser?.email?.slice(0, indexEmail);
    setUser(userName);
    async function initialFunc() {

         const result = await getApi.get("user/get-list-ntd-unactive")
           .catch(error => {
             error.response &&
               ToastAndroid.showWithGravity(
                 `${error.response.data.errors.message}`,
                 5,
                 ToastAndroid.CENTER
               );
           })
        result?.data?.data && setDataNtd(result.data.data);
         //console.log('resCheckData', result.data.data)
       }
       initialFunc();
  },[]);

const handleShowNtd = (id) =>{
  setShowModal(true);
  const data = dataNtd.filter(item => item._id === id);
  (data.length >0 ) && setNtd(data);
  // console.log('data',data);
 // setNtd(id)
}

  return (
    <ScrollView style={styles.viewContainer}>
     
      <Text style={{
        color: "#030619",
        marginTop: 40,
        fontFamily: "Bold",
        fontSize: 15
      }}>Hello, {user && user}</Text>


      {/* <SafeAreaView style={styles.container}>
        <CarouselCards />
      </SafeAreaView> */}
      <Text style={{
        fontFamily: "Gluten-Bold",
        marginTop: -20,
        fontSize: 16,

      }}>Các nhà tuyển dụng đang chờ admin duyệt tài khoản</Text>

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
            (dataNtd?.length > 0) && dataNtd.map(item => {
              
              const createDay = moment(item?.createdAt).format("DD-MM");

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
                  onPress={() => handleShowNtd(item._id)}
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
                    }}>{item?.name_company}</Text>

                    <View style={{
                      flexDirection: "row", marginTop: 4, display: 'flex',
                      alignItems: "center",
                      justifyContent: 'space-between'
                    }}>
                      <View style={{
                        backgroundColor: "#3E3C3C",
                        paddingHorizontal: 5,
                        display: 'flex',
                        alignItems: "center",
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        flexDirection: 'row',

                      }}>
                        <Text style={{
                          color: "#B0B0B0",
                          fontFamily: "Roboto-Bold",
                          fontSize: 13
                        }}>{createDay}</Text>
                      </View>

                      <Text style={{
                        color: "#fff",
                        fontFamily: "Roboto-Bold",
                        fontSize: 13,
                      }}>{item?.address}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          }
          <SummaryNTD visible={showModal} dataNtd={ntd}/>
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
  container: {
    backgroundColor:'rgba(0,0,0,0.0098)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    marginTop:50,
    height:680,
    borderRadius:20
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
export default HomeAdmin;
