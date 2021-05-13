import React, { useState, useEffect } from "react";
import { withNavigation } from "react-navigation";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import AlertModal from "../common/alertModal/modal";

const BirthdayModify = (props) => {
  const [userInfo, setUserInfo] = useState();
  const [birthdayModify, setBirthdatModify] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
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
    } catch (error) {}
  };
  useEffect(() => {
    return getData();
  }, [props.navigation]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    let birth = currentDate.toISOString().substring(0, 10);
    setShow(Platform.OS === "ios");
    setBirthdatModify(birth);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const onPress = () => {
    const config = {
      method: "put",
      url:
        "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/update",
      data: JSON.stringify({
        name: userInfo?._name,
        gender: userInfo?._gender,
        birthday: birthdayModify,
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
       fontFamily:"NIXGONFONTS M 2.0",
      alignSelf: "flex-start",
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
       fontFamily:"NIXGONFONTS B 2.0"
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      width: wp("60%"),
      height: hp("8%"),
      color: "white",
      backgroundColor: "black",
      borderRadius: 15,
      marginBottom: hp("5%"),
      marginTop: hp("10%"),
    },
    buttonText: {
      color: "white",
      fontSize: 18,
       fontFamily:"NIXGONFONTS M 2.0"
    },
  });
  return (
    <>
    <SafeAreaView style={styles.container}>
      <Text style={styles.inputTitle}>태어난 년도 변경</Text>

      <TouchableOpacity style={styles.input} onPress={showDatepicker}>
        <Text style={{ marginTop: 6, fontSize: wp("5%") }}>
          {birthdayModify}
        </Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginLeft: wp("-5%") }}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <>
            <Text style={styles.buttonText}>변경</Text>
          </>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="spinner"
          onChange={onChange}
          style={styles.windowsPicker}
        />
      )}
    </SafeAreaView>
    <AlertModal
        visible={visible}
        setVisible={setVisible}
        navigation={props.navigation}
      />
    </>
  );
};

export default BirthdayModify;
