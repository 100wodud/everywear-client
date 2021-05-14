import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage'

const Login = (props) => {
  const { navigation } = props;
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMssage, setErrorMessage] = useState(" ");
  
  useEffect( () => {
    AsyncStorage.getItem('userData', (err, result) => {
      console.log(result)
      const UserInfo = JSON.parse(result);
      if(UserInfo){
        setPassword(UserInfo.password)
        setUserEmail(UserInfo.mail)
      } 
    })
  }, [navigation]);

  const handleClick = () => {
    if (userEmail === "") {
      setErrorMessage("이메일를 입력해주세요");
    } else if (password === "") {
      setErrorMessage("비밀번호를 입력해주세요");
    } else {
      if (userEmail && password) {
        setErrorMessage("");
        axios
          .post(
            "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/auth/password",
            {
              mail: userEmail,
              password: password,
            },
            {
              "Content-Type": "application/json",
            }
          )
          .then((response) => response, console.log("성공"))
          .then((data) => {
            const accessToken = data.data.data.token;
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            AsyncStorage.setItem(
              'userData',
              JSON.stringify({
                mail: userEmail,
                password: password,
              })
            );
            navigation.navigate('홈')
            axios.put("http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/count")
            .then(response => {console.log(response.data)})
          })
          .catch((err) => setErrorMessage('이메일 / 비밀번호를 확인해주세요'));

      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputtext}>이메일</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={(text) => setUserEmail(text)}
        value={userEmail}
      ></TextInput>
      <Text style={styles.inputtext}>비밀번호</Text>
      <TextInput
        style={styles.input}
        type="password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        autoCompleteType="password"
        value={password}
        secureTextEntry={true}
      ></TextInput>
      <View>
        <Text style={styles.errortext}>{errorMssage}</Text>
      </View>
      <TouchableHighlight
        style={styles.button}
        onPress={handleClick}
        underlayColor="gray"
      >
        <>
          <Text style={styles.buttontext}>로그인</Text>
        </>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: hp("2%"),
    marginLeft: wp("5%"),
    marginRight: wp("5%"),
    justifyContent: "center",
  },
  inputtext: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontFamily: 'NIXGONFONTS M 2.0'
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
    marginBottom: hp("1%"),
  },
  errortext: {
    color: "#FF0000",
    fontSize: 12,
    fontFamily: 'NIXGONFONTS M 2.0'
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("90%"),
    height: hp("7%"),
    color: "white",
    backgroundColor: "black",
    borderRadius: 10,
    marginBottom: hp("3%"),
    marginTop: hp("1%"),
  },
  buttontext: {
    color: "white",
    fontSize: 18,
    fontFamily: 'NIXGONFONTS M 2.0'
  },
});
export default Login;
