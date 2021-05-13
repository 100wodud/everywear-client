import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const SignUp = (props) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    button: {},
    text: {
      fontSize: 14,
      fontFamily: 'NIXGONFONTS M 2.0',
      marginBottom: hp("2%"),
    },
    signuptext: {
      textDecorationLine: "underline",
      fontSize: 18,
      fontFamily: 'NIXGONFONTS B 2.0',
      color: "#848484",
    },
  });
  const { navigation } = props;
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>혹시 처음이신가요?</Text>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("회원가입");
          }}
          underlayColor="white"
          style={styles.button}
        >
          <>
            <Text style={styles.signuptext}>회원가입</Text>
          </>
        </TouchableHighlight>
      </View>
    </>
  );
};

export default SignUp;
