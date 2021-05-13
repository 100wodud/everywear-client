import React, { useState, useEffect } from "react";
import { withNavigation } from "react-navigation";
import { WithLocalSvg } from "react-native-svg";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MaleSVG from "../../fakedata/male.svg";
import FemaleSVG from "../../fakedata/female.svg";
import AlertModal from "../common/alertModal/modal";
import axios from "axios";
const GenderModify = (props) => {
  const [userInfo, setUserInfo] = useState();
  const [maleChecked, setMaleChecked] = useState("");
  const [femaleChecked, setFemaleChecked] = useState("");
  const [genderSelect, setGenderSelect] = useState("");
  const [maleFont, setMaleFont] = useState("black");
  const [femaleFont, setFemaleFont] = useState("black");
  const [maleBackgroundColor, setMaleBackgroundColor] = useState("white");
  const [femaleBackgroundColor, setFemaleBackgroundColor] = useState("white");
  const [key, setKey] = useState();
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

  const pressMale = () => {
    setMaleBackgroundColor("#f2f2f2");
    setMaleFont("black");
    setFemaleBackgroundColor("white");
    setFemaleFont("black");
    // setKey(nativeID);
    setMaleChecked("male");
    setFemaleChecked("");
    setGenderSelect(maleChecked);
  };
  const pressFemale = () => {
    setMaleBackgroundColor("white");
    setMaleFont("black");
    setFemaleBackgroundColor("#f2f2f2");
    setFemaleFont("black");
    // setKey(nativeID);
    setFemaleChecked("female");
    setMaleChecked("");
    setGenderSelect(femaleChecked);
  };

  const onPress = () => {
    const config = {
      method: "put",
      url:
        "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/update",
      data: JSON.stringify({
        name: userInfo?._name,
        gender: genderSelect,
        password: userInfo?._password,
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
      marginTop: hp("30%"),
    },
    genderselect: {
      flexDirection: "row",
      marginBottom: hp("17%"),
      justifyContent: "space-around",
    },
    titletext: {
      alignSelf: "flex-start",
      fontSize: wp("4.3%"),
    },

    malebutton: {
      borderWidth: 0.5,
      borderRadius: 15,
      borderColor: "#b2b2b2",
      width: wp("42%"),
      height: hp("13%"),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: maleBackgroundColor,
    },
    femalebutton: {
      borderWidth: 0.5,
      borderRadius: 15,
      borderColor: "#b2b2b2",
      width: wp("42%"),
      height: hp("13%"),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: femaleBackgroundColor,
    },
    malebuttontext: {
      fontSize: 18,
      color: maleFont,
      fontFamily: "NIXGONFONTS B 2.0"
    },
    femalebuttontext: {
      fontSize: 18,
      color: femaleFont,
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
      <View style={styles.container}>
        <View style={styles.genderselect}>
          <TouchableHighlight
            style={styles.malebutton}
            underlayColor="#f2f2f2"
            nativeID="1"
            onPress={pressMale}
            value="male"
          >
            <>
              <WithLocalSvg asset={MaleSVG} marginBottom="3%" />
              <Text style={styles.malebuttontext}>남</Text>
            </>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.femalebutton}
            underlayColor="#f2f2f2"
            value="famale"
            nativeID="2"
            onPress={pressFemale}
          >
            <>
              <WithLocalSvg asset={FemaleSVG} marginBottom="3%" />
              <Text style={styles.femalebuttontext}>여</Text>
            </>
          </TouchableHighlight>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <>
              <Text style={styles.buttonText}>변경</Text>
            </>
          </TouchableOpacity>
        </View>
      </View>
      <AlertModal
        visible={visible}
        setVisible={setVisible}
        navigation={props.navigation}
      />
    </>
  );
};

export default GenderModify;
