import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Font } from 'expo';

export default class PurchaseTicketOverlay extends React.Component {
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
  purchaseWithETH = () => {
    this.props.onSelectTicket("ETH");
  }
  purchaseWithSNK = () => {
    this.props.onSelectTicket("SNK");
  }
  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground source={require("../assets/ticket/background.png")} resizeMode={"stretch"} style={styles.mainView}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage} resizeMode="stretch" />
            </TouchableOpacity>
            <View style={styles.headerView}>
              <Text style={[styles.headerText, this.state.buttonDynamicStyle]}>Purchase a Train Ticket</Text>
            </View>
            <Image source={require("../assets/ticket/train.png")} style={styles.ticketImage}/>


            {this.props.user.haul > 0
              ?
              <TouchableOpacity onPress={this.purchaseWithETH}>
                <ImageBackground source={require("../assets/ticket/button.png")} resizeMode='stretch' style={styles.inputBackground}>
                  <View style={styles.textInputStyle}>
                    <Text style={[styles.ticketDescription, this.state.buttonDynamicStyle]} >1st Class:Any Field </Text>
                  </View>
                  <View style={styles.ticketPrice}>
                    <Text style={[styles.ticketText, this.state.buttonDynamicStyle]}>0.01 Eth</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              :
              <TouchableOpacity>
                <ImageBackground source={require("../assets/ticket/button.png")} resizeMode='stretch' style={styles.inputBackground}>
                  <View style={styles.textInputStyle}>
                    <Text style={[styles.ticketDescription, this.state.buttonDynamicStyle]}>1st Class:Any Field</Text>
                  </View>
                  <View style={styles.ticketPrice}>
                    <Text style={[styles.ticketText, this.state.buttonDynamicStyle]}>Unavailable</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            }
            {this.props.user.haul >= this.props.user.mineMax
              ?
              <TouchableOpacity onPress={this.purchaseWithSNK}>
                <ImageBackground source={require("../assets/ticket/button.png")} resizeMode='stretch' style={styles.inputBackground}>
                  <View style={styles.textInputStyle}>
                    <Text style={[styles.ticketDescription, this.state.buttonDynamicStyle]} >2nd Class:Full Field </Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
                    <Text style={[styles.unvalidText, this.state.buttonDynamicStyle]} >Unvalid </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              :
              <TouchableOpacity>
                <ImageBackground source={require("../assets/ticket/button.png")} resizeMode='stretch' style={styles.inputBackground}>
                  <View style={styles.textInputStyle}>
                    <Text style={[styles.ticketDescription, this.state.buttonDynamicStyle]} >2nd Class:Full Field </Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
                    <Text style={[styles.unvalidText, this.state.buttonDynamicStyle]}>Unavailable</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            }
            {/*<View style={styles.proceedView}>
              <Image source={require("../assets/ticket/succeed.png")} resizeMode='stretch' style={styles.succeedButton} />
              <View style = {{position : 'absolute'  , flexDirection : "row" , justifyContent : 'center' , alignItems : 'center'}}>
              <Text style={[styles.succeedText, this.state.buttonDynamicStyle]} >Proceed </Text>
              <Image source={require("../assets/ticket/rightArrow.png")} resizeMode='stretch' style={styles.arrowImg} />
              </View>
            </View>*/}
          </ImageBackground>
        </View>
      );
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
    backgroundColor:  'rgba(0,0,0,0.6)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: screenWidth * 638/726,
    aspectRatio: 960/983,
    alignItems: 'center',
  },
  ticketText: {
    fontSize: 18,
    color: "#FCB627",
  },
  headerView: {
    marginTop: 34,
    justifyContent: 'center',
    alignItems: "center",
  },
  headerText: {
    fontSize: 26,
    color: "#FCB627",
  },
  ticketImage: {
    marginTop: 20,
    width: screenWidth * 232/726,
    height: (227/342)*screenWidth * 232/726,
  },
  succeedButton: { height: screenHeight / 11, width: "45%", },
  arrowImg : {height : "60%" , width : "20%" , resizeMode : 'stretch' ,},
  textInputStyle: { flex: 2, paddingLeft: '7%', justifyContent: "center" },
  succeedText: { color: "#352526", fontSize: 15,  },
  textBox: { fontSize: 15, paddingLeft: '10%', width: "90%", color: "#705756", height: "100%" },
  unvalidText: { fontSize: 15, color: "#7D5B1E" },
  proceedView: {
    position: "absolute",
    bottom: -45,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBackground: {
    marginTop: 15,
    width: screenWidth * 574/726,
    height: (156/863)*screenWidth * 574/726,
    flexDirection: "row",
  },
  ticketDescription: {
    fontSize: 14,
    color: "#947572",
  },
  ticketPrice: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },
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
