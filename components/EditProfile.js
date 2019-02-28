import React from 'react';
import {
  StyleSheet,
  Text, ScrollView,
  TextInput, Image,
  View, ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Font } from 'expo';
import SafeAreaView from 'react-native-safe-area-view';
import TextInputView from './TextInputView'
export default class EditProfile extends React.Component {
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
      <SafeAreaView>
        <ScrollView style={styles.screen}>
          <ImageBackground source={require("../assets/edit/header.png")} resizeMode={"stretch"} style={styles.header}>
            <View style={[styles.headerChild, { flex: 1 }]}>
              <Image source={require("../assets/edit/settingButton.png")} style={styles.settingImage} />
            </View>
            <View style={[styles.headerChild]}>
              <Image source={require("../assets/edit/coinBox.png")} style={styles.coinBoxImage} />
              <Text style={[styles.headerText, this.state.buttonDynamicStyle]}>10</Text>
            </View>
            <View style={[styles.headerChild]}>
              <Image source={require("../assets/edit/diamondBox.png")} style={styles.diamondBoxImage} />
              <Text style={[styles.headerText, this.state.buttonDynamicStyle]}>100,000</Text>
            </View>
          </ImageBackground>
          <View style={styles.editImageView}  >
            <ImageBackground source={require("../assets/edit/imageHolder.png")} resizeMode='stretch' style={styles.editImage} >
              <Image source={require("../assets/edit/pencil.png")} style={styles.editPencil} />
            </ImageBackground>
          </View>
          <TextInputView placeHolder={"First Name"} dynamicStyle={this.state.buttonDynamicStyle} />
          <TextInputView placeHolder={"Last Name"} dynamicStyle={this.state.buttonDynamicStyle} />
          <TextInputView placeHolder={"User Name"} dynamicStyle={this.state.buttonDynamicStyle} />
          <TextInputView placeHolder={"Phone Number"} dynamicStyle={this.state.buttonDynamicStyle} />
          <TextInputView placeHolder={"Email"} dynamicStyle={this.state.buttonDynamicStyle} />
          <ImageBackground source={require("../assets/edit/socialBackground.png")} style={styles.linkBackgroundImage} resizeMode={"stretch"} >
            <Text style={[styles.linkText, this.state.buttonDynamicStyle]}> Link to: </Text>
            <View style={styles.socialImagesContainer}>
              <View style={styles.socialImagesView}>
                <Image source={require("../assets/edit/facebookIcon.png")} style={styles.socialImages} />
                <Image source={require("../assets/edit/swithOn.png")} style={styles.switchImageLink} />
              </View>
              <View style={styles.socialImagesView}>
                <Image source={require("../assets/edit/GoogleIcon.png")} style={styles.socialImages} />
                <Image source={require("../assets/edit/swithOff.png")} style={styles.switchImageLink} />
              </View>
              <View style={styles.socialImagesView}>
                <Image source={require("../assets/edit/homeIcon.png")} style={styles.socialImages} />
                <Image source={require("../assets/edit/swithOff.png")} style={styles.switchImageLink} />
              </View>
            </View>
          </ImageBackground>
          <ImageBackground source={require("../assets/edit/imageHolderBG.png")} style={styles.linkBackgroundImage} resizeMode={"stretch"} >
            <Text style={[styles.privacyText, this.state.buttonDynamicStyle]}> Privacy Setting </Text>
            <TouchableOpacity style={styles.privacyButton}>
              <Image source={require("../assets/edit/rankBox.png")} style={styles.privacyButtonImage} />
              <Text style={[styles.privacyButtonText, this.state.buttonDynamicStyle]}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.privacyButton}>
              <Image source={require("../assets/edit/rankBox.png")} style={styles.privacyButtonImage} />
              <Text style={[styles.privacyButtonText, this.state.buttonDynamicStyle]}>View Private Key</Text>
            </TouchableOpacity>
          </ImageBackground>
          <ImageBackground source={require("../assets/edit/imageHolderBG.png")} style={styles.linkBackgroundImage} resizeMode={"stretch"} >
            <Text style={[styles.privacyText, this.state.buttonDynamicStyle]}> Enable 2 Factor Authentication </Text>
            <View style={styles.authenticationView}>
              <ImageBackground source={require("../assets/edit/rankBox.png")} style={styles.authChild} resizeMode="stretch" >
                <Text style={[styles.authText, this.state.buttonDynamicStyle]}>Phone</Text>
              </ImageBackground>
              <View style={styles.authSwitch}>
                <Image source={require("../assets/edit/swithOn.png")} style={styles.switchImage} />
              </View>
            </View>
            <View style={styles.authenticationView}>
              <ImageBackground source={require("../assets/edit/rankBox.png")} style={styles.authChild} resizeMode="stretch" >
                <Text style={[styles.authText, this.state.buttonDynamicStyle]}>Email</Text>
              </ImageBackground>
              <View style={styles.authSwitch}>
                <Image source={require("../assets/edit/swithOff.png")} style={styles.switchImage} />
              </View>
            </View>
          </ImageBackground>
          <View style={styles.deleteView}>
            <ImageBackground source={require("../assets/edit/DeleteButton.png")} style={styles.deleteImage} resizeMode="stretch" >
              <Image source={require("../assets/edit/deleteIcon.png")} style={styles.deleteIcon} />
              <Text style={[styles.deleteText, this.state.buttonDynamicStyle]}>Delete Account</Text>
            </ImageBackground>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let titleBarHeight = screenWidth * .757 / 3.6;
