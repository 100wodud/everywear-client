import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const LostPassword = (props) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: hp("4%"),
    },
    text: {
      textDecorationLine: "underline",
      fontSize: 18,
      fontFamily: 'NIXGONFONTS M 2.0'
    },
  });
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => {}} underlayColor="gray">
        <>
          <Text style={styles.text}>비밀번호를 잊으셨나요?</Text>
        </>
      </TouchableHighlight>
    </View>
  );
};
export default LostPassword;
