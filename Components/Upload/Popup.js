import React from "react";
import {
    Text,
    View,
    Modal,
    TouchableHighlight,
    StyleSheet
} from "react-native";
export default class Popup extends React.Component {
    
    render() {
        return (
            <Modal animationType="slide" transparent={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.modal}>
                        <View style={{ width: '100%', height: '73%', alignItems: 'center', justifyContent: "center", borderBottomWidth: 0.7, borderColor:"rgba(0,0,0,0.2)" }}>
                            <Text style={styles.text}>애플 1개가 소모됩니다</Text>
                            <View style={{marginBottom: 10}}></View>
                            <Text style={styles.text}>계속 진행하시겠습니까?</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', height: '27%', alignItems: 'center' }}>
                            <TouchableHighlight underlayColor='rgba(0, 0, 0, 0.1)' style={styles.button} onPress={this.props.setModalclose}>
                                <Text style={styles.text}>싫어요</Text>
                            </TouchableHighlight>
                            <View style={{borderWidth: 0.5, height: '100%', borderColor:"rgba(0,0,0,0.2)"}} />
                            <TouchableHighlight underlayColor='rgba(0, 0, 0, 0.1)' style={styles.button} onPress={this.props.movePage}>
                                <Text style={styles.text}>네 할래요</Text>
                            </TouchableHighlight>
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
        width: "80%",
        height: "22%",
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 20,
        justifyContent: "center",
    },
    button: {
        height: '100%',
        width: "50%",
        alignItems: 'center',
        justifyContent: "center",
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'NIXGONFONTS M 2.0'
    }
});