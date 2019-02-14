import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { Font } from 'expo';
import SafeAreaView from 'react-native-safe-area-view';

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
    if(!this.props.show) {
      return null;
    } else {
      return (
        <SafeAreaView style={styles.screen}>
          <View>
            <View style={{ paddingVertical: 8 }}>
              <ImageBackground source={require("../assets/snakebank/BackgroundBrown.png")}
                  style={styles.content} resizeMode={'stretch'} />
              <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
                  <Image source={require('../assets/snakebank/closeBG.png')} style={styles.closeButtonImage} resizeMode="stretch" />
              </TouchableOpacity>
              <View style={styles.container}>
                <View style={{ flex: 1, paddingTop: '11%' }}>
                  <View>
                    <Text style={[styles.headingStyle, this.state.buttonDynamicStyle]}>SNAKE BANK</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "3%" }}>
                    <Image source={require("../assets/snakebank/textbox.png")}
                        style={styles.inputImage} />
                    <View style={styles.inputView}>
                      <TextInput underlineColorAndroid={"transparent"}
                        placeholder={"Text Input"}
                        placeholderTextColor={"#EBAC26"}
                        style={[styles.inputStyle, this.state.buttonDynamicStyle]} />
                    </View>
                  </View>
                  <View style={styles.snakeImageView}>
                    <Image source={require("../assets/snakebank/yellowsnakeboard.png")}
                      style={styles.snakeImages1} />
                    <Image source={require("../assets/snakebank/greensnake.png")}
                      style={styles.snakeImages} />
                  </View>
                  <View style={{ flex: 2, }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                      <Image source={require("../assets/snakebank/textbox.png")}
                          style={styles.textBoxImage} />
                      <View style={{ width: "70%", flex: 1, padding: 3 }}>
                        <View style={{ flex: 1, flexDirection: "row", }}>
                          <View style={styles.tableView}>
                            <Text style={[{ color: "#EBAC26", fontSize: 12 }, this.state.buttonDynamicStyle]}>TX ID</Text>
                          </View>
                          <View style={styles.tableView}>
                            <Text style={[{ color: "#d4cb9e", fontSize: 12 }, this.state.buttonDynamicStyle]}>TX ID</Text>
                          </View>
                          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={[{ color: "#d4cb9e", fontSize: 12 }, this.state.buttonDynamicStyle]}>TX ID</Text>
                          </View>
                        </View>
                        <View style={{ flex: 2, flexDirection: "row", }}>
                          <View style={styles.tableViewBottom}>
                          </View>
                          <View style={styles.tableViewBottom}>
                          </View>
                          <View style={{ flex: 1, borderTopColor: "#EBAC26", borderTopWidth: 1 }}>
                            <Text style={[{ color: "#EBAC26", textAlign: 'center' }, this.state.buttonDynamicStyle]}>105</Text>
                          </View>
                        </View>
                      </View>
                      </View>
                      <TouchableOpacity style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: 'center', }}>
                        <Image source={require("../assets/snakebank/button.png")}
                          style={{ resizeMode: "stretch", height: '80%', width: '75%', position: "absolute" }} />
                        <Text style={[styles.textStyle, this.state.buttonDynamicStyle]}>RETURN TO MING COMP</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
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
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: "#EBAC26",
    fontSize: 15
  },
  inputStyle: {
    color: "#EBAC26",
    fontSize: 15,
    paddingLeft: '2%',
  },
  headingStyle: {
    color: "#EBAC26",
    fontSize: 28,
    textAlign: "center",
    paddingTop: 5
  },
  tableView: {
    flex: 1, borderRightColor: "#EBAC26", borderRightWidth: 1, justifyContent: "center", alignItems: "center"
  },
  tableViewBottom: {
    flex: 1, borderRightColor: "#EBAC26", borderRightWidth: 1, borderTopColor: "#EBAC26", borderTopWidth: 1
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
  snakeImageView: {
    flex: 2, flexDirection: 'row', marginHorizontal: "10%",
    justifyContent: "space-around", marginVertical: 4,
  },
  container: {
    position: 'absolute', height: "100%", width: "100%",
  },
  inputView: {
    position: "absolute", height: "82%", width: "75%",
  },
  inputImage: { resizeMode: "stretch", height: '100%', width: '80%', },
  textBoxImage: { resizeMode: "stretch", height: '100%', width: '75%', position: "absolute", },
  backgroundImage: { resizeMode: "stretch", height: "95%", width: "95%", },
  snakeImages1: { resizeMode: "stretch", height: '90%', width: '50%', },
  snakeImages: { resizeMode: "stretch", height: '90%', width: '40%', },
  mainView: { backgroundColor: "#323232", height: '100%', width: "100%" },
  content: {
    width: screenWidth * 4 / 5,
    height: screenHeight * 4 / 5,
    position: 'relative',
    flexDirection: 'column',
  },
});
