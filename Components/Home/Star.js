import React from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { WithLocalSvg } from "react-native-svg";
import black_full from '../../fakedata/evaluation/black_full.svg';
import black_half from '../../fakedata/evaluation/black_half.svg';
import black_none from '../../fakedata/evaluation/black_none.svg';
import white_full from '../../fakedata/evaluation/white_full.svg';
import white_half from '../../fakedata/evaluation/white_half.svg';
import white_none from '../../fakedata/evaluation/white_none.svg';

export default class Star extends React.Component {

    render() {
        let color = this.props.color
        return ( 
            <View>
                { color === 'black' ?
                  this.props.star === 0 ?
                    <View style={{ flexDirection: 'row' }}>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                    </View> : this.props.star === 0.5 ?
                        <View style={{ flexDirection: 'row' }}>
                        <WithLocalSvg asset={black_half} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        </View>: this.props.star === 1 ?
                        <View style={{ flexDirection: 'row' }}>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        </View>: this.props.star === 1.5 ?
                        <View style={{ flexDirection: 'row' }}>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_half} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        </View>: this.props.star === 2 ?
                        <View style={{ flexDirection: 'row' }}>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        </View>: this.props.star === 2.5 ?
                        <View style={{ flexDirection: 'row' }}>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_half} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        </View>: this.props.star === 3 ?
                        <View style={{ flexDirection: 'row' }}>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        </View>: this.props.star === 3.5 ?
                        <View style={{ flexDirection: 'row' }}>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_half} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        </View>: this.props.star === 4 ?
                        <View style={{ flexDirection: 'row' }}>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_none} marginLeft={10}/>
                        </View>: this.props.star === 4.5 ?
                        <View style={{ flexDirection: 'row' }}>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_half} marginLeft={10}/>
                        </View> :
                        <View style={{ flexDirection: 'row' }}>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        <WithLocalSvg asset={black_full} marginLeft={10}/>
                        </View> :
                        this.props.star <= 0 ?
                        <View style={{ flexDirection: 'row' }}>
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                        </View> : this.props.star <= 0.5 ?
                            <View style={{ flexDirection: 'row' }}>
                            <WithLocalSvg asset={white_half} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            </View>: this.props.star <= 1 ?
                            <View style={{ flexDirection: 'row' }}>
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            </View>: this.props.star <= 1.5 ?
                            <View style={{ flexDirection: 'row' }}>
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_half} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            </View>: this.props.star <= 2 ?
                            <View style={{ flexDirection: 'row' }}>
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            </View>: this.props.star <= 2.5 ?
                            <View style={{ flexDirection: 'row' }}>
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_half} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            </View>: this.props.star <= 3 ?
                            <View style={{ flexDirection: 'row' }}>
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_none} />
                            <WithLocalSvg asset={white_none} />
                            </View>: this.props.star <= 3.5 ?
                            <View style={{ flexDirection: 'row' }}>
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_half} />
                            <WithLocalSvg asset={white_none} />
                            </View>: this.props.star <= 4 ?
                            <View style={{ flexDirection: 'row' }}>
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_none} />
                            </View>: this.props.star === 4.5 ?
                            <View style={{ flexDirection: 'row' }}>
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_half} />
                            </View> :
                            <View style={{ flexDirection: 'row' }}>
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            <WithLocalSvg asset={white_full} />
                            </View>
                        }
            </View>

        );
    }
};

const styles = StyleSheet.create({
    star: {
        marginLeft: 10
    }
});