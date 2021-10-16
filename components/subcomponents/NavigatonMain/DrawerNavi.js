import React, { useEffect, useState } from 'react';
import { Button, View,ToastAndroid } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './MainTab';
import DetailJob from '../DetailJob/DetailJob';
import { DrawerContent } from '../../screens/components/DrawerNavigate/DrawerContent';
import MainTabNTD from './MainTabNTD';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentNTD } from "../../screens/components/DrawerNavigate/DrawerContentNTD";
import CreateJob from '../ScreenSpecific/CreateJob/CreateJob';
import cv from '../../screens/cv';
import { getApi } from '../../../configApi';
import MainTabAdmin from './MainTabAdmin';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavi() {

  const [role, setRole] = useState('');


  useEffect(() => {
    async function initialFunc() {
      // AsyncStorage.getItem('idUser', (error, result) => console.log('test'))
      const test = await AsyncStorage.getItem('idUser');
      const result = await getApi.get(`user/get-one-info?id=${test}`).catch(error => {
        error.response &&
          ToastAndroid.showWithGravity(
            `${error.response.data.errors.message}`,
            5,
            ToastAndroid.CENTER
          );
      })
      result.data.data?.name_company && await AsyncStorage.setItem('nameCompany', result.data.data?.name_company)
      setRole(result?.data.data?.role);
      console.log('role',result?.data.data);
    }
    initialFunc();
  }, [])
 
  
  return (
    <>
      {
        (role === 'company') ?
          <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContentNTD {...props} />} >
            <Drawer.Screen name="Home" component={MainTabNTD} />
            <Drawer.Screen name="CreateJob" component={CreateJob} />
          </Drawer.Navigator>
          :
          (
            role === 'admin' ?
            <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />} >
            <Drawer.Screen name="Home" component={MainTabAdmin} />
            <Drawer.Screen name="Tuyển dụng" component={cv} />
           </Drawer.Navigator>
            :

          <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />} >
            <Drawer.Screen name="Home" component={MainTab} />
            <Drawer.Screen name="cv" component={cv} />
          </Drawer.Navigator>
          )
      }
    </>

  );
}