import React, { useState, useEffect } from "react";
import { withNavigation } from "react-navigation";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableHighlight,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ContactUs = (props) => {
  let mail = props?.route?.params?.userMail;
  const [contactText, setContactText] = useState("");

  return (
    <SafeAreaView>
      <View style={styles.constainer}>
        <Text style={styles.mailText}>{mail}</Text>
        <TextInput
          placeholder="문의 사항을 입력해 주세요"
          style={styles.textBox}
          multiline={true}
          maxLength={100}
          autoCapitalize={"none"}
        ></TextInput>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button}>
            <>
              <Text style={styles.buttonText} onPress={() => {}}>
                문의 보내기
              </Text>
            </>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  constainer: {
    alignItems: "center",

    height: hp("100%"),
    marginTop: hp("13%"),
  },
  mailText: {
    borderWidth: 1,
    borderColor: "#e2e2e2",
    backgroundColor: "#eaeaea",
    width: wp("90%"),
    height: hp("7%"),
    paddingTop: hp("1.5%"),
    paddingLeft: wp("5%"),
    paddingBottom: hp("1.5%"),
    fontSize: wp("5%"),
    borderRadius: 15,
    marginBottom: hp("5%"),
  },
  textBox: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    backgroundColor: "white",
    width: wp("90%"),
    height: hp("40%"),
    textAlignVertical: "top",
    paddingLeft: wp("5%"),
    fontSize: wp("5%"),
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("50%"),
    height: hp("7%"),
    color: "white",
    backgroundColor: "black",
    borderRadius: 10,

    marginTop: hp("6%"),
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: 'NIXGONFONTS M 2.0'
  },
});
export default ContactUs;
