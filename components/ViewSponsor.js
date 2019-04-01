import React from 'react';
import {
  StyleSheet,
  Text, ScrollView,
  TextInput, Image,
  View, ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Font} from 'expo';

export default class Sponsor extends React.Component {
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
        <ImageBackground source={require("../assets/snakeoil/background.png")} resizeMode={"stretch"}
                         style={styles.mainView}>
          <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
            <Image source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage}
                   resizeMode="stretch"/>
          </TouchableOpacity>
          <Image source={require("../assets/snakeoil/yellowsnake.png")} style={styles.snakeImage}
                 resizeMode={"stretch"}/>
          <View style={styles.ticketImageView}>
            <Text style={[styles.sponsorText, this.state.buttonDynamicStyle]}>Watch a sponsor Video for </Text>
            <Text style={[styles.sponsorText, this.state.buttonDynamicStyle]}>winnig snake chain </Text>
          </View>
          <View style={styles.textView}>
            <Text style={[styles.ticketText, this.state.buttonDynamicStyle]}>Add 305 To Hank </Text>
          </View>
          <View style={styles.ButtonView}>
            <ImageBackground source={require("../assets/snakeoil/yellowButton.png")} resizeMode='stretch'
                             style={styles.succeedButton}>
              <Text style={[styles.succeedText, this.state.buttonDynamicStyle]}>View Sponsor </Text>
            </ImageBackground>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  screen: {flex: 1, justifyContent: "center",},
  ticketText: {fontSize: 18, color: "#FCB627"},
  sponsorText: {fontSize: 14, color: "#947572"},
  mainView: {height: screenHeight / 2.2, marginHorizontal: '5%', alignItems: "center"},
  textView: {flex: 1, justifyContent: 'center', alignItems: "center"},
  succeedButton: {height: '55%', width: "90%", justifyContent: "center", alignItems: "center", flexDirection: "row"},
  ticketImage: {height: "60%", width: '50%', resizeMode: "stretch"},
  ticketImageView: {flex: 2, justifyContent: "flex-end", alignItems: "center"},
  ButtonView: {flex: 2, justifyContent: "center", alignItems: "center"},
  succeedText: {color: "#352526", fontSize: 15, position: 'absolute',},
  snakeImage: {position: 'absolute', height: "50%", width: '40%', top: -63},
  inputBackground: {height: "35%", marginHorizontal: "10%", flexDirection: 'row', marginVertical: '1%'},
  closeButton: {
    position: 'absolute',
    top: -screenWidth * 9 / 724,
    right: -screenWidth * 9 / 724,
    zIndex: 100,
  },
  closeButtonImage: {
    height: 50,
    width: 35,
  },
  arrowImg: {height: "60%", width: "20%", resizeMode: 'stretch',},
});
