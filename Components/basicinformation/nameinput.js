import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Image
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import male from "../../fakedata/male.svg"
import female from "../../fakedata/female.svg"

import { WithLocalSvg, SvgCssUri } from "react-native-svg";
import DateTimePicker from '@react-native-community/datetimepicker';

const NameInput = ({ navigation, info }) => {
  console.log(JSON.stringify(info));
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [maleChecked, setMaleChecked] = useState("");
  const [femaleChecked, setFemaleChecked] = useState("");
  const [maleFont, setMaleFont] = useState("black");
  const [femaleFont, setFemaleFont] = useState("black");
  const [maleBackgroundColor, setMaleBackgroundColor] = useState("white");
  const [femaleBackgroundColor, setFemaleBackgroundColor] = useState("white");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    let birth = currentDate.toISOString().substring(0,10);
    setShow(Platform.OS === 'ios');
    setBirthday(birth);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


  const onUserNameChange = (text) => {
    setUserName(text);
    console.log(userName);
  };

  const pressMale = () => {
    setMaleBackgroundColor("#f2f2f2");
      setMaleFont("black");
      setFemaleBackgroundColor("white");
      setFemaleFont("black");
      // setKey(nativeID);
      setMaleChecked("male");
      setFemaleChecked("");
      console.log(maleChecked);
      console.log(femaleChecked);
  }

  const pressFemale = () => {
    setMaleBackgroundColor("white");
      setMaleFont("black");
      setFemaleBackgroundColor("#f2f2f2");
      setFemaleFont("black");
      // setKey(nativeID);
      setFemaleChecked("female");
      setMaleChecked("");
      console.log(maleChecked);
      console.log(femaleChecked);
  }

  const confirmButton = () => {
    if(userName.length > 0 && birthday.length > 0){
    if (maleChecked.length > 0 && femaleChecked.length === 0) {
      return navigation.navigate("남자 정보 입력", {
        ...info,
        name: userName,
        birthday: birthday,
        gender: maleChecked,
      });
    }
    if (femaleChecked.length > 0 && maleChecked.length === 0) {
      return navigation.navigate("여자 정보 입력", {
        mail: info.mail,
        password: info.password,
        name: userName,
        birthday: birthday,
        gender: femaleChecked,
      });
    }
  } 
  
  };
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      marginLeft: wp("5%"),
      marginRight: wp("5%"),
      marginTop: hp("10%"),
    },
    text: {
      alignSelf: "flex-start",
      fontSize: 16,
      fontFamily: 'NIXGONFONTS M 2.0',
    },
    input: {
      borderWidth: 0.5,
      borderColor: "#b2b2b2",
      borderRadius: 10,
      fontSize: wp("5%"),
      paddingLeft: wp("2%"),
      width: wp("90%"),
      height: hp("6%"),
      marginTop: hp("1%"),
      marginBottom: hp("3%"),
      backgroundColor: "white",
    },
    gendertitle: {
      alignItems: "center",
      marginBottom: hp("1%"),
      marginLeft: wp("5%"),
      marginRight: wp("5%"),
    },
    genderselect: {
      flexDirection: "row",
      marginBottom: hp("2%"),
      justifyContent: "space-around",
    },
    titletext: {
      alignSelf: "flex-start",
      fontSize: 16,
      fontFamily: 'NIXGONFONTS M 2.0',
    },

    malebutton: {
      borderWidth: 0.5,
      borderRadius: 10,
      borderColor: "#b2b2b2",
      width: wp("40%"),
      height: hp("12%"),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: maleBackgroundColor,
    },
    femalebutton: {
      borderWidth: 0.5,
      borderRadius: 10,
      borderColor: "#b2b2b2",
      width: wp("40%"),
      height: hp("12%"),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: femaleBackgroundColor,
    },
    malebuttontext: { 
      fontSize: 18,
      fontFamily: 'NIXGONFONTS B 2.0',
       color: maleFont, 
      },

    femalebuttontext: {
      fontSize: 18,
      fontFamily: 'NIXGONFONTS B 2.0',
      color: femaleFont,
      fontWeight: "bold",
    },
    buttoncontainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: hp("15%"),
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
    windowsPicker: {
      flex: 1,
      paddingTop: 10,
      width: 350,
      borderWidth: 1
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>이름</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={onUserNameChange}
        ></TextInput>
        <Text style={styles.text}>태어난 년도</Text>
        <TouchableOpacity style={styles.input} onPress={showDatepicker} >
          <Text style={{ marginTop: 6,fontSize: wp("5%")}}>{birthday}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gendertitle}>
        <Text style={styles.titletext}>성별</Text>
      </View>

      <View style={styles.genderselect}>
        <TouchableOpacity
          style={styles.malebutton}
          onPress={pressMale}
        >
          <>
          <WithLocalSvg
                  asset={male}
                  marginBottom="3%"
                  color= {maleFont} 
                />
            <Text style={styles.malebuttontext}>남</Text>
          </>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.femalebutton}
          onPress={pressFemale}
        >
          <>
          <WithLocalSvg
                  asset={female}
                  marginBottom="3%"
                />
            <Text style={styles.femalebuttontext}>여</Text>
          </>
        </TouchableOpacity>
      </View>
      <View style={styles.buttoncontainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={confirmButton}
          underlayColor="gray"
        >
          <>
            <Text style={styles.buttontext}>확인</Text>
          </>
        </TouchableHighlight>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="spinner"
            onChange={onChange}
            style={styles.windowsPicker}
          />
        )}
      </View>
    </>
  );
};

export default NameInput;
