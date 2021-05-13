import React, { Component } from "react";
import { Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { WithLocalSvg } from "react-native-svg";
import apple from '../../fakedata/apple.svg';
import axios from "axios";

class Apple extends Component {    
    constructor(props) {
    super(props);
    this.state = {
        apple: 0,
    }
}
    componentDidMount = () => {
        axios.get("http://everyweardev-env.eba-azpdvh2m.ap-northeast-2.elasticbeanstalk.com/api/v1/user")
            .then((response) => response)
            .then((data) => {
                console.log(data.data.data)
                this.setState({ apple: data.data.data._apple })
            })
    }

    render() {
        return (
            <View style={{ alignItems: 'flex-end'}}>
                <View style={{ alignItems: 'center', justifyContent: "center", flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', width: 55, height: 27, borderRadius: 16 }}>
                    <WithLocalSvg asset={apple} />
                    <Text style={{ alignItems: 'center' }}> x {this.state.apple}</Text>
                </View>
            </View>
        );
    }
}
export default Apple;