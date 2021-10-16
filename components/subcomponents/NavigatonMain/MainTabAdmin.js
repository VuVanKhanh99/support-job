import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import cv from '../../screens/cv';
import { icons } from '../../constants';
import { Icon } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DetailJob from '../DetailJob/DetailJob';
import { getApi } from '../../../configApi';
import NTDController from '../../screens/components/AdminPages/NTD/components';
import HomeAdmin from '../../screens/components/Home/HomeAdmin';
import SvController from '../../screens/components/AdminPages/Students/components';
import ManagePage from '../../screens/components/AdminPages/Manage/ManagePage';
//const id = AsyncStorage.getItem('idUser')?._W;


const Tab = createBottomTabNavigator();

function MainTabAdmin() {

  const [role, setRole] = useState(null);

  return (

    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          left: 20,
          right: 20,
          elevation: 0,
          bottom: 25,
          backgroundColor: '#fff',
          borderRadius: 15,
          height: 80,
          ...style.shadow
        },
        tabBarComponent: props => <TabBarComponent {...props} />,
        tabBarPosition: 'bottom'
      }}

      initialRouteName="manage-job"
    >
      <Tab.Screen name="admin-home" component={HomeAdmin}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

              <FontAwesome5 name={'home'} size={21}
                color={focused ? '#e32f45' : '#748c94'}
              />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 13, fontFamily: 'Roboto-Medium' }}>Home</Text>
            </View>
          )

        }}
      />
      <Tab.Screen name="tuyen_dung" component={NTDController}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

              <FontAwesome5 name={'file-alt'} size={21}
                color={focused ? '#e32f45' : '#748c94'}
              />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 13, fontFamily: 'Roboto-Medium' }}>Tuyển dụng</Text>
            </View>
          )

        }}
      />
      <Tab.Screen name="sv" component={SvController}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

              <FontAwesome5 name={'users'} size={21}
                color={focused ? '#e32f45' : '#748c94'}
              />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 13, fontFamily: 'Roboto-Medium' }}>Sinh viên</Text>
            </View>
          )

        }}
      />
      <Tab.Screen name="manage-job" component={ManagePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

              <FontAwesome5 name={'tasks'} size={21}
                color={focused ? '#e32f45' : '#748c94'}
              />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 13, fontFamily: 'Roboto-Medium' }}>Quản lý</Text>
            </View>
          )

        }}
      />
    </Tab.Navigator>

  );
}

const style = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})


export default MainTabAdmin;
