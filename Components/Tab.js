import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import HomeStack from './Home/HomeStack';
import UploadStack from './Upload/UploadStack';
import { WithLocalSvg } from "react-native-svg";
import homeimg from '../fakedata/home.svg';
import upload from '../fakedata/upload.svg';
import mypage from '../fakedata/mypage.svg';
import myPageStack from './myPage/myPageStack';

const Tab = createBottomTabNavigator();

class Tabs extends Component {


    render() {
        return (
            <Tab.Navigator screenOptions={
                ({ route }) => ({
                    tabBarIcon: () => {
                        if (route.name === '홈') {
                            return <WithLocalSvg asset={homeimg} />;
                        } else if (route.name === '평가받기') {
                            return <WithLocalSvg asset={upload} />;
                        } else if (route.name === '마이페이지') {
                            return <WithLocalSvg asset={mypage} />;
                        }
                    },
                })}
                tabBarOptions={{
                    style: {
                        backgroundColor: 'black',
                        height: 60
                    },
                    labelStyle: {
                        fontSize: 10,
                         fontFamily: 'NIXGONFONTS M 2.0',
                         marginBottom: 10
                    },
                    activeTintColor: 'white',
                    inactiveTintColor: 'white',
                    
                }}
            >
                <Tab.Screen name="홈" component={HomeStack} unmountOnBlur={true} options={{unmountOnBlur: true}}/>
                <Tab.Screen name="평가받기" component={UploadStack} unmountOnBlur={true} options={{unmountOnBlur: true}}/>
                <Tab.Screen name="마이페이지" component={myPageStack} unmountOnBlur={true} options={{unmountOnBlur: true}}/>
            </Tab.Navigator>
        );
    }
}

export default Tabs;