let styles = StyleSheet.create({
  screen: {
    backgroundColor: "#51403D",
    height: "100%",
    width: "100%"
  },
  header: {
    height: screenHeight / 9,
    width: screenWidth,
    flexDirection: "row",
  },
  headerChild: {
    flex: 2, justifyContent: "center", alignItems: "center"
  },
  pencilImage: { height: "36%", width: "5%", resizeMode: "stretch", paddingRight: "6%" },
  headerText: { color: "#FCB627", position: "absolute" },
  diamondBoxImage: { marginTop: 4, height: "60%", width: "90%", resizeMode: "stretch" },
  coinBoxImage: { height: "50%", width: "90%", resizeMode: "stretch" },
  editImageView: {
    height: screenHeight / 5.5,
    justifyContent: "center", alignItems: "center"
  },
  editPencil: { height: "50%", width: "40%", resizeMode: "stretch" },
  editImage: { height: "95%", width: "30%", justifyContent: "center", alignItems: "center" },
  textBoxView: { marginTop: "2%" },
  textBoxImage: {
    height: screenHeight / 11,
    marginHorizontal: '5%',
    flexDirection: "row",
    alignItems: "center"
  },
  socialImagesContainer: { flex: 1, flexDirection: "row" },
  socialImagesView: { flex: 1, alignItems: "center", justifyContent: "center" },
  textBox: {
    fontSize: 15,
    paddingLeft: '10%',
    width: "90%",
    color: "#705756",
    height: "100%"
  },
  linkBackgroundImage: {
    height: screenHeight / 4,
    marginHorizontal: '5%',
    marginTop: '2%',
  },
  switchImageLink: { height: '22%', width: '35%', resizeMode: "stretch", marginTop: '5%' },
  deleteText: { color: '#fff', fontSize: 18 },
  deleteIcon: { height: "38%", width: "9%", resizeMode: "stretch", marginHorizontal: "5%" },
  deleteImage: { height: '70%', width: "70%", flexDirection: "row", alignItems: "center", justifyContent: "center" },
  deleteView: { height: screenHeight / 7, marginHorizontal: '5%', justifyContent: "center", alignItems: 'center', },
  privacyButton: { flex: 1, alignItems: "center", justifyContent: "center" },
  privacyButtonText: { color: "#927773", position: 'absolute' },
  privacyButtonImage: { height: "95%", width: "90%", resizeMode: "stretch" },
  authenticationView: { flex: 1, flexDirection: 'row', marginVertical: "2%" },
  authChild: { flex: 3, justifyContent: "center", marginHorizontal: "2%" },
  authSwitch: { flex: 1, justifyContent: 'center', alignItems: "center" },
  switchImage: { height: '70%', width: '60%', resizeMode: 'stretch' },
  authText: { paddingLeft: "14%", color: "#927773" },
  socialImages: { height: "55%", width: "50%", resizeMode: "stretch" },
  settingImage: { height: "70%", width: "70%", resizeMode: "stretch" },
  privacyText: { textAlign: "center", color: "#FBB323", fontSize: 14, marginVertical: "4%", letterSpacing: 0.8 },
  linkText: { textAlign: "center", color: "#FBB323", fontSize: 15, marginVertical: "2%", letterSpacing: 0.8 }
});
