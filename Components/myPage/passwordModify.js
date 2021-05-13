import React, { useState, useEffect } from "react";
import { withNavigation } from "react-navigation";

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AlertModal from "../common/alertModal/modal";

import axios from "axios";
const PasswordModify = (props) => {
  const [userInfo, setUserInfo] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordModify, setPasswordModify] = useState("");
  const [confirmPassword, setConfirmPasswordModify] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const getData = async () => {
    try {
      axios
        .get(
          "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user"
        )
        .then((res) => res)
        .then((data) => {
          setUserInfo(data?.data?.data);
        })
        .catch((err) => console.log(err));
    } catch (error) { }
  };
  useEffect(() => {
    return getData();
  }, []);
  const currentPasswordOnChange = (text) => {
    return setCurrentPassword(text);
  };
  const passwordModifyOnChange = (text) => {
    return setPasswordModify(text);
  };
  const confirmPasswordOnChange = (text) => {
    return setConfirmPasswordModify(text);
  };
  const onPress = () => {
    if (passwordModify.length <= 7) {
      return setErrorMessage(
        "영어,숫자로 구성된 8자리 이상의 비밀번호를 입력해주세요."
      );
    }
    if (userInfo?._password !== currentPassword) {
      return setErrorMessage("현재 비밀번호를 확인해주세요.");
    }
    if (userInfo?._password === passwordModify) {
      return setErrorMessage(
        "현재 비밀번호와 동일합니다. 다른 비밀번호를 입력하세요."
      );
    }

    if (passwordModify !== confirmPassword) {
      return setErrorMessage("비밀번호가 동일하지 않습니다.");
    } else {
      const config = {
        method: "put",
        url:
          "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/update",
        data: JSON.stringify({
          name: userInfo?._name,
          password: confirmPassword,
          gender: userInfo?._gender,
          birthday: userInfo?._birthday,
          bodyType: userInfo?._bodyType,
          faceType: userInfo?._faceType,
          skinType: userInfo?._skinType,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(config)
        .then((res) => res)
        .then(() => setVisible(true))
        .catch((err) => console.log(err));
    }

    return setErrorMessage("");
  };
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",

      marginTop: hp("20%"),
    },
    inputTitle: {
      fontSize: 16,
      fontFamily: "NIXGONFONTS M 2.0",
      alignSelf: "flex-start",
      marginLeft: wp("5%"),
    },
    input: {
      backgroundColor: "white",
      borderWidth: 0.5,
      borderColor: "#b2b2b2",
      borderRadius: 10,
      fontSize: wp("5%"),
      paddingLeft: wp("4%"),
      width: wp("90%"),
      height: hp("6%"),
      marginTop: hp("1%"),
      marginBottom: hp("2%"),
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      width: wp("60%"),
      height: hp("8%"),
      color: "white",
      backgroundColor: "black",
      borderRadius: 15,
      marginBottom: hp("3%"),
      marginTop: hp("10%"),
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontFamily: "NIXGONFONTS M 2.0"
    },
    errortext: {
      color: "#FF0000",
    },
  });
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.inputTitle}>현재 비밀번호</Text>

        <TextInput
          type="password"
          autoCompleteType="password"
          secureTextEntry={true}
          placeholderTextColor="black"
          onChangeText={currentPasswordOnChange}
          style={styles.input}
        ></TextInput>
        <Text style={styles.inputTitle}>변경할 비밀번호</Text>

        <TextInput
          type="password"
          autoCompleteType="password"
          secureTextEntry={true}
          placeholderTextColor="black"
          onChangeText={passwordModifyOnChange}
          style={styles.input}
        ></TextInput>
        <Text style={styles.inputTitle}>변경할 비밀번호 확인</Text>

        <TextInput
          type="password"
          autoCompleteType="password"
          secureTextEntry={true}
          placeholderTextColor="black"
          onChangeText={confirmPasswordOnChange}
          style={styles.input}
        ></TextInput>

        <Text style={styles.errortext}>{errorMessage}</Text>

        <View style={{ alignItems: "center", marginLeft: wp("-5%") }}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <>
              <Text style={styles.buttonText}>변경</Text>
            </>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <AlertModal
        visible={visible}
        setVisible={setVisible}
        navigation={props.navigation}
      />
    </>
  );
};

export default PasswordModify;
