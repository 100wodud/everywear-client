import React, { useEffect, useState } from "react";
import { SvgCssUri } from "react-native-svg";
import { DeviceEventEmitter } from "react-native";
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Select = ({ navigation, info }) => {
  const [faceColor, setFaceColor] = useState([]);
  const [faceShape, setFaceShape] = useState([]);
  const [selectFaceColor, setSelectFaceColor] = useState("");
  const [selectFaceShape, setSelectFaceShape] = useState("");
  const [selectFC, setSelectFc] = useState("");
  const [selectFS, setSelectFS] = useState("");
  let faceConfig = {
    method: "get",
    url:
      "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/skinType/",
    headers: {},
  };
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
  let config = {
    method: "get",
    url:
      "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/faceType",
    headers: {},
  };
  const shapeGetData = async () => {
    try {
      axios(config).then(function (res) {
        let face = [];
        res.data.data.map((u) => {
          switch (u.faceType) {
            case "circle":
              face.push({ faceType: "둥근형", imgUrl: u.imgUrl, key: 1 });
              break;
            case "egg":
              face.push({ faceType: "계란형", imgUrl: u.imgUrl, key: 2 });
              break;
            case "square":
              face.push({ faceType: "사각형", imgUrl: u.imgUrl, key: 3 });
              break;
            case "reverseTriangle":
              face.push({ faceType: "역삼각형", imgUrl: u.imgUrl, key: 4 });
              break;
          }
        });
        setFaceShape(face);
      });
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      colorGetData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      shapeGetData();
    });
    return unsubscribe;
  }, [navigation]);

  const onPress = () => {
    if (
      info?.provider === "kakao" ||
      info?.provider === "naver" ||
      info?.provider === "google"
    ) {
      const config = {
        method: "put",
        url:
          "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/update",
        data: JSON.stringify({
          mail: info?.mail,
          password: info?.password,
          gender: info?.gender,
          name: info?.name,
          birthday: info?.birthday,
          bodyType: info?.bodyType,
          faceType: selectFS,
          skinType: selectFC,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${info?.token}`,
        },
      };
      axios(config)
        .then((res) => {
          navigation.navigate("login");
        })
        .catch((err) => console.log(err));
    } else {
      let config = {
        method: "post",
        url:
          "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/signup",
        data: JSON.stringify({
          mail: info?.mail,
          password: info?.password,
          gender: info?.gender,
          name: info?.name,
          birthday: info?.birthday,
          bodyType: info?.bodyType,
          faceType: selectFS,
          skinType: selectFC,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(config)
        .then(function (response) {
          console.log(response.data);
          navigation.navigate("login");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: hp("5%"),
    },
    facecontainer: {},
    skintext: {
      marginTop: "10%",
      fontSize: 16, 
      fontFamily: 'NIXGONFONTS B 2.0',
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      width: wp("70%"),
      height: hp("7%"),
      color: "white",
      backgroundColor: "black",
      borderRadius: 10,
      marginTop: hp("10%"),
    },
    buttontext: {
      color: "white",
      fontSize: 18, 
      fontFamily: 'NIXGONFONTS M 2.0',
    },
  });
  const isFaceShapeSelected = (item) => {
    return selectFaceShape?.key === item.key;
  };
  const isFaceColorSelected = (item) => {
    return selectFaceColor?.key === item.key;
  };
  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 24, 
            fontFamily: 'NIXGONFONTS B 2.0',
            marginBottom: hp("4%"),
          }}
        >
          얼굴형을 선택해 주세요
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{height: wp("42%")}}>
          {faceShape.map((data) => (
            <View key = {data.key}>
              <TouchableHighlight
                underlayColor="#f2f2f2"
                style={{
                  marginLeft: 16,
                  width: wp("40%"),
                  height: wp("40%"),
                  alignItems: "center",

                  borderRadius: 30,
                  backgroundColor: isFaceShapeSelected(data)
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
                  switch (data.faceType) {
                    case "둥근형":
                      setSelectFS("circle");
                      break;
                    case "계란형":
                      setSelectFS("egg");
                      break;
                    case "사각형":
                      setSelectFS("square");
                      break;
                    case "역삼각형":
                      setSelectFS("reverseTriangle");
                      break;
                  }
                  setSelectFaceShape(data);
                }}
              >
                <>
                  <SvgCssUri
                    uri={data.imgUrl}
                    width="40%"
                    height="40%"
                    marginTop="20%"
                    key={data.key}
                  />
                  <Text style={styles.skintext}>{data.faceType}</Text>
                </>
              </TouchableHighlight>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 24, 
            fontFamily: 'NIXGONFONTS B 2.0',
            marginBottom: hp("4%"),
          }}
        >
          피부톤을 선택해 주세요
        </Text>
        <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={{height: wp("42%")}}>
          {faceColor.map((data) => (
            <View key={data.key}>
              <TouchableHighlight
                key={data.key}
                underlayColor="#f2f2f2"
                style={{
                  marginLeft: 16,
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
                      width:"40%",
                      height:"40%",
                      borderRadius: 300,
                      marginTop: "20%",
                    }}
                  ></Text>
                  <Text style={styles.skintext}>{data.skinType}</Text>
                </>
              </TouchableHighlight>
            </View>
          ))}
        </ScrollView>
        <TouchableHighlight
          style={styles.button}
          onPress={onPress}
          underlayColor="gray"
        >
          <>
            <Text style={styles.buttontext}>선택 완료</Text>
          </>
        </TouchableHighlight>
      </View>
    </>
  );
};

export default Select;
