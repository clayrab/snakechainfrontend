import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

export default class GameOverOverlay extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image style={styles.closeButtonImage} source={require('../assets/closebutton_bad.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.props.restart}>
              <Text>restart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.props.exit}>
              <Text>exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor:  'rgba(0,0,0,0.6)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor:  'rgba(0,0,0,1.0)',
    width: screenWidth*4/5,
    height: screenHeight*4/5,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  button: { // DELETE ME
    backgroundColor: "#F00",
    marginTop: 100,
    marginLeft: "25%",
    width: "50%",
  }
});
