import React, {useState} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SocialWebviewModal from "../common/socialLoginModal/modal";
import { WithLocalSvg } from "react-native-svg";
import naver from '../../fakedata/naver.svg';
import google from '../../fakedata/google.svg';
import kakao from '../../fakedata/kakao.svg';

const SocialLogin = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'NIXGONFONTS M 2.0',
      fontSize: 14,
      marginBottom: hp("2%"),
    },
    container: {
      alignItems: "center",
    },
    imgitem: {
      flexDirection: "row",
      marginBottom: hp("6.5%"),
    },
  });

  const [socialModalVisible, setSocialModalVisible] = useState(false);
  const [source, setSource] = useState(undefined);
  const serverUrl =
    "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1";
  const [data, setData] = useState([]);
  //소셜로그인 회원가입
  const hadlePress = async (social) => {
    console.log(social);
    setSocialModalVisible(!socialModalVisible);
    setSource(`${serverUrl}/auth/${social}/`);
  };
  console.log(source);
  const closeSocialModal = async () => {
    setSocialModalVisible(!socialModalVisible);
  };
  console.log(props)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>간편 로그인</Text>
      <View style={styles.imgitem}>

        <WithLocalSvg asset={google} />
        <TouchableOpacity
          onPress={() => hadlePress("kakao")}
          underlayColor="white"
        >
          <>

            <WithLocalSvg asset={kakao} marginLeft={15} />
          </>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => hadlePress("naver")}
          underlayColor="white"
        >

          <WithLocalSvg asset={naver} marginLeft={15} />
        </TouchableOpacity>
      </View>
      {source !== undefined ? (
        <SocialWebviewModal
          visible={socialModalVisible}
          source={source}
          props={props.navigation}
          navigation={props.navigation}
          closeSocialModal={closeSocialModal}
        />
      ) : null}
    </View>
  );
};

export default SocialLogin;


