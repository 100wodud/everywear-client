import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './Tab';


export default class OpenTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <MyTabs />
        );
    }
}