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
const FaceTypeModify = (props) => {
  const [faceShape, setFaceShape] = useState([]);
  const [selectFaceShape, setSelectFaceShape] = useState("");
  const [selectFS, setSelectFS] = useState("");
  const [userInfo, setUserInfo] = useState([]);
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
  }, [props.navigation]);
  const shapeGetData = async () => {
    let config = {
      method: "get",
      url:
        "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/faceType",
      headers: {},
    };
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
    } catch (error) { }
  };

  useEffect(() => {
    return shapeGetData();
  }, []);
  const isFaceShapeSelected = (item) => {
    return selectFaceShape?.key === item.key;
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
        faceType: selectFS,
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

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.faceSelectTitle}>변경할 얼굴형을 선택해 주세요</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ height: wp("60%") }}
        >
          {faceShape.map((data) => (
            <View id={data.id}>
              <TouchableHighlight
                underlayColor="#f2f2f2"
                style={{
                  marginLeft: 16,
                  marginRight: 16,
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
                    width="60%"
                    height="30%"
                    marginTop="20%"
                    key={data.key}
                  />
                  <Text style={styles.faceTypeText}>{data.faceType}</Text>
                </>
              </TouchableHighlight>
            </View>
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

  faceSelectTitle: {
    fontSize: 24,
    marginBottom: hp("8%"),
    fontFamily: "NIXGONFONTS B 2.0"
  },
  faceTypeText: {
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
    marginTop: hp("15%"),
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "NIXGONFONTS M 2.0"
  },
});
export default FaceTypeModify;
