import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getIdUser(){
  try{
    const res =await AsyncStorage.getItem('mobileNumber');
    return res;
  }
  catch(err){
    console.log(err)
  }
  
};

export function getToken(){
  const res=  AsyncStorage.getItem('token');
  console.log(res) ;

};