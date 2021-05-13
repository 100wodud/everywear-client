import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FaceSelect from "./faceselect/select";
const FaceSelectScreen = (props) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#f7f7f7",
      height: hp("100%"),
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <FaceSelect navigation={props.navigation} info={props.route.params} />
    </SafeAreaView>
  );
};

export default FaceSelectScreen;
