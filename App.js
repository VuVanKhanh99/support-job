import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer
} from '@react-navigation/native';

//import { Restaurant, OrderDelivery } from './screens'
//import Tabs from './navigation/tabs'
import Login from './components/screens/Login';
const Stack = createStackNavigator();
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './components/redux/saga';
import allReducer from './components/redux/reducer';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import watchAllUser from './components/redux/sagas/userSaga';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Signup from './components/screens/components/Signup/Signup';
import DrawerNavi from './components/subcomponents/NavigatonMain/DrawerNavi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApi } from './configApi';
import DetailJob from './components/subcomponents/DetailJob/DetailJob';
import { LogBox } from 'react-native';
import ViewCvNTD from './components/subcomponents/CreateCv/ViewCvNTD';


const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const App = () => {
  const Drawer = createDrawerNavigator();
  
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
  }, [])

  // const [role, setRole] = useState("");

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>

          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={'Drawer'}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Drawer" component={DrawerNavi} />
            <Stack.Screen name="WatchCv" component={ViewCvNTD} />
            <Stack.Screen name="DetailJob" component={DetailJob} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};


export default App;
