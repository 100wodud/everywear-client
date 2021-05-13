import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyPageScreen from "../MyPageScreen";
import ProfileModifyScreen from "./profileModify";
import NameModifyScreen from "./nameModify";
import PasswordModifyScreen from "./passwordModify";
import BirthdayModifyScreen from "./birthdayModify";
import GenderModifyScreen from "./genderModify";
import MaleBodyTypeModifyScreen from "./maleBodyTypeModify";
import FemaleBodyTypeModifyScreen from "./femaleBodyTypeModify";
import FaceTypeModifyScreen from "./faceTypeModify";
import SkinTypeModifyScreen from "./skinTypeModify";
import ContactUsScreen from "./contactUs";

const Stack = createStackNavigator();

class myPageStack extends Component {
    render() {
        return (
            <>
                <Stack.Navigator initialRouteName="마이페이지">
                    <Stack.Screen name="마이페이지" component={MyPageScreen} options={{
                        title: '마이페이지',
                        headerStyle: {
                            backgroundColor: 'white',
                            elevation: 0
                        },
                        headerTitleStyle: {
                            fontFamily: 'NIXGONFONTS B 2.0',
                            marginLeft: '30%'
                        }
                    }} />
                    <Stack.Screen name="프로필 수정" component={ProfileModifyScreen} options={{
                        title: '프로필 수정',
                        headerStyle: {
                            backgroundColor: 'white',
                            elevation: 0
                        },
                        headerTitleStyle: {
                            fontFamily: 'NIXGONFONTS B 2.0',
                            marginLeft: '26%'
                        }
                    }} />
                    <Stack.Screen name="이름 변경" component={NameModifyScreen} options={{
                        title: '이름 변경',
                        headerStyle: {
                            backgroundColor: '#f2f2f2',
                            elevation: 0
                        },
                        headerTitleStyle: {
                            fontFamily: 'NIXGONFONTS B 2.0',
                            marginLeft: '30%'
                        }
                    }} />
                    <Stack.Screen name="비밀번호 변경" component={PasswordModifyScreen} options={{
                        title: '비밀번호 변경',
                        headerStyle: {
                            backgroundColor: '#f2f2f2',
                            elevation: 0
                        },
                        headerTitleStyle: {
                            fontFamily: 'NIXGONFONTS B 2.0',
                            marginLeft: '26%'
                        }
                    }} />
                    <Stack.Screen name="생년월일 변경" component={BirthdayModifyScreen} options={{
                        title: '생년월일 변경',
                        headerStyle: {
                            backgroundColor: '#f2f2f2',
                            elevation: 0
                        },
                        headerTitleStyle: {
                            fontFamily: 'NIXGONFONTS B 2.0',
                            marginLeft: '26%'
                        }
                    }} />
                    <Stack.Screen name="성별 변경" component={GenderModifyScreen} options={{
                        title: '성별 변경',
                        headerStyle: {
                            backgroundColor: '#f2f2f2',
                            elevation: 0
                        },
                        headerTitleStyle: {
                            fontFamily: 'NIXGONFONTS B 2.0',
                            marginLeft: '30%'
                        }
                    }} />
                    <Stack.Screen name="남자 체형 변경" component={MaleBodyTypeModifyScreen} options={{
                        title: '남자 체형 변경',
                        headerStyle: {
                            backgroundColor: '#f2f2f2',
                            elevation: 0
                        },
                        headerTitleStyle: {
                            fontFamily: 'NIXGONFONTS B 2.0',
                            marginLeft: '24%'
                        }
                    }} />
                    <Stack.Screen name="여자 체형 변경" component={FemaleBodyTypeModifyScreen} options={{
                        title: '여자 체형 변경',
                        headerStyle: {
                            backgroundColor: '#f2f2f2',
                            elevation: 0
                        },
                        headerTitleStyle: {
                            fontFamily: 'NIXGONFONTS B 2.0',
                            marginLeft: '24%'
                        }
                    }} />
                    <Stack.Screen name="얼굴형 변경" component={FaceTypeModifyScreen} options={{
                        title: '얼굴형 변경',
                        headerStyle: {
                            backgroundColor: '#f2f2f2',
                            elevation: 0
                        },
                        headerTitleStyle: {
                            fontFamily: 'NIXGONFONTS B 2.0',
                            marginLeft: '26%'
                        }
                    }} />
                    <Stack.Screen name="피부톤 변경" component={SkinTypeModifyScreen} options={{
                        title: '피부톤 변경',
                        headerStyle: {
                            backgroundColor: '#f2f2f2',
                            elevation: 0
                        },
                        headerTitleStyle: {
                            fontFamily: 'NIXGONFONTS B 2.0',
                            marginLeft: '26%'
                        }
                    }} />
                    <Stack.Screen name="1:1 문의하기" component={ContactUsScreen} options={{
                        title: '문의 하기',
                        headerStyle: {
                            backgroundColor: '#f2f2f2',
                            elevation: 0
                        },
                        headerTitleStyle: {
                            fontFamily: 'NIXGONFONTS B 2.0',
                            marginLeft: '26%'
                        }
                    }} />
                </Stack.Navigator>
            </>
        );
    };
}
export default myPageStack;