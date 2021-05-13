import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Evaluation from "./Evaluation"
import Home from "./Home"

const Stack = createStackNavigator();

class HomeStack extends Component {
    render() {
        return (
            <>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="평가" component={Evaluation} options={{
                        headerShown: false
                    }} />
                </Stack.Navigator>
            </>
        );
    };
}
export default HomeStack;