import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { SvgCssUri } from 'react-native-svg';

class Purpose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purpose: null,
        }
    }

    componentDidMount = () => {
        axios.get('http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/evaluation/purpose',
            {
            }).then((response) => this.setState({ purposeImg: response.data.data }))
            .catch(err => console.log(err));
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={{ alignItems: 'center', fontSize: 24, fontFamily: 'NIXGONFONTS B 2.0', fontStyle: 'normal' }}>
                        외출의 목적을 선택해주세요 :-)
                        </Text>
                    <Text style={{ alignItems: 'center', fontSize: 18, marginBottom: 10, marginTop: 10, fontFamily: 'NIXGONFONTS M 2.0', fontStyle: 'normal' }}>
                        더 정확한 평가를 받을 수 있어요
                        </Text>

                    {this.state.purposeImg ?
                        <View>
                            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('확인', {
                                    purpose: '데이트',
                                    resourcePath: this.props.route.params.resourcePath,
                                    filePath: this.props.route.params.filePath
                                })} style={styles.button}  >
                                    <SvgCssUri
                                        height='40%'
                                        marginTop='2%'
                                        width='40%'
                                        resizeMode='contain'
                                        uri={this.state.purposeImg[1].imgUrl}
                                    />
                                    <Text style={styles.buttonText}>데이트룩</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('확인', {
                                    purpose: '오피스',
                                    resourcePath: this.props.route.params.resourcePath,
                                    filePath: this.props.route.params.filePath
                                })} style={styles.button}  >
                                    <SvgCssUri
                                        height='40%'
                                        marginTop='2%'
                                        width='40%'
                                        resizeMode='contain'
                                        uri={this.state.purposeImg[3].imgUrl}
                                    />
                                    <Text style={styles.buttonText}>오피스룩</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('확인', {
                                    purpose: '소개팅',
                                    resourcePath: this.props.route.params.resourcePath,
                                    filePath: this.props.route.params.filePath
                                })} style={styles.button}  >
                                    <SvgCssUri
                                        height='40%'
                                        marginTop='2%'
                                        width='40%'
                                        resizeMode='contain'
                                        uri={this.state.purposeImg[2].imgUrl}
                                    />
                                    <Text style={styles.buttonText}>소개팅룩</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('확인', {
                                    purpose: '여행',
                                    resourcePath: this.props.route.params.resourcePath,
                                    filePath: this.props.route.params.filePath
                                })} style={styles.button}  >
                                    <SvgCssUri
                                        height='40%'
                                        marginTop='2%'
                                        width='40%'
                                        resizeMode='contain'
                                        uri={this.state.purposeImg[4].imgUrl}
                                    />
                                    <Text style={styles.buttonText}>여행룩</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('확인', {
                                    purpose: '하객',
                                    resourcePath: this.props.route.params.resourcePath,
                                    filePath: this.props.route.params.filePath
                                })} style={styles.button}  >
                                    <SvgCssUri
                                        height='40%'
                                        marginTop='2%'
                                        width='40%'
                                        resizeMode='contain'
                                        uri={this.state.purposeImg[5].imgUrl}
                                    />
                                    <Text style={styles.buttonText}>하객룩</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('확인', {
                                    purpose: '데일리',
                                    resourcePath: this.props.route.params.resourcePath,
                                    filePath: this.props.route.params.filePath
                                })} style={styles.button}  >
                                    <SvgCssUri
                                        height='40%'
                                        marginTop='2%'
                                        width='40%'
                                        resizeMode='contain'
                                        uri={this.state.purposeImg[0].imgUrl}
                                    />
                                    <Text style={styles.buttonText}>데일리룩</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        : null}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f7f7'
    },
    button: {
        width: wp('40%'),
        height: wp('40%'),
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        margin: 10,
        borderRadius: 30,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 5,
    },
    imgStyle: {
        height: '40%',
        marginTop: '2%',
        width: '40%',
        resizeMode: 'contain'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'NIXGONFONTS B 2.0',
        marginTop: '10%'
    }
});

export default Purpose;