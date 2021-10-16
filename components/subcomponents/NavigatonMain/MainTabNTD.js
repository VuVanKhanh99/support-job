import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import cv from '../../screens/cv';
import { icons } from '../../constants';
import { Icon } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DetailJob from '../DetailJob/DetailJob';
import { getApi } from '../../../configApi';
import CreateJob from '../ScreenSpecific/CreateJob/CreateJob';
import HomeNTD from '../../screens/components/Home/HomeNTD';



const Tab = createBottomTabNavigator();

function MainTabNTD() {

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

      initialRouteName="user-home"
    >
      <Tab.Screen name="user-home" component={HomeNTD}
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
       <Tab.Screen name="create-job" component={CreateJob}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

              <FontAwesome5 name={'file-alt'} size={21}
                color={focused ? '#e32f45' : '#748c94'}
              />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 13, fontFamily: 'Roboto-Medium' }}>Tạo job</Text>
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


export default MainTabNTD;
