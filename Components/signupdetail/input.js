import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from 'axios';

const Input = ({ navigation }) => {
  const [mail, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [eborderColor, seteBorderColor] = useState("rgba(0,0,0,0.3)")
  const [pborderColor, setpBorderColor] = useState("rgba(0,0,0,0.3)")
  const [cborderColor, setcBorderColor] = useState("rgba(0,0,0,0.3)")
  const [eerrorMssage, seteErrorMessage] = useState(" ");
  const [perrorMssage, setpErrorMessage] = useState(" ");
  const [cerrorMssage, setcErrorMessage] = useState(" ");

  const handleClick = (e) => {

    var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    e.preventDefault();

    axios.post("http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/mail",{
      mail: mail
    })
    .then((response) => response)
    .then((data) => {
      if (!confirmPassword) {
        setcBorderColor("red")
        setcErrorMessage("비밀번호를 한번 더 입력해주세요");
      } else if (password !== confirmPassword) {
        setpBorderColor("red")
  
        setcBorderColor("red")
        setcErrorMessage("동일한 비밀번호를 입력해 주세요");
      } else {
        setcBorderColor("rgba(0,0,0,0.3)")
        setcErrorMessage(" ");
      }
  
      if (!password) {
        setpBorderColor("red")
        setpErrorMessage("비밀번호를 입력해주세요");
      } else if (password.length < 8) {
        setpBorderColor("red")
        setpErrorMessage(
          "영어,숫자로 구성된 8자리 이상의 비밀번호를 입력해주세요"
        );
      } else {
        setpBorderColor("rgba(0,0,0,0.3)")
        setpErrorMessage(" ");
      }
  
      if (!mail) {
        seteBorderColor("red")
        seteErrorMessage("이메일을 입력해주세요");
      } else if (!reg_email.test(mail)) {
        seteBorderColor("red")
        seteErrorMessage("알맞은 이메일 형식으로 입력해 주세요");
      } else if (!data.data.data) {
        seteBorderColor("red")
        seteErrorMessage("가입되어 있는 이메일입니다");
      }else {
        seteBorderColor("rgba(0,0,0,0.3)")
        seteErrorMessage(" ");
      }
  
      if ( reg_email.test(mail) && password === confirmPassword && password.length >= 8 && data.data.data) {
        navigation.navigate("개인 정보 입력", {
          mail: mail,
          password: password,
        });
      }
    }).catch(err=>console.log(err))
  };
  console.log(mail);
  return (
    <View style={styles.container}>
      <Text style={styles.inputtext}>이메일</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={(text) => setUserName(text)}
        value={mail}
        borderColor={eborderColor}
      ></TextInput>
      <Text style={styles.errortext}>{eerrorMssage}</Text>
      <Text style={styles.inputtext}>비밀번호</Text>
      <TextInput
        style={styles.input}
        type="password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        autoCompleteType="password"
        value={password}
        secureTextEntry={true}
        borderColor={pborderColor}
      ></TextInput>
      <Text style={styles.errortext}>{perrorMssage}</Text>
      <Text style={styles.inputtext}>비밀번호 확인</Text>
      <TextInput
        style={styles.input}
        type="password"
        autoCapitalize="none"
        onChangeText={(text) => setConfirmPassword(text)}
        autoCompleteType="password"
        value={confirmPassword}
        secureTextEntry={true}
        borderColor={cborderColor}
      ></TextInput>
      <Text style={styles.errortext}>{cerrorMssage}</Text>
      <TouchableHighlight
        style={styles.button}
        onPress={handleClick}
        underlayColor="gray"
      >
        <>
          <Text style={styles.buttontext}>회원가입</Text>
        </>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("2%"),
    marginLeft: wp("5%"),
    marginRight: wp("5%"),
    marginTop: hp("10%"),
  },
  inputtext: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontFamily: 'NIXGONFONTS M 2.0',
  },
  input: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "#b2b2b2",
    borderRadius: 10,
    fontSize: wp("5%"),
    paddingLeft: wp("2%"),
    width: wp("90%"),
    height: hp("6%"),
    marginTop: hp("1%"),
    marginBottom: 5,
  },
  errortext: {
    color: "#FF0000",
    fontFamily: 'NIXGONFONTS M 2.0',
    fontSize: 12,
    marginBottom: hp("3%"),
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("70%"),
    height: hp("7%"),
    color: "white",
    backgroundColor: "black",
    borderRadius: 10,
    marginBottom: hp("3%"),
    marginTop: hp("28%"),
  },
  buttontext: {
    color: "white",
    fontSize: 18,
    fontFamily: 'NIXGONFONTS M 2.0',
  },
});
export default Input;
