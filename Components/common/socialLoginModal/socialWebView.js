import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { Alert, Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";


const SocialWebView = (props) => {
  const onPress = () => props.closeSocialModal();
  const INJECTED_JAVASCRIPT =
    '(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';
  const handleMessage = async (event) => {
    let result = JSON.parse(event?.nativeEvent?.data);
    let success = result;

    if (success) {
      if (result?.data?._mail === null) {
        props?.navigation.navigate("회원가입", {
          provider: result?.data?._provider,
          token: result?.data?.token,
        });
      } else if (result?.data?._mail !== null) {
        axios
          .post(
            "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/auth/password",
            {
              mail: result?.data?._mail,
              password: result?.data?._password,
            },
            {
              "Content-Type": "application/json",
            }
          )
          .then((response) => response)
          .then((data) => {
            const accessToken = data.data.data.token;
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
          })
          .then(() => props.navigation.navigate("홈"))
          .catch((err) => console.log(err));
      }
    }
    return props?.closeSocialModal();
  };
  console.log(props)
  return (
    <>
      <WebView
        originWhitelist={["*"]}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        source={props.source}
        javaScriptEnabled={true}
        onMessage={handleMessage}
      ></WebView>
      <View style={{width: '100%', alignItems: "center", backgroundColor: 'none'}}>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 40,
          paddingVertical: 2,
          justifyContent: "center",
          alignItems: "center",
          width: wp("50%"),
          height: hp("6%"),
          color: "white",
          backgroundColor: "black",
          borderRadius: 15,
        }}
        onPress={onPress}
      >
        <>
          <Text style={{
            color: "white",
            fontSize: 18,
            fontFamily: "NIXGONFONTS M 2.0"
          }}>
            닫기
          </Text>
        </>
      </TouchableOpacity>
      </View>
    </>
  );
};

export default SocialWebView;