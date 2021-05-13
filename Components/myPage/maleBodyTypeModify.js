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
const MaleBodyTypeModify = (props) => {
  const [userInfo, setUserInfo] = useState([]);
  const [bodyType, setBodyType] = useState([]);
  const [selectBody, setSelectBody] = useState("");
  const [selectBodyType, setSelectType] = useState();
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

  const bodyGetData = async () => {
    let body = [];
    try {
      let config = {
        method: "get",
        url:
          "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/bodyType/male",
        headers: {},
      };

      axios(config).then(function (response) {
        response.data.data.map((u) => {
          switch (u.bodyType) {
            case "standard":
              body.push({ bodyType: "스탠다드", imgUrl: u.imgUrl, key: 1 });
              break;
            case "reverseTriangle":
              body.push({ bodyType: "역삼각형", imgUrl: u.imgUrl, key: 2 });
              break;
            case "triangle":
              body.push({ bodyType: "삼각형", imgUrl: u.imgUrl, key: 3 });
              break;
            case "circle":
              body.push({ bodyType: "원형", imgUrl: u.imgUrl, key: 4 });
              break;
            case "rectangle":
              body.push({ bodyType: "직사각형", imgUrl: u.imgUrl, key: 5 });
              break;
          }
        });
        return setBodyType(body);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return bodyGetData();
  }, []);
  const onPress = () => {
    const config = {
      method: "put",
      url:
        "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/update",
      data: JSON.stringify({
        name: userInfo?._name,
        gender: 'male',
        password: userInfo?._password,
        birthday: userInfo?._birthday,
        bodyType: selectBody,
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
  const isSelected = (item) => {
    return selectBodyType?.key === item.key;
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.bodySelectTitle}>변경할 체형을 선택해 주세요</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ height: "60%" }}
        >
          {bodyType.map((data) => (
            <View id={data.id}>
              <TouchableHighlight
                underlayColor="#f2f2f2"
                style={{
                  marginLeft: 16,
                  marginRight: 16,
                  width: wp("60%"),
                  height: hp("35%"),
                  alignItems: "center",
                  borderRadius: 30,
                  backgroundColor: isSelected(data) ? "#f2f2f2" : "#ffffff",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                value={data.bodyType}
                onPress={() => {
                  switch (data.bodyType) {
                    case "스탠다드":
                      setSelectBody("standard");
                      break;
                    case "역삼각형":
                      setSelectBody("reverseTriangle");
                      break;
                    case "삼각형":
                      setSelectBody("triangle");
                      break;
                    case "원형":
                      setSelectBody("circle");
                      break;
                    case "직사각형":
                      setSelectBody("rectangle");
                  }
                  setSelectType(data);
                }}
              >
                <>
                  <SvgCssUri
                    uri={data.imgUrl}
                    width="90%"
                    height="60%"
                    marginTop="10%"
                    key={data.key}
                  />
                  <Text style={styles.bodytype}>{data.bodyType}</Text>
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

  bodySelectTitle: {
    fontSize: 24,
    marginBottom: hp("10%"),
    fontFamily: "NIXGONFONTS B 2.0"
  },
  bodySelect: {},
  bodytype: {
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
    marginTop: hp("2%"),
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "NIXGONFONTS M 2.0"
  },
});
export default MaleBodyTypeModify;
