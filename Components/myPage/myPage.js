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
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { WithLocalSvg } from "react-native-svg";
import apple from '../../fakedata/apple.svg';
import profile from '../../fakedata/profile.svg';
import AsyncStorage from '@react-native-community/async-storage'
import axios from "axios";

const MyPage = ({ navigation, info }) => {
  const [userInfo, setUserInfo] = useState();
  const [visible, setVisible] = useState(false);

  let image = userInfo?._profileImage;
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
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      console.log('Data removed')
    }
    catch (exception) {
      console.log(exception)
    }
    navigation.navigate("login");
  }

  const styles = StyleSheet.create({
    container: {
      paddingLeft: wp("5%"),
      paddingRight: wp("5%"),
      paddingTop: "3%",
      backgroundColor: 'white',
      height: '100%'
    },
    profileContainer: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#d7d7d7",
      paddingBottom: hp("3%"),
    },
    profileName: {
      justifyContent: "center",
      marginLeft: wp("4%"),
    },
    arrow: {},
    text: {
      fontSize: 18,
      fontFamily: "NIXGONFONTS B 2.0",
      paddingTop: 5
    },
    subText: {
      fontSize: 16,
      fontFamily: "NIXGONFONTS M 2.0"
    },
    appleContainer: {
      borderBottomWidth: 1,
      borderBottomColor: "#d7d7d7",
      paddingBottom: hp("2%"),
      marginTop: hp("3%"),
    },
    appleTitle: {
      width: wp("100%"),
      flexDirection: "row",
    },
    appleCharge: {
      marginTop: hp("3%"),
    },
    settingContainer: {
      borderBottomWidth: 1,
      borderBottomColor: "#d7d7d7",
      paddingBottom: hp("2%"),
      marginTop: hp("3%"),
    },
    withdrawalContainer: {
      borderBottomWidth: 1,
      borderBottomColor: "#d7d7d7",
      paddingBottom: hp("2%"),
      marginTop: hp("3%"),
    },
    InquiryContainer: {
      borderBottomWidth: 1,
      borderBottomColor: "#d7d7d7",
      paddingBottom: hp("2%"),
      marginTop: hp("3%"),
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      width: wp("50%"),
      height: hp("7%"),
      color: "white",
      backgroundColor: "black",
      borderRadius: 10,
      marginBottom: hp("3%"),
      marginTop: hp("5%"),
    },
    modalbutton: {
      justifyContent: "center",
      alignItems: "center",
      width: wp("70%"),
      height: hp("7%"),
      color: "white",
      backgroundColor: "black",
      borderRadius: 10,
      marginBottom: hp("3%"),
      marginTop: hp("3%"),
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontFamily: "NIXGONFONTS M 2.0"
    },
    modalWindow: {},
    modalContainer: {
      flex: 1,
      height: hp("100%"),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.8)",
    },
    modalContent: {
      width: "80%",
      height: "50%",
      backgroundColor: "white",
      alignItems: "center",
      borderRadius: 20,
      justifyContent: "center",
      height: hp("50%"),
    },
    modalHeader: {
      fontSize: 24,
      marginBottom: hp("3%"),
      fontFamily: "NIXGONFONTS B 2.0",
      alignItems: "center",
    },
    modalText: {
      fontSize: 16,
      alignItems: "center",
      fontFamily: "NIXGONFONTS M 2.0",
      lineHeight: 30,
    },
    modalbuttonText: {
      color: "white",
      fontSize: 18,
      fontFamily: "NIXGONFONTS M 2.0"
    },
  });
  console.log(userInfo)
  return (
    <>
      <View style={styles.container}>
        {/*프로필*/}
        <View style={styles.profileContainer}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: wp("20%"),
                height: hp("10%"),
                borderRadius: 10,
              }}
            />
          ) : (
            <WithLocalSvg asset={profile} />
          )}

          <View style={styles.profileName}>
            <TouchableOpacity
              underlayColor="white"
              style={{ width: wp("100%") }}
              onPress={() => {
                navigation.navigate("프로필 수정", {
                  token: info?.token,
                });
              }}
            >
              <>
                <Text
                  style={{
                    marginBottom: hp("1%"),
                    fontSize: 18,
                    fontFamily: "NIXGONFONTS B 2.0"
                  }}
                >
                  {userInfo?._name} 님
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "NIXGONFONTS M 2.0"
                  }}
                >
                  {userInfo?._mail}
                </Text>

                <Image
                  source={require("../../fakedata/arrow.png")}
                  style={{
                    width: wp("3%"),
                    height: hp("3%"),
                    marginTop: hp("2%"),
                    position: "absolute",
                    left: wp("61%"),
                  }}
                />
              </>
            </TouchableOpacity>
          </View>
        </View>
        {/*애플관리*/}
        <View style={styles.appleContainer}>
          <View style={styles.appleTitle}>
            <Text style={styles.text}>애플 관리</Text>
            <View
              style={{
                flexDirection: "row",
                left: "60%",
                width: "100%",
                height: "100%",
              }}
            >
              <WithLocalSvg asset={apple} />
              <Text
                style={{
                  marginLeft: wp("1%"),
                  marginTop: 2,
                  fontSize: 14,
                }}
              >
                x {userInfo?._apple}
              </Text>
            </View>
          </View>
          <View style={styles.appleCharge}>
            <TouchableOpacity
              underlayColor="gray"
              onPress={() => { }}
              style={{ width: wp("100%") }}
            >
              <>
                <Text style={styles.subText}>애플 충전</Text>
                <Image
                  source={require("../../fakedata/arrow.png")}
                  style={{
                    width: wp("3%"),
                    height: hp("3%"),
                    position: "absolute",
                    left: wp("85%"),
                  }}
                />
              </>
            </TouchableOpacity>
          </View>
        </View>
        {/*설정*/}
        <View style={styles.settingContainer}>
          <Text style={styles.text}>설정</Text>
          <View style={{ marginTop: hp("3%") }}>
            <Text style={styles.subText}>웹 푸시 알림</Text>
          </View>
        </View>

        {/*탈퇴*/}
        <View style={styles.withdrawalContainer}>
          <TouchableOpacity
            underlayColor="gray"
            style={{ width: wp("100%") }}
            onPress={() => {
              setVisible(true);
            }}
          >
            <>
              <Text style={styles.subText}>계정탈퇴</Text>

              <Image
                source={require("../../fakedata/arrow.png")}
                style={{
                  width: wp("3%"),
                  height: hp("3%"),
                  position: "absolute",
                  left: wp("85%"),
                }}
              />
            </>
          </TouchableOpacity>
        </View>
        {/*문의하기*/}
        <View style={styles.InquiryContainer}>
          <Text style={styles.text}>문의하기</Text>
          <View style={{ marginTop: hp("3%") }}>
            <TouchableOpacity
              underlayColor="gray"
              onPress={() => {
                navigation.navigate("1:1 문의하기", {
                  userMail: userInfo?._mail,
                });
              }}
              style={{ width: wp("100%") }}
            >
              <>
                <Text style={styles.subText}>1:1 이메일 문의</Text>
                <Image
                  source={require("../../fakedata/arrow.png")}
                  style={{
                    width: wp("3%"),
                    height: hp("3%"),
                    position: "absolute",
                    left: wp("85%"),
                  }}
                />
              </>
            </TouchableOpacity>
          </View>
        </View>

        {/*로그아웃 버튼*/}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={() => logOut()}>
            <>
              <Text
                style={styles.buttonText}
              >
                로그아웃
              </Text>
            </>
          </TouchableOpacity>
        </View>
      </View>

      {/*MODAl*/}

      <Modal animationType="slide" transparent={true} visible={visible}>
        {/*HEADER*/}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text style={styles.modalHeader}>정말로 떠나실 건가요?</Text>
            </View>
            {/*CONTENT*/}
            <View
              style={{
                marginBottom: hp("5%"),
                paddingLeft: wp("5%"),
                paddingRight: wp("5%"),
                alignItems: "center",

              }}
            >
              <Text style={styles.modalText}>
                계정 삭제 시 모든 개인 정보가 삭제되며 관리자의 승인 후 남아
                있는 애플 환불과 탈퇴 처리 완료됩니다 (2-3일 소요)
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.modalbutton}
                onPress={() => {
                  setVisible(false);
                }}
              >
                <>
                  <Text style={styles.modalbuttonText}>다시 생각해 볼게요</Text>
                </>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#c2c2c2",
                    fontFamily: "NIXGONFONTS M 2.0"
                  }}
                >
                  계정탈퇴
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MyPage;
