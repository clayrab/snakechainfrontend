import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image
} from 'react-native';
import ScreenView from '../components/ScreenView.js';
import {Font} from 'expo';
import Header from '../components/Header.js';
import {normalize} from '../utils/FontNormalizer.js';
import {formatToken} from '../utils/uiHelperFunctions.js';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDynamicStyle: {},
    }
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
      <ScreenView>
        <Header loading={this.props.loading} user={this.props.user} onProfile={this.props.onProfile}
                onWallet={this.props.onWallet} hasBackButton={true} exit={this.props.exit}/>
        <ImageBackground source={require('../assets/profile/imageHolderBG.png')} style={styles.profileDetailsBG}
                         resizeMode="stretch">
          <ImageBackground source={require('../assets/profile/imageHolder.png')} style={styles.profileImageBG}
                           resizeMode="stretch">
          </ImageBackground>
          <View style={styles.profileInfoView}>
            <View style={styles.nameView}>
              <Image source={require('../assets/profile/greenIcon.png')} style={styles.iconImage}/>
              <Text style={[styles.profileName, this.state.buttonDynamicStyle]}>
                {this.props.user.name}
              </Text>
            </View>
            <View style={styles.numbersView}>
              <ImageBackground source={require('../assets/profile/iconBG.png')} style={styles.iconBG}
                               resizeMode="stretch">
                <Image source={require('../assets/withdraw/DiamondIcom.png')} style={[styles.iconImage, {height: 25}]}
                       resizeMode="stretch"/>
                <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.numberText, this.state.titleBarTextStyle]}>
                  {formatToken(this.props.user.eth, "ETH")}
                </Text>
              </ImageBackground>
              <ImageBackground source={require('../assets/profile/iconBG.png')} style={styles.iconBG}
                               resizeMode="stretch">
                <Image source={require('../assets/profile/coinIcon.png')} style={styles.iconImage}
                       resizeMode="stretch"/>
                <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.numberText, this.state.titleBarTextStyle]}>
                  {this.props.user.snek}
                </Text>
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.contentView}>
          <ImageBackground source={require('../assets/profile/rankBox.png')} style={styles.rankBoxBG}
                           resizeMode="stretch">
            <View style={styles.rankChildView}>
              <View style={styles.childView}>
                <Text style={[this.state.buttonDynamicStyle, styles.keyText]}>
                  Total Winnings:
                </Text>
              </View>
              <View style={styles.childView}>
                <Text style={[this.state.buttonDynamicStyle, styles.valueText]}>
                  ????
                </Text>
              </View>
            </View>
          </ImageBackground>
          <ImageBackground source={require('../assets/profile/rankBox.png')} style={styles.rankBoxBG}
                           resizeMode="stretch">
            <View style={styles.rankChildView}>
              <View style={styles.childView}>
                <Text style={[this.state.buttonDynamicStyle, styles.keyText]}>
                  Rank
                </Text>
              </View>
              <View style={styles.childView}>
                <Text style={[this.state.buttonDynamicStyle, styles.valueText]}>
                  ????
                </Text>
              </View>
            </View>
          </ImageBackground>
          {/*<TouchableOpacity style={{marginTop: 10}}>
            <ImageBackground source={require('../assets/profile/button.png')} style={styles.buttonBG} resizeMode="stretch">
              <Text style={[this.state.buttonDynamicStyle, styles.buttonBig]}>
                EDIT PROFILE PAGE
              </Text>
            </ImageBackground>
          </TouchableOpacity>*/}
          <TouchableOpacity>
            <ImageBackground source={require('../assets/profile/button.png')} style={styles.buttonBG}
                             resizeMode="stretch">
              <Text style={[this.state.buttonDynamicStyle, styles.buttonBig]}>
                CHANGE PASSWORD
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageBackground source={require('../assets/profile/button.png')} style={styles.buttonBG}
                             resizeMode="stretch">
              <Text style={[this.state.buttonDynamicStyle, styles.buttonBig]}>
                LOG OUT
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScreenView>
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
    fontSize: normalize(20),
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
    fontSize: normalize(16),
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
  buttonBig: {
    fontSize: normalize(18),
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
    fontSize: normalize(16)
  },
  valueText: {
    color: '#F0C747',
    fontSize: normalize(20)
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
    fontSize: normalize(14),
    marginLeft: screenWidth / 9
  }
});
