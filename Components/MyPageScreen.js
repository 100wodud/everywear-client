import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MyPage from "./myPage/myPage";
const MyPageScreen = (props) => {
  const isShowTest = false;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#f7f7f7",
      height: hp("100%"),
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <MyPage info={props.route.params} navigation={props.navigation} />
    </SafeAreaView>
  );
};
export default MyPageScreen;