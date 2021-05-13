import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NameInput from "./basicinformation/nameinput";

const BasicInfoScreen = (props) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#f7f7f7",
      height: hp("100%"),
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <NameInput navigation={props.navigation} info={props.route.params} />
    </SafeAreaView>
  );
};

export default BasicInfoScreen;
