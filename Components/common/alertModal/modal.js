import React, { useState } from "react";
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
const AlertModal = ({ visible, setVisible, navigation }) => {
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      height: hp("100%"),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.8)",
    },
    modalContent: {
      width: "70%",

      backgroundColor: "white",
      alignItems: "center",
      borderRadius: 20,
      justifyContent: "center",
      height: hp("28%"),
    },
    modalHeader: {
      fontSize: 24,
      marginBottom: hp("3%"),
       fontFamily:"NIXGONFONTS B 2.0"
    },
    modalText: {
      fontSize: 20,
      alignSelf: "center",
       fontFamily:"NIXGONFONTS M 2.0",
      marginTop: "10%",
    },
    modalbutton: {
      justifyContent: "center",
      alignItems: "center",
      width: wp("50%"),
      height: hp("6%"),
      color: "white",
      backgroundColor: "black",
      borderRadius: 10,
      marginBottom: hp("3%"),
      marginTop: hp("1%"),
    },
    modalbuttonText: {
      color: "white",
      fontSize: 18,
       fontFamily:"NIXGONFONTS M 2.0"
    },
  });
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/*CONTENT*/}
          <View
            style={{
              marginBottom: hp("5%"),
              paddingLeft: wp("5%"),
              paddingRight: wp("5%"),
              alignItems: "center",
            }}
          >
          <Text style={styles.modalText}>프로필 정보가</Text>
            <Text style={styles.modalText}>변경되었습니다</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.modalbutton}
              onPress={() => {
                setVisible(false);
                navigation.navigate("마이페이지");
              }}
            >
              <>
                <Text style={styles.modalbuttonText}>확인</Text>
              </>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;
