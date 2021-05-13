import React, { useState, useEffect } from "react";
import { withNavigation } from "react-navigation";
import { SvgCssUri } from "react-native-svg";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AlertModal from "../common/alertModal/modal";

import axios from "axios";
const SkinTypeModify = (props) => {
  const [faceColor, setFaceColor] = useState([]);
  const [selectFaceColor, setSelectFaceColor] = useState("");
  const [selectFC, setSelectFc] = useState("");
  const [userInfo, setUserInfo] = useState("");
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

  let faceConfig = {
    method: "get",
    url:
      "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/skinType/",
    headers: {},
  };
  useEffect(() => {
    return getData();
  }, [props.navigation]);
  const colorGetData = async () => {
    try {
      axios(faceConfig).then(function (res) {
        let skin = [];
        res.data.data.map((u) => {
          switch (u.skinType) {
            case "normal":
              skin.push({ skinType: "중간톤", code: u.code, key: 5 });
              break;
            case "bright":
              skin.push({ skinType: "밝은톤", code: u.code, key: 6 });
              break;
            case "semiBright":
              skin.push({ skinType: "약간 밝은톤", code: u.code, key: 7 });
              break;
            case "semiDark":
              skin.push({ skinType: "약간 진한톤", code: u.code, key: 8 });
              break;
            case "dark":
              skin.push({ skinType: "진한톤", code: u.code, key: 9 });
              break;
          }
        });
        setFaceColor(skin);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onPress = () => {
    const config = {
      method: "put",
      url:
        "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/update",
      data: JSON.stringify({
        name: userInfo?._name,
        gender: userInfo?._gender,
        password: userInfo?._password,
        birthday: userInfo?._birthday,
        bodyType: userInfo?._bodyType,
        faceType: userInfo?._faceType,
        skinType: selectFC,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then((res) => res)
      // .then((data) => {
      //   const accessToken = data.data.data.token;
      //   axios.defaults.headers.common[
      //     "Authorization"
      //   ] = `Bearer ${accessToken}`;
      // })
      .then(() => setVisible(true))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    return colorGetData();
  }, []);
  const isFaceColorSelected = (item) => {
    return selectFaceColor?.key === item.key;
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.skinSelectTitle}>피부톤을 선택해 주세요</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ height: wp("42%") }}
        >
          {faceColor.map((data) => (
            <>
              <TouchableHighlight
                key={data.key}
                underlayColor="#f2f2f2"
                style={{
                  marginLeft: 16,
                  marginRight: 16,
                  width: wp("40%"),
                  height: wp("40%"),
                  alignItems: "center",

                  borderRadius: 30,
                  backgroundColor: isFaceColorSelected(data)
                    ? "#f2f2f2"
                    : "#ffffff",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={() => {
                  switch (data.skinType) {
                    case "밝은톤":
                      setSelectFc("bright");
                      break;
                    case "약간 밝은톤":
                      setSelectFc("semiBright");
                      break;
                    case "중간톤":
                      setSelectFc("normal");
                      break;
                    case "약간 진한톤":
                      setSelectFc("semiDark");
                      break;
                    case "진한톤":
                      setSelectFc("dark");
                      break;
                  }

                  setSelectFaceColor(data);
                }}
              >
                <>
                  <Text
                    style={{
                      backgroundColor: data.code,
                      width: wp("20%"),
                      height: hp("10%"),
                      borderRadius: 300,
                      marginTop: hp("2%"),
                    }}
                  ></Text>
                  <Text style={styles.skinTypeText}>{data.skinType}</Text>
                </>
              </TouchableHighlight>
            </>
          ))}
        </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("10%"),
  },
  skinSelectTitle: {
    fontSize: 24,
    marginBottom: hp("8%"),
    fontFamily: "NIXGONFONTS B 2.0"
  },
  skinTypeText: {
    marginTop: hp("3%"),
    fontSize: 20,
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
    marginTop: hp("25%"),
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "NIXGONFONTS M 2.0"
  },
});
export default SkinTypeModify;
