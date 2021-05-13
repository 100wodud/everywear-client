import React, { useState, useEffect } from "react";
import * as ImagePicker from "react-native-image-picker";

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { WithLocalSvg } from "react-native-svg";
import profile from '../../fakedata/profile_edit.svg';
import profile_ca from '../../fakedata/profile_ca.svg';
import AlertModal from "../common/alertModal/modal";

import axios from "axios";

const ProfileModify = (props) => {
  const [userInfo, setUserInfo] = useState();
  let birthday = userInfo?._birthday.slice(0, 10);
  let image = userInfo?._profileImage;
  const [selectFile, setSelectFile] = useState("");
  let asterisk = "";
  let passwordLen = userInfo?._password.length;
  const [visible, setVisible] = useState(false);

  for (let i = 0; i < passwordLen; i++) {
    asterisk += "*";
  }

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

  let bodyType = "";
  switch (userInfo?._bodyType) {
    case "standard":
      bodyType = "스탠다드";
      break;
    case "reverseTriangle":
      bodyType = "역삼각형";
      break;
    case "triangle":
      bodyType = "삼각형";
      break;
    case "circle":
      bodyType = "원형";
      break;
    case "rectangle":
      bodyType = "직사각형";
      break;
    case "hourglass":
      bodyType = "모래시계형";
      break;
  }

  let faceType = "";
  switch (userInfo?._faceType) {
    case "circle":
      faceType = "원형";
      break;
    case "egg":
      faceType = "계란형";
      break;
    case "square":
      faceType = "사각형";
      break;
    case "reverseTriangle":
      faceType = "역삼각형";
      break;
  }

  let skinType = "";
  switch (userInfo?._skinType) {
    case "normal":
      skinType = "중간톤";
      break;
    case "bright":
      skinType = "밝은톤";
      break;
    case "semiBright":
      skinType = "약간 밝은톤";
      break;
    case "semiDark":
      skinType = "약간 진한톤";
      break;
    case "dark":
      skinType = "진한톤";
      break;
  }
  //프로필 사진 업데이트

  const onPressPicture = () => {
    const options = {
      title: "사진",

      takePhotoButtonTitle: "카메라",

      chooseFromLibraryButtonTitle: "이미지 선택",

      cancelButtonTitle: "취소",
    };

    ImagePicker.launchImageLibrary(options, (res) => {
      if (res?.didCancel) {
        console.log("cancel");
      } else if (res?.error) {
        console.log(res?.error);
      } else if (res?.customButton) {
        console.log(res?.customButton);
      } else {
        const formData = new FormData();
        formData.append("file", {
          uri: res?.uri,
          name: res?.fileName,
          type: res?.type,
        });
        axios
          .post(
            "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/profileImage",
            formData,
            {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${props?.route?.params?.token}`,
            }
          )
          .then((res) => {
            console.log(res?.data);
          })
          .then(() => setVisible(true))
          .catch((err) => console.log(err));
      }
    });
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      paddingLeft: wp("5%"),
      paddingRight: wp("5%"),
      paddingBottom: "5%",
      backgroundColor: 'white'
    },
    profilePicture: {
      marginTop: hp("2%"),
      alignItems: "center",
      justifyContent: "center",
      width: 120
    },
    modifiedContainer: {
      borderBottomWidth: 1,
      borderBottomColor: "#d7d7d7",
      paddingBottom: hp("1%"),
      marginTop: hp("5%"),
      marginRight: wp("10%"),
    },
    profileTitle: {
      fontSize: 14,
      fontFamily: "NIXGONFONTS M 2.0"
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: hp("1%"),
      fontFamily: "NIXGONFONTS B 2.0"
    },
    arrow: {
      width: wp("3%"),
      height: hp("3%"),
      marginTop: hp("1%"),
      position: "absolute",
      left: wp("85%"),
    },
  });
  return (
    <>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            {image ? (
              <TouchableOpacity
                style={styles.profilePicture}
                onPress={() => onPressPicture()}
              >
                <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: wp("30%"),
                      height: wp("30%"),
                      borderRadius: 60,
                    }}
                  />
                  <WithLocalSvg asset={profile_ca} position="absolute" />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.profilePicture}
                onPress={() => onPressPicture()}
              >
                <WithLocalSvg asset={profile} />
              </TouchableOpacity>
            )}
          </View>
          {/*이름 변경*/}
          <View style={styles.modifiedContainer}>
            <View>
              <Text style={styles.profileTitle}>이름</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                underlayColor="white"
                style={{ width: wp("100%") }}
                onPress={() => {
                  props.navigation.navigate("이름 변경");
                }}
              >
                <>
                  <Text style={styles.text}>{userInfo?._name}</Text>
                  <Image
                    source={require("../../fakedata/arrow.png")}
                    style={styles.arrow}
                  />
                </>
              </TouchableOpacity>
            </View>
          </View>
          {/*비밀번호 변경*/}
          <View style={styles.modifiedContainer}>
            <View>
              <Text style={styles.profileTitle}>비밀번호</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                underlayColor="white"
                style={{ width: wp("100%") }}
                onPress={() => {
                  props.navigation.navigate("비밀번호 변경");
                }}
              >
                <>
                  <Text style={styles.text}>{asterisk}</Text>
                  <Image
                    source={require("../../fakedata/arrow.png")}
                    style={styles.arrow}
                  />
                </>
              </TouchableOpacity>
            </View>
          </View>
          {/*년도 변경*/}
          <View style={styles.modifiedContainer}>
            <View>
              <Text style={styles.profileTitle}>태어난 년도</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                underlayColor="white"
                style={{ width: wp("100%") }}
                onPress={() => {
                  props.navigation.navigate("생년월일 변경");
                }}
              >
                <>
                  <Text style={styles.text}>{birthday}</Text>
                  <Image
                    source={require("../../fakedata/arrow.png")}
                    style={styles.arrow}
                  />
                </>
              </TouchableOpacity>
            </View>
          </View>
          {/*성별 변경*/}
          <View style={styles.modifiedContainer}>
            <View>
              <Text style={styles.profileTitle}>성별</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                underlayColor="white"
                style={{ width: wp("100%") }}
                onPress={() => {
                  props.navigation.navigate("성별 변경");
                }}
              >
                <>
                  <Text style={styles.text}>
                    {userInfo?._gender === "male" ? "남" : "여"}
                  </Text>
                  <Image
                    source={require("../../fakedata/arrow.png")}
                    style={styles.arrow}
                  />
                </>
              </TouchableOpacity>
            </View>
          </View>
          {/*체형 변경*/}
          <View style={styles.modifiedContainer}>
            <View>
              <Text style={styles.profileTitle}>체형</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                underlayColor="white"
                style={{ width: wp("100%") }}
                onPress={() => {
                  userInfo?._gender === "male"
                    ? props.navigation.navigate("남자 체형 변경")
                    : props.navigation.navigate("여자 체형 변경");
                }}
              >
                <>
                  <Text style={styles.text}>{bodyType}</Text>
                  <Image
                    source={require("../../fakedata/arrow.png")}
                    style={styles.arrow}
                  />
                </>
              </TouchableOpacity>
            </View>
          </View>
          {/*얼굴형 변경*/}
          <View style={styles.modifiedContainer}>
            <View>
              <Text style={styles.profileTitle}>얼굴형</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                underlayColor="white"
                style={{ width: wp("100%") }}
                onPress={() => {
                  props.navigation.navigate("얼굴형 변경");
                }}
              >
                <>
                  <Text style={styles.text}>{faceType}</Text>
                  <Image
                    source={require("../../fakedata/arrow.png")}
                    style={styles.arrow}
                  />
                </>
              </TouchableOpacity>
            </View>
          </View>
          {/*피부톤 변경*/}
          <View style={styles.modifiedContainer}>
            <View>
              <Text style={styles.profileTitle}>피부톤</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                underlayColor="white"
                style={{ width: wp("100%") }}
                onPress={() => {
                  props.navigation.navigate("피부톤 변경");
                }}
              >
                <>
                  <Text style={styles.text}>{skinType}</Text>
                  <Image
                    source={require("../../fakedata/arrow.png")}
                    style={styles.arrow}
                  />
                </>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <AlertModal
        visible={visible}
        setVisible={setVisible}
        navigation={props.navigation}
      />
    </>
  );
};

export default ProfileModify;
