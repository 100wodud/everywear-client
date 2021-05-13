import React, { useState, useEffect } from "react";
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
const NameModify = (props) => {
  const [userInfo, setUserInfo] = useState();
  const [visible, setVisible] = useState(false);
  const [nameModify, setNameModify] = useState("");

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
  }, [props.navigation]);
  console.log(userInfo);
  const onPress = () => {
    const config = {
      method: "put",
      url:
        "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/update",
      data: JSON.stringify({
        name: nameModify,
        password: userInfo?._password,
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
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      marginLeft: wp("5%"),
      marginTop: hp("30%"),
    },
    inputTitle: {
      fontSize: 16,
      fontFamily: "NIXGONFONTS M 2.0"
    },
    input: {
      backgroundColor: "white",
      borderWidth: 0.5,
      borderColor: "#b2b2b2",
      borderRadius: 10,
      fontSize: 16,
      fontWeight: "bold",
      paddingLeft: wp("4%"),
      width: wp("90%"),
      height: hp("6%"),
      marginTop: hp("1%"),
      marginBottom: hp("20%"),
      fontFamily: "NIXGONFONTS B 2.0"
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
  });
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.inputTitle}>변경할 이름</Text>

        <TextInput
          placeholderTextColor="gray"
          placeholder={userInfo?._name}
          onChangeText={(text) => setNameModify(text)}
          style={styles.input}
        ></TextInput>
        <View style={{ alignItems: "center", marginLeft: wp("-5%") }}>
          <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            underlayColor="white"
          >
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

export default NameModify;
