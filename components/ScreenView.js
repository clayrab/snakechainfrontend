import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import StatusBarHeight from '@expo/status-bar-height';
let statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight; //This is not reliable, but will initialize at this number
const screenHeight = require('Dimensions').get('window').height;
//statusBarHeight = 50;

export default class ScreenView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {statusBarHeight: statusBarHeight};
  }

  componentDidMount = async () => {
    //console.log("ScreenView componentDidMount");
    //StatusBarHeight.addEventListener(statusBarListener);
  }

  componentWillUnmount() {
    //console.log("ScreenView componentWillUnmount");
    //StatusBarHeight.removeEventListener(statusBarListener);
  }

  render() {
    return (
      <SafeAreaView style={[{
        marginTop: this.state.statusBarHeight,
        height: screenHeight - statusBarHeight,
      }, styles.screen, this.props.style]}>
        {this.props.children}
      </SafeAreaView>
    )
  }
}
let SCREEN_HEIGHT = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  screen: {
    width: "100%",
  },
});
