import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import SocialWebView from "./socialWebView";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const SocialModal = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      style={styles.container}
    >
      <SocialWebView
        source={{ uri: props.source }}
        closeSocialModal={props.closeSocialModal}
        navigation={props.navigation}
      />
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    marginBottom: -10,
    marginLeft: -10,
    marginRight: -10,
    marginTop: -10,
  },
  closeModal: {
    left: wp("42%"),
    marginBottom: hp("10%"),
  },
});
export default SocialModal;