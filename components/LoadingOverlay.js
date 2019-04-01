import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class LoadingOverlay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.backgroundImage}>
            <Text style={styles.text}>Loading...</Text>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        </View>
      )
    }
  }
}

let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'relative',
    width: screenWidth * 95 / 100,
    height: screenHeight * 95 / 100,
    backgroundColor: 'rgba(0,0,0,1.0)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    color: "#fff",
    fontSize: 16
  }
});
