import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { WithLocalSvg } from "react-native-svg";
import myupload from '../../fakedata/myupload.svg';
import newupload from '../../fakedata/newupload.svg';
import waitingEva from '../../fakedata/waitingEva.svg';
import GetApple from "./GetApple"
import Apple from "../Upload/Apple"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userdata: [],
            noEval: false,
            noEvalData: null,
            getApple: false,
            modalVisible: false,
            userinfo: null
        }
    }

    componentDidMount = () => {
        axios.get("http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user")
            .then((response) => response)
            .then((data) => {
                console.log(data)
                this.setState({ userinfo: data.data.data })
            })
        
            axios.get("http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user/welcome")
            .then((response) => response)
            .then((data) => {
                console.log(data.data)
                this.setState({ getApple: data.data.data })
            })

        

        axios.get("http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/evaluation")
            .then((response) => response)
            .then((data) => {
                let upload = [];
                for (let i = 0; i < data.data.data.length; i++) {
                    if (data.data.data[i]._isEvaluated === false) {
                        this.setState({ noEval: true, noEvalData: data.data.data[i] })
                    } else if(data.data.data[i]._isEvaluated === true) {
                        upload.push(data.data.data[i])
                    }
                }
                this.setState({userdata: upload})
                console.log(this.state)
            })
    }

    setModalclose = () => {
        this.setState({
            getApple: false
        })
      }

    render() {
        const {navigation} = this.props
        return (
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Text style={styles.title}>오늘 진행 중인 평가</Text>
                            <View style={{ alignItems: 'flex-end', width: '90%', marginLeft: wp('5%'), paddingTop: hp('3%'), position: 'absolute' }}>
                                <Apple />
                            </View>
                        </View>
                        <View>

                        </View>
                        <View style={{ alignItems: 'center', height: hp('20%') }}>
                            {this.state.noEval ?
                                <View style={styles.container}>
                                    <Image
                                        source={{ uri: this.state.noEvalData._imgUrl }}
                                        style={styles.noEvaImg}
                                    />
                                    <WithLocalSvg asset={waitingEva} marginTop="2%" />
                                    <Text style={{
                                        fontFamily: 'NIXGONFONTS B 2.0',
                                        marginTop: '2%',
                                        fontSize: 16,
                                        color: 'white'
                                    }}>
                                        아직 평가가 진행 중입니다
                                    </Text>
                                    <Text style={{
                                        fontFamily: 'NIXGONFONTS B 2.0',
                                        marginTop: '2%',
                                        fontSize: 16,
                                        color: 'white'
                                    }}>
                                        잠시만 기다려주세요
                                    </Text>
                                </View> :

                                <View style={styles.container}>
                                    <WithLocalSvg asset={newupload} marginTop="2%" />
                                    <Text style={{
                                        fontFamily: 'NIXGONFONTS M 2.0',
                                        marginTop: '2%',
                                        fontSize: 14,
                                        color: 'gray'
                                    }}>
                                        새로운 평가를 신청해 주세요
                                    </Text>
                                </View>
                            }
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.title}>내 옷 일기장</Text>
                        </View>
                        {this.state.userdata.length === 0 ?
                            <View>
                                <View style={{ alignItems: 'center', height: hp('50%') }}>
                                    <View style={styles.container}>
                                        <WithLocalSvg asset={myupload} marginTop="2%" />
                                        <Text style={{
                                            fontFamily: 'NIXGONFONTS M 2.0',
                                            fontSize: 14,
                                            marginTop: '3%',
                                            color: 'gray'
                                        }}>
                                            아직 평가 기록이 없습니다
                                </Text>
                                    </View>
                                </View>
                            </View> :
                            <View style={{ alignItems: 'center' }}>
                                <View>
                                    { this.state.userdata.map((v) => {
                                        return (
                                        <View key={v.evaluationId}>
                                            <TouchableOpacity onPress={() => { navigation.navigate("평가",{
                                                userdata: {v}, userinfo: this.state.userinfo
                                            }) }}>
                                                <Image style={styles.myImage}
                                                source = {{ uri: v._imgUrl}} />
                                             </TouchableOpacity>
                                        </View>
                                    )
                                    })}
                                </View>
                            </View>
                        }
                    </View>
                    {this.state.getApple? <GetApple setModalclose={this.setModalclose} /> : null}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor: 'white',
        width: '90%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        
    },
    title: {
        marginLeft: wp('5%'),
        paddingTop: hp('3%'),
        fontSize: 24,
        paddingBottom: hp('1.5%'),
        fontFamily: 'NIXGONFONTS B 2.0',
    },
    myImage: {
        resizeMode: 'cover',
        width: wp('90%'),
        height: wp('90%'),
        marginBottom: 24,
        borderColor: 'white',
        borderRadius: 20,
        borderWidth: 0.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20
    },
    noEvaImg: {
        position: "absolute",
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 20,
        opacity:0.7
    }
});

export default Home;