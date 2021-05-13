import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import Popup from './Popup';
import axios from 'axios';

import messaging from '@react-native-firebase/messaging';

export default class imgShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      deviceToken: null,
    };
  }

  componentDidMount = () => {
    const getFcmToken = async () => {
      const fcmToken = messaging().getToken();
      this.setState({ deviceToken: fcmToken })
    }
    getFcmToken()
  }

  setModalVisible = () => {
    this.setState({
      modalVisible: true
    })
  }
  setModalclose = () => {
    this.setState({
      modalVisible: false
    })
  }
  movePage = () => {
    const { navigation } = this.props;

    this.setState({
      modalVisible: false
    })
    const formData = new FormData();
    formData.append("file", {
      uri: this.props.route.params.filePath.uri,
      name: this.props.route.params.filePath.fileName,
      type: this.props.route.params.filePath.type,
    });
    axios.post('http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/file', formData, {
      "Content-Type": "multipart/form-data"
    }).then((response) => response)
      .then((data) => {
        axios.post('http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/evaluation', {
          imgUrl: data.data.data.fileUrl,
          purpose: this.props.route.params.purpose,
          deviceToken: this.state.deviceToken._W
        }).then((response) => response)
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    navigation.navigate('업로드')
  }

  render() {

    console.log(this.props.route.params.filePath)
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {this.state.modalVisible ? <Popup visible={this.state.modalVisible} setModalclose={this.setModalclose} movePage={this.movePage} /> : null}
          <Text style={{ alignItems: 'center', fontSize: 24, fontFamily: 'NIXGONFONTS B 2.0' }}>
            {this.props.route.params.purpose}룩을 선택하였습니다
          </Text>
          <Text style={{ alignItems: 'center', fontSize: 18, marginBottom: 10, marginTop: 10, fontFamily: 'NIXGONFONTS M 2.0' }}>사진을 업로드 하시겠습니까?</Text>
          <Image
            source={{ uri: this.props.route.params.resourcePath }}
            style={styles.myImg}
          />
          <TouchableOpacity onPress={this.setModalVisible} style={styles.button}  >
            <Text style={styles.buttonText}>네 평가해주세요!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  myImg: {
    borderColor: 'black',
    width: '90%',
    height: '70%',
    marginTop: 20,
    resizeMode: 'contain',
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,

  },
  button: {
    width: 230,
    height: 55,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 15
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontFamily: 'NIXGONFONTS M 2.0'
  }
});