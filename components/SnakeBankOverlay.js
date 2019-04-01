import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {Font} from 'expo';
import {normalize} from '../utils/FontNormalizer.js';

export default class SnakeBankOverlay extends React.Component {
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
    },);
  }

  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.screen}>
          <ImageBackground source={require("../assets/BG.png")} style={styles.content} resizeMode={'stretch'}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image source={require('../assets/snakebank/closeBG.png')} style={styles.closeButtonImage}
                     resizeMode="stretch"/>
            </TouchableOpacity>
            <Text style={[styles.headingStyle, this.state.buttonDynamicStyle]}>
              SNAKE BANK
            </Text>
            <ImageBackground source={require("../assets/snakebank/textbox.png")} style={styles.textBox}>
              <Text style={[styles.inputStyle, this.state.buttonDynamicStyle]}>
                Text Box
              </Text>
            </ImageBackground>
            <View style={styles.snakeImageView}>
              <Image source={require("../assets/snakebank/yellowsnakeboard.png")}
                     style={styles.leftSnake}/>
              <Image source={require("../assets/snakebank/greensnake.png")}
                     style={styles.rightSnake}/>
            </View>
            <ImageBackground source={require("../assets/snakebank/textbox.png")} style={styles.txBox}>
              <View style={styles.tableHolder}>
                <View style={styles.tableHeader}>
                  <View style={styles.tableView}>
                    <Text style={[{color: "#EBAC26", fontSize: normalize(10)}, this.state.buttonDynamicStyle]}>TX
                      ID</Text>
                  </View>
                  <View style={styles.tableView}>
                    <Text style={[{color: "#896A66", fontSize: normalize(10)}, this.state.buttonDynamicStyle]}>TX
                      ID</Text>
                  </View>
                  <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={[{color: "#896A66", fontSize: normalize(10)}, this.state.buttonDynamicStyle]}>TX
                      ID</Text>
                  </View>
                </View>
                <View style={{flex: 2, flexDirection: "row",}}>
                  <View style={styles.tableViewBottom}>
                  </View>
                  <View style={styles.tableViewBottom}>
                  </View>
                  <View style={{flex: 1, borderTopColor: "#EBAC26", borderTopWidth: 1}}>
                    <Text style={[{color: "#EBAC26", textAlign: 'center'}, this.state.buttonDynamicStyle]}>105</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
            <TouchableOpacity>
              <ImageBackground source={require("../assets/snakebank/button.png")} style={styles.backToCampButton}>
                <Text style={[styles.backToCampButtonText, this.state.buttonDynamicStyle]}>RETURN TO MING CAMP</Text>
              </ImageBackground>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    }
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  screen: {
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
  content: {
    width: screenWidth * 685 / 724,
    height: screenHeight * 1180 / 1287,
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputStyle: {
    color: "#EBAC26",
    fontSize: normalize(13),
    paddingLeft: '2%',
  },
  headingStyle: {
    color: "#EBAC26",
    fontSize: normalize(33),
    textAlign: "center",
    marginTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: -10,
    zIndex: 100,
  },
  closeButtonImage: {
    height: 50,
    width: 35
  },
  textBox: {
    marginTop: 10,
    padding: 20,
    width: screenWidth * 872 / 1080,
    height: (299 / 818) * screenWidth * 872 / 1080,
  },
  snakeImageView: {
    marginTop: 10,
    flexDirection: 'row',
  },
  leftSnake: {
    width: screenWidth * 467 / 1080,
    height: (444 / 434) * screenWidth * 467 / 1080,
    resizeMode: "stretch",
  },
  rightSnake: {
    width: screenWidth * 330 / 1080,
    height: (994 / 717) * screenWidth * 330 / 1080,
    resizeMode: "stretch",
  },
  txBox: {
    marginTop: 10,
    width: screenWidth * 872 / 1080,
    height: (299 / 818) * screenWidth * 872 / 1080,
    justifyContent: "center",
    alignItems: 'center'
  },
  tableHolder: {
    width: screenWidth * 773 / 1080,
    height: "80%",
  },
  tableHeader: {
    flexDirection: "row",
  },
  tableView: {
    flex: 1,
    borderRightColor: "#EBAC26",
    borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tableViewBottom: {
    flex: 1,
    borderRightColor: "#EBAC26",
    borderRightWidth: 1,
    borderTopColor: "#EBAC26",
    borderTopWidth: 1
  },
  backToCampButton: {
    marginTop: 20,
    width: screenWidth * 709 / 1080,
    height: (182 / 671) * screenWidth * 709 / 1080,
    justifyContent: "center",
    alignItems: 'center'
  },
  backToCampButtonText: {
    color: "#EBAC26",
    fontSize: normalize(16)
  },
});
