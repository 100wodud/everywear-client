import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Modal from "./Modal";
import Purpose from "./Purpose";
import imgShow from "./imgShow";
import Upload from './Upload';
import Apple from "./Apple"

const Stack = createStackNavigator();

class UploadStack extends Component {
    render() {
        return (
            <>
                <Stack.Navigator initialRouteName="modal">
                    <Stack.Screen
                        name="modal"
                        component={Modal}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="목적" component={Purpose} options={{
                        title: '', headerStyle: {
                            backgroundColor: '#f7f7f7',
                            elevation: 0
                        },
                        headerTitle: props => <Apple {...props} />
                    }} />
                    <Stack.Screen name="확인" component={imgShow} options={{
                        title: '', headerStyle: {
                            backgroundColor: 'white',
                            elevation: 0
                        },
                        headerTitle: props => <Apple {...props} />
                    }} />
                    <Stack.Screen name="업로드" component={Upload} options={{
                        headerShown: false
                    }} />
                </Stack.Navigator>
            </>
        );
    };
}
export default UploadStack;