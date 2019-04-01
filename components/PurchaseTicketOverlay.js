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
import {Font} from 'expo';
import {normalize} from '../utils/FontNormalizer.js';

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
          <ImageBackground source={require("../assets/ticket/background.png")} resizeMode={"stretch"}
                           style={styles.mainView}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image source={require('../assets/wallet/closeBG.png')} style={styles.closeButtonImage}
                     resizeMode="stretch"/>
            </TouchableOpacity>
            <View style={styles.headerView}>
              <Text style={[styles.headerText, this.state.buttonDynamicStyle]}>Ship to SnakeBank</Text>
            </View>
            <Image source={require("../assets/ticket/train.png")} style={styles.ticketImage}/>
            <View style={styles.headerText2Holder}>
              <Text style={[styles.headerText2, this.state.buttonDynamicStyle]}>You can purchase transportation for your
                raw <Image source={require('../assets/wallet/coin.png')} style={[styles.coin]}/> to be minted at the
                Snake Bank</Text>
              <Text style={[styles.headerText2, this.state.buttonDynamicStyle]}>Upon shipping your haul, a courier will
                deposit [CURRENT HAUL AMT] <Image source={require('../assets/wallet/coin.png')}
                                                  style={[styles.coin]}/> SnakeChain into your Snake Wallet</Text>
              <Text style={[styles.headerText2small, this.state.buttonDynamicStyle]}>NOTE: It typically takes under
                10min to receive courier deposit</Text>
            </View>
            {this.props.user.haul > 0
              ?
              <TouchableOpacity onPress={this.purchaseWithETH}>
                <ImageBackground source={require("../assets/ticket/button.png")} resizeMode='stretch'
                                 style={styles.inputBackground}>
                  <View style={styles.textInputStyle}>
                    <Text style={[styles.ticketDescription, this.state.buttonDynamicStyle]}>Daily Tram </Text>
                  </View>
                  <View style={styles.ticketPrice}>
                    <Text style={[styles.ticketText, this.state.buttonDynamicStyle]}>0.01 Eth</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              :
              <TouchableOpacity>
                <ImageBackground source={require("../assets/ticket/button.png")} resizeMode='stretch'
                                 style={styles.inputBackground}>
                  <View style={styles.textInputStyle}>
                    <Text style={[styles.ticketDescription, this.state.buttonDynamicStyle]}>Daily Tram</Text>
                  </View>
                  <View style={styles.unvalid}>
                    <Text style={[styles.unvalidText, this.state.buttonDynamicStyle]}>Unavailable</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            }
            {/*this.props.user.haul >= this.props.user.mineMax
              ?
              <TouchableOpacity onPress={this.purchaseWithSNK}>
                <ImageBackground source={require("../assets/ticket/button.png")} resizeMode='stretch' style={styles.inputBackground}>
                  <View style={styles.textInputStyle}>
                    <Text style={[styles.ticketDescription, this.state.buttonDynamicStyle]} >Depleted Mine Tram</Text>
                  </View>
                  <View style={styles.ticketPrice}>
                    <Text style={[styles.ticketText, this.state.buttonDynamicStyle]}>200 Snk</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              :
              <TouchableOpacity>
                <ImageBackground source={require("../assets/ticket/button.png")} resizeMode='stretch' style={styles.inputBackground}>
                  <View style={styles.textInputStyle}>
                    <Text style={[styles.ticketDescription, this.state.buttonDynamicStyle]} >Depleted Mine Tram</Text>
                  </View>
                  <View style={styles.unvalid}>
                    <Text style={[styles.unvalidText, this.state.buttonDynamicStyle]}>200 Snk</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            */}
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: screenWidth * 638 / 726,
    //aspectRatio: 960/983, THIS IS THE ACTUAL IMAGE SIZE
    aspectRatio: 960 / 1433,
    alignItems: 'center',
  },
  ticketText: {
    fontSize: normalize(16),
    color: "#FCB627",
  },
  headerView: {
    marginTop: 34,
    justifyContent: 'center',
    alignItems: "center",
  },
  headerText: {
    fontSize: normalize(24),
    color: "#FCB627",
  },
  headerText2Holder: {
    padding: 25,
    // justifyContent: 'center',
    // alignItems: "center",
  },
  headerText2: {
    fontSize: normalize(14),
    color: "#FCB627",
    paddingTop: 4,
  },
  headerText2small: {
    fontSize: normalize(12),
    color: "#FCB627",
    paddingTop: 4,
    opacity: 0.8,
  },
  ticketImage: {
    marginTop: 20,
    width: screenWidth * 232 / 726,
    height: (227 / 342) * screenWidth * 232 / 726,
  },
  succeedButton: {height: screenHeight / 11, width: "45%",},
  arrowImg: {height: "60%", width: "20%", resizeMode: 'stretch',},
  textInputStyle: {flex: 2, paddingLeft: '7%', justifyContent: "center"},
  succeedText: {color: "#352526", fontSize: normalize(13),},
  textBox: {fontSize: normalize(13), paddingLeft: '10%', width: "90%", color: "#705756", height: "100%"},
  unvalid: {flex: 1, justifyContent: "center", alignItems: "flex-start"},
  unvalidText: {fontSize: normalize(13), color: "#7D5B1E"},
  proceedView: {
    position: "absolute",
    bottom: -45,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBackground: {
    //marginTop: 15,
    width: screenWidth * 574 / 726,
    height: (156 / 863) * screenWidth * 574 / 726,
    flexDirection: "row",
  },
  ticketDescription: {
    fontSize: normalize(12),
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
  coin: {height: 12, width: 12 * 168 / 128, resizeMode: 'stretch',},
})
