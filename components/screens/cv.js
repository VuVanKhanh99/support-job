import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import CreateCv from '../subcomponents/CreateCv/CreateCv';
import ViewCv from '../subcomponents/CreateCv/ViewCv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApi } from '../../configApi';



function cv() {
  //  const dispatch = useDispatch();
  //  dispatch({type:'GET-INFO'})


  const [index, setIndex] = useState(0);
  const [userData, setUserData] = useState(false);

  useEffect(() => {

    async function initialFunc() {
   //  AsyncStorage.getItem('idUser', (error, result) => console.log('test',result))
      const test = await AsyncStorage.getItem('idUser');
      const result = await getApi.get(`user/get-one-info?id=${test}`)
        .catch(error => {
          error.response &&
            ToastAndroid.showWithGravity(
              `${error.response.data.errors.message}`,
              5,
              ToastAndroid.CENTER
            );
        })
      const checkData = Object.values(result.data.data).some(item => (item === null || item === ''));
      await AsyncStorage.setItem('cvStatus',checkData ? 'create':'update');
      setUserData(checkData);
      //console.log('resCheckData', checkData, result.data.data)
    }
    initialFunc();
  }, [])

  const ViewCV = () => (
    <View>
      <ViewCv />
    </View>
  )

  const UpdateCv = () => (
    <View>
      <CreateCv />
    </View>
  );

  const renderScene = SceneMap({
    view: ViewCV,
    update: UpdateCv,
  });

  const [routes] = React.useState([
    { key: 'view', title: 'View Cv' },
    { key: 'update', title: 'Update Cv' }
  ]);

  return (
    <>
      {userData ?
        <CreateCv />
        :
        <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: '100%' }}
      />
      }
    </>
  );
}

export default cv
