import React from 'react';
import {
  StyleSheet,
  Text, ScrollView,
  TextInput, Image,
  View, ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Font } from 'expo';

export default class Fail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDynamicStyle: {}
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({
      buttonDynamicStyle: {
        fontFamily: 'riffic-free-bold',
      }
    });
  }
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.mainView}>
          <View style={styles.headingView}>
            <Text style={[styles.textStyle, this.state.buttonDynamicStyle]} > SNAKETOWN </Text>
          </View>
          <ImageBackground source={require("../assets/ticket/background.png")} resizeMode={"stretch"} style={styles.backgroundImageView}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage} resizeMode="stretch" />
            </TouchableOpacity>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: "center" }}>
              <Image source={require("../assets/success/cross.png")} style={styles.rightImage} />
            </View>
            <View style={{ flex: 1.4 }}>
              <Text style={[styles.textStyle, this.state.buttonDynamicStyle]} > Edit UnSuccessfull </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  screen: { flex: 1,  },
  headingView: { flex : 1, justifyContent: 'center', alignItems: "center" },
  textStyle: { fontSize: 20, color: "#FAC047" },
  backgroundImageView : {flex : 2 , alignItems : "center"},
  rightImage: { height: '50%', width: screenWidth / 4, resizeMode: "stretch" },
  mainView: { height: screenHeight / 1.4, marginHorizontal: '5%',  },
  closeButton: {
    position: 'absolute',
    top: -20,
    right: -15,
    zIndex: 100,
  },
  closeButtonImage: {
    height: 50,
    width: 35,
  },
})
