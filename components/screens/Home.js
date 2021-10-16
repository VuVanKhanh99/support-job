import React,{useEffect, useState} from 'react'
import HomeSv from './components/Home/HomeSv'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeNTD from './components/Home/HomeNTD';
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
  } from 'react-native';

function Home() {
   
    return (
     <View>
         <HomeSv />
         {/* <HomeNTD /> */}
     </View>
    )
}

export default Home
