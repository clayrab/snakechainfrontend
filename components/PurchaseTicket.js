import React from 'react';
import {
    StyleSheet,
    Text, ScrollView,
    TextInput, Image,
    View, ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { Font } from 'expo';

export default class PurchaseTicket extends React.Component {
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
          <View style={styles.textView}>
            <Text style={[styles.ticketText, this.state.buttonDynamicStyle]} >Purchase a Train Ticket </Text>
          </View>
          <View style={styles.ticketImageView}>
            <Image source={require("../assets/ticket/train.png")} style={styles.ticketImage} />
          </View>
          <View style={styles.inputView}>
            <ImageBackground source={require("../assets/edit/top.png")} resizeMode='stretch' style={styles.inputBackground}>
              <View style={styles.textInputStyle}>
                <Text style={[styles.ticketDescription, this.state.buttonDynamicStyle]} >1st Class:Any Field </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
                <Text style={[styles.ticketText, this.state.buttonDynamicStyle]} >0.01 Eth </Text>
              </View>
            </ImageBackground>
            <ImageBackground source={require("../assets/edit/top.png")} resizeMode='stretch' style={styles.inputBackground}>
              <View style={styles.textInputStyle}>
                <Text style={[styles.ticketDescription, this.state.buttonDynamicStyle]} >2nd Class:Full Field </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
                <Text style={[styles.unvalidText, this.state.buttonDynamicStyle]} >Unvalid </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.buttonView}>
            <Image source={require("../assets/ticket/succeed.png")} resizeMode='stretch' style={styles.succeedButton} />
            <View style = {{position : 'absolute'  , flexDirection : "row" , justifyContent : 'center' , alignItems : 'center'}}>
            <Text style={[styles.succeedText, this.state.buttonDynamicStyle]} >Proceed </Text>
            <Image source={require("../assets/ticket/rightArrow.png")} resizeMode='stretch' style={styles.arrowImg} />
            </View>
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
  mainView: { height: screenHeight / 2, marginHorizontal: '5%', },
  textView: { flex: 1.5, justifyContent: 'center', alignItems: "center" },
  succeedButton: { height: screenHeight / 11, width: "45%", },
  arrowImg : {height : "60%" , width : "20%" , resizeMode : 'stretch' ,},
  ticketImage: { height: "90%", width: '50%', resizeMode: "stretch" },
  ticketImageView: { flex: 2, justifyContent: "center", alignItems: "center" },
  inputView: { flex: 3, justifyContent: "center", paddingBottom: "4%", },
  textInputStyle: { flex: 2, paddingLeft: '7%', justifyContent: "center" },
  ticketDescription: { fontSize: 14, color: "#947572" },
  succeedText: { color: "#352526", fontSize: 15,  },
  textBox: { fontSize: 15, paddingLeft: '10%', width: "90%", color: "#705756", height: "100%" },
  unvalidText: { fontSize: 15, color: "#7D5B1E" },
  buttonView: { position: "absolute", width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", bottom: -30 },
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
})
