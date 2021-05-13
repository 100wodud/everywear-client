import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { WithLocalSvg } from "react-native-svg";
import doneupload from '../../fakedata/doneupload.svg';

class AlreadyUp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <WithLocalSvg asset={doneupload} />
                <Text style={{
                    fontFamily: 'NIXGONFONTS B 2.0',
                    marginTop: '6%',
                    fontSize: 24,
                }}>
                    평가 신청이 완료되었습니다
                </Text>
                <Text style={{
                    fontFamily: 'NIXGONFONTS M 2.0',
                    marginTop: '3%',
                    fontSize: 18,
                }}>
                    1시간뒤 결과를 확인해 주세요
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    button: {
        width: wp('40%'),
        height: wp('40%'),
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        margin: 10,
        borderRadius: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

export default AlreadyUp;