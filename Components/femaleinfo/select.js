import React, { useEffect, useState } from "react";
import { SvgCssUri } from "react-native-svg";
import { DeviceEventEmitter } from "react-native";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  ScrollView,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { WithLocalSvg } from "react-native-svg";
import smile from '../../fakedata/smile.svg';

const Select = ({ navigation, info }) => {
  console.log(info);
  let bouncyCheckboxRef = null;
  const [bodyType, setBodyType] = useState([]);
  const [standardSelected, setStandardSelected] = useState(false);
  const [selectBody, setSelectBody] = useState("");
  const [selectBodyType, setSelectType] = useState();
  const bodyGetData = async () => {
    let body = [];
    try {
      let config = {
        method: "get",
        url:
          "http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/bodyType/female",
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
            case "hourglass":
              body.push({ bodyType: "모래시계형", imgUrl: u.imgUrl, key: 5 });
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
    const unsubscribe = navigation.addListener("focus", () => {
      bodyGetData();
    });
    return unsubscribe;
  }, [navigation]);

  const onPress = (item) => {
    setSelectType(item);
  };
  const isSelected = (item) => {
    return selectBodyType?.key === item.key;
  };
  console.log(selectBody);
  return (
    <View style={styles.container}>
      <Text
        style={{ 
          fontSize: 18, fontFamily: 'NIXGONFONTS B 2.0', marginBottom: 21 }}
      >
        자신의 체형을 선택해 주세요
      </Text>
      <View style={{ flexDirection: "row", marginBottom: hp("10%") }}>
        <Text style={{ fontSize: 18, fontFamily: 'NIXGONFONTS M 2.0', marginRight: wp("1%") }}>
          더 정확한 평가를 받으실 수 있습니다
        </Text>
        <WithLocalSvg asset={smile} />
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{height: '40%'}}>
        {bodyType.map((data) => (
          <View key = {data.key}>
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
              key={data.key}
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
                  case "모래시계형":
                    setSelectBody("hourglass");
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
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate("얼굴형 정보 입력", {
            ...info,
            bodyType: selectBody,
          });
        }}
        underlayColor="gray"
      >
        <>
          <Text style={styles.text}>선택 완료</Text>
        </>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("5%"),
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("70%"),
    height: hp("7%"),
    color: "white",
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: hp("17%"),
  },
  text: {
    color: "white",
    fontSize: 18, 
    fontFamily: 'NIXGONFONTS M 2.0',
  },

  bodySelect: {},
  bodytype: {
    marginTop: hp("3%"),
    fontSize: 20,
     fontFamily: 'NIXGONFONTS B 2.0',
  },
});
export default Select;
