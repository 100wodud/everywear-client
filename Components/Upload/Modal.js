import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { WithLocalSvg } from "react-native-svg";
import camera from '../../fakedata/camera.svg';
import gallery from '../../fakedata/gallery.svg';
import AlreadyUp from './AlreadyUp';
import axios from 'axios';

class Modals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourcePath: { uri: null },
            noEval: false,
        };
    }

    componentDidMount = () => {
        axios.get("http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/evaluation")
            .then((response) => response)
            .then((data) => {
                for (let i = 0; i < data.data.data.length; i++) {
                    if (data.data.data[i]._isEvaluated === false) {
                        this.setState({ noEval: true })
                    }
                }
                console.log(this.state)
            })
        this.setState({ resourcePath: { uri: null } })

    }

    selectFile = () => {
        const { navigation } = this.props;
        var options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose file from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, res => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                let source = res;
                this.setState({
                    resourcePath: source,
                });
                navigation.navigate('목적', {
                    resourcePath: source.uri,
                    filePath: res
                })
            }
        });
    };
    cameraLaunch = () => {
        const { navigation } = this.props;
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                const source = { uri: res.uri };
                console.log('response', JSON.stringify(res));
                this.setState({
                    filePath: res,
                    fileData: res.data,
                    fileUri: res.uri,
                    resourcePath: source
                });
                navigation.navigate('목적', {
                    resourcePath: res.uri,
                    filePath: res
                })
            }
        });
    }

    render() {
        console.log(this.state)
        const { navigation } = this.props;
        return (
            <>
                { this.state.noEval ?
                    <AlreadyUp /> :
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} />
                        <View style={styles.modal}>
                            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', borderRadius: 15, borderWidth: 0.5, backgroundColor: 'white' }}>
                                <TouchableOpacity onPress={this.cameraLaunch} style={styles.button} >
                                    <WithLocalSvg asset={camera} marginBottom={10} />
                                    <Text style={styles.buttonText}>사진찍기</Text>
                                </TouchableOpacity>
                                <View style={{ width: 0.5, height: '100%', borderWidth: 0.2 }} />
                                <TouchableOpacity onPress={this.selectFile} style={styles.button}  >
                                    <WithLocalSvg asset={gallery} marginBottom={10} />
                                    <Text style={styles.buttonText}>앨범에서 선택하기</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                width: '100%', marginBottom: 6, marginTop: 6,
                                borderRadius: 15,
                                borderWidth: 0.5,
                                backgroundColor: 'white',
                            }}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                                    width: '100%',
                                    height: 45,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}  >
                                    <Text style={styles.buttonText}>취소하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modal: {
        marginHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '100%',
        width: '95%',
    },
    button: {
        width: '49%',
        height: 88,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'NIXGONFONTS M 2.0',
        fontSize: 16,
    }
});

export default Modals;