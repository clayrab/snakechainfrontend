import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Font } from 'expo';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDynamicStyle: {},
    }
  }
  async componentDidMount(){
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({buttonDynamicStyle: {
      fontFamily: 'riffic-free-bold',
    }});
  }
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground source={require('../assets/profile/header.png')} style={styles.backgroundImage} resizeMode="stretch">
          <Image source={require('../assets/profile/settingButton.png')} style={styles.settingImage} resizeMode="stretch" />
          <ImageBackground source={require('../assets/profile/imageHolderBG.png')} style={styles.diamondBG} resizeMode="stretch">
            <Image source={require('../assets/profile/coinIcon.png')} style={styles.iconImage} resizeMode="stretch" />
            <Text style={[this.state.buttonDynamicStyle, styles.headerText]}>
              10
            </Text>
          </ImageBackground>
          <ImageBackground source={require('../assets/profile/diamondBox.png')} style={styles.diamondBG} resizeMode="stretch">
            <Text style={[this.state.buttonDynamicStyle, styles.headerText]}>
              100,000
            </Text>
          </ImageBackground>
        </ImageBackground>
        <ImageBackground source={require('../assets/profile/imageHolderBG.png')} style={styles.profileDetailsBG} resizeMode="stretch">
          <ImageBackground source={require('../assets/profile/imageHolder.png')} style={styles.profileImageBG} resizeMode="stretch">
          </ImageBackground>
          <View style={styles.profileInfoView}>
            <View style={styles.nameView}>
              <Image source={require('../assets/profile/greenIcon.png')} style={styles.iconImage} />
              <Text style={[styles.profileName, this.state.buttonDynamicStyle]}>
                John Smith
              </Text>
            </View>
            <View style={styles.numbersView}>
              <ImageBackground source={require('../assets/profile/iconBG.png')} style={styles.iconBG} resizeMode="stretch">
                <Image source={require('../assets/withdraw/DiamondIcom.png')} style={[styles.iconImage, {height: 25}]} resizeMode="stretch" />
                <Text style={styles.numberText}>
                  10000
                </Text>
              </ImageBackground>
              <ImageBackground source={require('../assets/profile/iconBG.png')} style={styles.iconBG} resizeMode="stretch">
                <Image source={require('../assets/profile/coinIcon.png')} style={styles.iconImage} resizeMode="stretch" />
                <Text style={styles.numberText}>
                  10
                </Text>
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.contentView}>
          <ImageBackground source={require('../assets/profile/rankBox.png')} style={styles.rankBoxBG} resizeMode="stretch">
            <View style={styles.rankChildView}>
              <View style={styles.childView}>
                <Text style={[this.state.buttonDynamicStyle, styles.keyText]}>
                  Total Winnings: 
                </Text>
              </View>
              <View style={styles.childView}>
                <Text style={[this.state.buttonDynamicStyle, styles.valueText]}>
                  4528
                </Text>
              </View>
            </View>
          </ImageBackground>
          <ImageBackground source={require('../assets/profile/rankBox.png')} style={styles.rankBoxBG} resizeMode="stretch">
          <View style={styles.rankChildView}>
            <View style={styles.childView}>
                <Text style={[this.state.buttonDynamicStyle, styles.keyText]}>
                  Rank 
                </Text>
              </View>
              <View style={styles.childView}>
                <Text style={[this.state.buttonDynamicStyle, styles.valueText]}>
                  141
                </Text>
              </View>
            </View>
          </ImageBackground>
          <TouchableOpacity style={{marginTop: 10}}>
            <ImageBackground source={require('../assets/profile/button.png')} style={styles.buttonBG} resizeMode="stretch">
              <Text style={[this.state.buttonDynamicStyle, styles.button]}>
                EDIT PROFILE PAGE
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageBackground source={require('../assets/profile/button.png')} style={styles.buttonBG} resizeMode="stretch">
              <Text style={[this.state.buttonDynamicStyle, styles.button]}>
                CHANGE PASSWORD
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  backgroundImage: {
    width: screenWidth,
    height: screenHeight / 10,
    flexDirection: 'row',
    alignItems: 'center'
   },
  safeArea: {
    backgroundColor: '#6B534E',
    flex: 1,
    marginTop: 20,
  },
  profileDetailsBG: {
    width: screenWidth,
    height: screenHeight / 5,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  profileImageBG: {
    width: screenWidth / 4,
    height: screenHeight / 5 - 30,
    marginLeft: 30,
  },
  profileInfoView: {
    flex: 1,
    flexDirection: 'column'
  },
  iconImage: {
    width: 20,
    height: 20
  },
  profileName: {
    fontSize: 22,
    color: '#F0C747',
    marginLeft: 20
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  numbersView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconBG: {
    width: screenWidth / 5,
    height: screenHeight / 10,
    marginLeft: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  numberText: {
    fontSize: 18,
    color: '#F0C747',
  },
  rankBoxBG: {
    width: screenWidth - 40,
    height: screenHeight / 10,
    marginTop: 10
  },
  buttonBG: {
    width: screenWidth / 1.5,
    height: screenHeight / 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentView: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    fontSize: 22,
    color: '#F0C747'
  },
  rankChildView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  childView: {
    flex: 1,
    alignItems: 'center'
  },
  keyText: {
    color: '#6B534E',
    fontSize: 18
  },
  valueText: {
    color: '#F0C747',
    fontSize: 22
  },
  settingImage: {
    width: screenHeight / 12,
    height: screenHeight / 12,
    marginLeft: 10
  },
  diamondBG: {
    width: screenWidth / 3,
    height: 30,
    marginLeft: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerText: {
    color: '#F0C747',
    fontSize: 16,
    marginLeft: screenWidth / 9
  }
});