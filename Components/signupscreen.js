import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import Title from "./signupdetail/title";
import Input from "./signupdetail/input";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const SignUpScreen = (props) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#f7f7f7",
      height: hp("100%"),
    },
  });
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Title />
        <Input navigation={props.navigation} />
      </SafeAreaView>
    </>
  );
};

export default SignUpScreen;
