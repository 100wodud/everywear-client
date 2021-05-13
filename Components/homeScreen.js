import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Login from "./loginScreen/login";

import LostPassword from "./loginScreen/lostpassword";
import SocialLogin from "./loginScreen/sociallogin";
import SignUp from "./loginScreen/signup";

const HomeScreen = (props) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#f7f7f7",
      alignItems: "center",
      justifyContent: "center",
      height: hp("100%"),
    },
    header: {
      marginTop: hp("7%"),
      marginBottom: hp("7%"),
      fontSize: 42,
      fontFamily: 'NIXGONFONTS L 2.0'
    },
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>everywear</Text>

        <View>
          <Login navigation={props.navigation} />
          <LostPassword />
          <SocialLogin navigation={props.navigation} />
          <SignUp navigation={props.navigation} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
