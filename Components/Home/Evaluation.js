import React from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Star from './Star'
import { WithLocalSvg } from "react-native-svg";
import good from '../../fakedata/evaluation/good.svg';
import bad from '../../fakedata/evaluation/bad.svg';
import score from '../../fakedata/evaluation/score.svg';
import total from '../../fakedata/evaluation/total.svg';
import person from '../../fakedata/evaluation/person.svg';

export default class Evaluation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                user: this.props.route.params.userinfo._name,
                url: this.props.route.params.userdata.v._imgUrl,
                purpose: this.props.route.params.userdata.v._purpose,
                score: ((this.props.route.params.userdata.v._trend+this.props.route.params.userdata.v._harmony+this.props.route.params.userdata.v._fit+this.props.route.params.userdata.v._color+this.props.route.params.userdata.v._tpo)/5).toFixed(1),
                eval: this.props.route.params.userdata.v._comment,
                trend: this.props.route.params.userdata.v._trend,
                harmony: this.props.route.params.userdata.v._harmony,
                fit: this.props.route.params.userdata.v._fit,
                color: this.props.route.params.userdata.v._color,
                tpo: this.props.route.params.userdata.v._tpo,
                similarPerson: this.props.route.params.userdata.v._similarPerson,
                similarImgUrl: this.props.route.params.userdata.v._similarImgUrl
            }
        }
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <View style={{ alignItems: 'center', paddingTop: 50 }}>
                            <Text style={styles.title}>{this.state.data.user} 님의 {this.state.data.purpose}룩 결과가 도착했어요</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View>
                                <View style={{ zIndex: 10, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                    {this.state.data.score > 2.5 ?
                                        <WithLocalSvg asset={good} />
                                        :
                                        <WithLocalSvg asset={bad} />}
                                    <Text style={{ color: 'white', fontSize: 48 }}>{this.state.data.score}</Text>
                                </View>
                                <View style={{ zIndex: 10, position: 'absolute', bottom: '10%', left: 0, right: 0, alignItems: 'center' }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Star star={this.state.data.score} color='white' />
                                    </View>
                                </View>
                                <Image
                                    style={styles.myImage}
                                    source = {{ uri: this.state.data.url}}
                                />
                            </View>
                        </View>
                    </View>
                    <View>

                        <View style={styles.part}>
                            <WithLocalSvg asset={total} marginLeft={10} />
                            <Text style={styles.extitle}>총평</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 50, alignItems: 'center',width: '90%' }}>
                                <Text style={styles.textfont}>{this.state.data.eval}</Text>
                            </View>
                        </View>
                    </View>
                    <View>

                        <View style={styles.part}>
                            <WithLocalSvg asset={score} marginLeft={10} />
                            <Text style={styles.extitle}>상세점수</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 50 }}>
                                <View style={{ alignItems: 'center', marginBottom: 50 }}>
                                    <Text style={styles.textfont}>트랜드</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Star star={this.state.data.trend} color='black' />
                                        <Text style={{ marginLeft: 15, fontSize: 20 }}>{this.state.data.trend}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', marginBottom: 50 }}>
                                    <Text style={styles.textfont}>조화로움</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Star star={this.state.data.harmony} color='black' />
                                        <Text style={{ marginLeft: 15, fontSize: 20 }}>{this.state.data.harmony}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', marginBottom: 50 }}>
                                    <Text style={styles.textfont}>적절한 핏</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Star star={this.state.data.fit} color='black' />
                                        <Text style={{ marginLeft: 15, fontSize: 20 }}>{this.state.data.fit}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', marginBottom: 50 }}>
                                    <Text style={styles.textfont}>컬러 선택</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Star star={this.state.data.color} color='black' />
                                        <Text style={{ marginLeft: 15, fontSize: 20 }}>{this.state.data.color}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.textfont}>T.P.O</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Star star={this.state.data.tpo} color='black' />
                                        <Text style={{ marginLeft: 15, fontSize: 20 }}>{this.state.data.tpo}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {this.state.data.score > 4 ?
                        <View>
                            <View style={styles.part}>
                                <WithLocalSvg asset={person} marginLeft={10} />
                                <Text style={styles.extitle}>닮은 연예인 패션</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ marginTop: 30,alignItems: 'center' }}>
                                    <Image
                                        style={styles.myImage}
                                        source = {{ uri: this.state.data.similarImgUrl}}

                                    />
                                    <View style={{ marginTop: 50, marginBottom: 50, alignItems: 'center',width: '90%' }}>
                                        <Text style={styles.textfont}>{this.state.data.similarPerson}</Text>
                                    </View>
                                </View>
                            </View>
                        </View> : <View></View>
                    }
                </ScrollView>

            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'white',
        backgroundColor: 'white',
        width: '90%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    title: {
        marginLeft: wp('5%'),
        paddingTop: hp('3%'),
        fontSize: 20,
        paddingBottom: hp('1.5%'),
        fontFamily: 'NIXGONFONTS B 2.0'
    },
    myImage: {
        borderColor: 'black',
        width: wp('90%'),
        height: hp('60%'),
        marginTop: 20,
        resizeMode: 'contain',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
    },
    part: {
        width: '100%',
        height: 65,
        backgroundColor: 'white',
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    extitle: {
        fontFamily: 'NIXGONFONTS B 2.0',
        fontSize: 20,
        alignItems: 'center',
        marginLeft: 10
    },

    textfont: {
        fontFamily: 'NIXGONFONTS M 2.0',
        fontSize: 20,
        alignItems: 'center',
        lineHeight: 50
    }
});