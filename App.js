import React, { Component, useEffect } from 'react';
import OpenTab from './Components/OpenTab';
import SignUpScreen from "./Components/signupscreen";
import HomeScreen from "./Components/homeScreen";
import BasicInfoScreen from "./Components/basicinfoscreen";
import MaleScreen from "./Components/maleinfoscreen";
import FeMaleScreen from "./Components/femaleinroscreen";
import FaceSelectScreen from "./Components/faceselectscreen";

import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import myPage from './Components/myPage/myPage';


const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    return unsubscribe;
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="login"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="회원가입" component={SignUpScreen} options={{
            title: '회원가입',
            headerStyle: {
              backgroundColor: '#f7f7f7',
              elevation: 0
          },
            headerTitleStyle: {
              fontFamily: 'NIXGONFONTS B 2.0',
              marginLeft: '30%'
            }}} />
          <Stack.Screen name="개인 정보 입력" component={BasicInfoScreen} options={{
            title: '개인 정보 입력',
            headerStyle: {
              backgroundColor: '#f7f7f7',
              elevation: 0
          },
            headerTitleStyle: {
              fontFamily: 'NIXGONFONTS B 2.0',
              marginLeft: '20%'
            }}} />
          <Stack.Screen name="남자 정보 입력" component={MaleScreen} options={{
            title: '외형 정보 입력',
            headerStyle: {
              backgroundColor: '#f7f7f7',
              elevation: 0
          },
            headerTitleStyle: {
              fontFamily: 'NIXGONFONTS B 2.0',
              marginLeft: '20%'
            }}} />
          <Stack.Screen name="여자 정보 입력" component={FeMaleScreen} options={{
            title: '외형 정보 입력',
            headerStyle: {
              backgroundColor: '#f7f7f7',
              elevation: 0
          },
            headerTitleStyle: {
              fontFamily: 'NIXGONFONTS B 2.0',
              marginLeft: '20%'
            }}} />
          <Stack.Screen name="얼굴형 정보 입력" component={FaceSelectScreen} options={{
            title: '외형 정보 입력',
            headerStyle: {
              backgroundColor: '#f7f7f7',
              elevation: 0
          },
            headerTitleStyle: {
              fontFamily: 'NIXGONFONTS B 2.0',
              marginLeft: '20%'
            }}} />
          <Stack.Screen name="홈" component={OpenTab} options={{
            headerShown: false
          }} />
          <Stack.Screen name="마이페이지" component={myPage} options={{
            headerShown: false
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}