import React from "react";
import {
    Text,
    View,
    Modal,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { WithLocalSvg } from "react-native-svg";
import firework from '../../fakedata/firework.svg';

export default class GetApple extends React.Component {
    
    render() {
        return (
            <Modal animationType="slide" transparent={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.modal}>
                        <View style={{ width: '100%', height: '15%', alignItems: 'center', justifyContent: "center" }}>
                            <View style={styles.button}>
                            <TouchableOpacity onPress={this.props.setModalclose}>
                                <Text style={{ textAlign: 'center', fontSize: 30, fontFamily: 'NIXGONFONTS M 2.0'}}>x</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: '85%', alignItems: 'center' }}>
                            <WithLocalSvg asset={firework} />
                            <View style={{marginBottom: 15}}></View>
                            <Text style={styles.text}>축하합니다!!</Text>
                            <View style={{marginBottom: 50}}></View>
                            <Text style={styles.text}>회원가입 선물로 애플 10개</Text>
                            <View style={{marginBottom: 15}}></View>
                            <Text style={styles.text}>적립해 드렸습니다</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
        alignItems: 'center',
    },
    modal: {
        width: "70%",
        height: "35%",
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 20,
        justifyContent: "center",
    },
    button: {
        height: '100%',
        width: "100%",
        marginRight: '10%',
        alignItems: 'flex-end',
        justifyContent: "center",
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'NIXGONFONTS M 2.0'
    }
});