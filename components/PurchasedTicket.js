import React from 'react';
import {
  StyleSheet,
  Text, ScrollView,
  TextInput, Image,
  View, ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Font } from 'expo';

export default class PurchasedTicket extends React.Component {
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
        <ImageBackground source={require("../assets/ticket/background.png")} resizeMode={"stretch"} style={styles.mainView}>
          <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
            <Image source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage} resizeMode="stretch" />
          </TouchableOpacity>
          <View style={styles.ticketImageView}>
            <Image source={require("../assets/ticket/train.png")} style={styles.ticketImage} />
          </View>
          <View style={styles.textView}>
            <Text style={[styles.ticketText, this.state.buttonDynamicStyle]} >Ticket Purchase  </Text>
            <Text style={[styles.ticketText, this.state.buttonDynamicStyle]} >Success </Text>
          </View>
          <View style={styles.ButtonView}>
            <ImageBackground source={require("../assets/ticket/succeed.png")} resizeMode='stretch' style={styles.succeedButton} >
              <Text style={[styles.succeedText, this.state.buttonDynamicStyle]} >Proceed </Text>
            <Image source={require("../assets/ticket/rightArrow.png")} resizeMode='stretch' style={styles.arrowImg} />
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
  screen: { flex: 1, justifyContent: "center", },
  ticketText: { fontSize: 18, color: "#FCB627" },
  mainView: { height: screenHeight / 1.8, marginHorizontal: '5%', },
  textView: { flex: 1, justifyContent: 'center', alignItems: "center" },
  succeedButton: { height: '55%', width: "50%", flexDirection : "row" , justifyContent : "center" , alignItems : "center" ,   },
  ticketImage: { height: "60%", width: '50%', resizeMode: "stretch" },
  ticketImageView: { flex: 4, justifyContent: "center", alignItems: "center" },
  ButtonView: { flex: 2, justifyContent: "center", alignItems : "center" },
  succeedText: { color: "#352526", fontSize: 15,},
  inputBackground: { height: "35%", marginHorizontal: "10%", flexDirection: 'row', marginVertical: '1%' },
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
    arrowImg : {height : "30%" , width : "10%" , resizeMode : 'stretch' ,},
})
