import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput
} from 'react-native';
import {Font} from 'expo';
import {normalize} from '../utils/FontNormalizer.js';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPlaceHolder: 'Phone Number',
      passwordPlaceHolder: 'Password',
      repasswordPlaceHolder: 'Re enter password',
      robotCBPress: true,
      termCBPress: true,
      securePassword: false,
      securerePassword: false,
      buttonDynamicStyle: {}
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

  loginFocus = () => {
    if (this.state.loginPlaceHolder) {
      this.setState({loginPlaceHolder: ''});
    }
  }

  loginChangeText = (value) => {
    this.setState({loginPlaceHolder: value});
  }

  loginBlur = () => {
    if (!this.state.loginPlaceHolder) {
      this.setState({loginPlaceHolder: 'Phone Number'});
    }
  }

  passwordChangeText = (value) => {
    this.setState({
      passwordPlaceHolder: value
    });
  }
  repasswordChangeText = (value) => {
    this.setState({
      repasswordPlaceHolder: value
    });
  }
  passwordFocus = () => {
    if (this.state.passwordPlaceHolder) {
      this.setState({passwordPlaceHolder: '', securePassword: true});
    }
  }
  repasswordFocus = () => {
    if (this.state.repasswordPlaceHolder) {
      this.setState({repasswordPlaceHolder: '', securerePassword: true});
    }
  }
  passwordBlur = () => {
    if (!this.state.passwordPlaceHolder) {
      this.setState({passwordPlaceHolder: 'Password', securePassword: false});
    }
  }
  repasswordBlur = () => {
    if (!this.state.repasswordPlaceHolder) {
      this.setState({repasswordPlaceHolder: 'Re enter password', securerePassword: false});
    }
  }
  robotPress = () => {
    this.setState({robotCBPress: !this.state.robotCBPress});
  }

  termPress = () => {
    this.setState({termCBPress: !this.state.termCBPress});
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.content} source={require('../assets/pauseoverlay/BackgroundBrown.png')}
                         resizeMode={'stretch'}>
          <Text style={[styles.titleText, this.state.buttonDynamicStyle]}>
            SIGN-UP
          </Text>
          <ImageBackground source={require('../assets/signup/textBox.png')} style={styles.loginInput}
                           resizeMode="stretch">
            <Image source={require('../assets/signup/phoneIcon.png')} style={styles.lockImage} resizeMode="stretch"/>
            <TextInput style={styles.textInput} underlineColorAndroid="transparent" onFocus={this.loginFocus}
                       onChangeText={this.loginChangeText} onBlur={this.loginBlur}>
              <Text style={[styles.placeHolder, this.state.buttonDynamicStyle]}>{this.state.loginPlaceHolder}</Text>
            </TextInput>
          </ImageBackground>
          <ImageBackground source={require('../assets/signup/textBox.png')} style={styles.loginInput}
                           resizeMode="stretch">
            <Image source={require('../assets/login/passwordIcon.png')} style={styles.lockImage} resizeMode="stretch"/>
            <TextInput style={styles.textInput} underlineColorAndroid="transparent"
                       secureTextEntry={this.state.securePassword} onFocus={this.passwordFocus}
                       onChangeText={this.passwordChangeText} onBlur={this.passwordBlur}>
              <Text style={[styles.placeHolder, this.state.buttonDynamicStyle]}>{this.state.passwordPlaceHolder}</Text>
            </TextInput>
          </ImageBackground>
          <ImageBackground source={require('../assets/signup/textBox.png')} style={styles.loginInput}
                           resizeMode="stretch">
            <Image source={require('../assets/login/passwordIcon.png')} style={styles.lockImage} resizeMode="stretch"/>
            <TextInput style={styles.textInput} underlineColorAndroid="transparent"
                       secureTextEntry={this.state.securerePassword} onFocus={this.repasswordFocus}
                       onChangeText={this.repasswordChangeText} onBlur={this.repasswordBlur}>
              <Text
                style={[styles.placeHolder, this.state.buttonDynamicStyle]}>{this.state.repasswordPlaceHolder}</Text>
            </TextInput>
          </ImageBackground>
          <ImageBackground source={require('../assets/signup/checkBoxBG.png')} style={styles.checkboxBG}
                           resizeMode="stretch">
            <View style={styles.checkboxView}>
              <TouchableOpacity onPress={this.robotPress} style={{flex: 1, marginLeft: 20}}>
                <Image
                  source={this.state.robotCBPress ? require('../assets/login/checkBox.png') : require('../assets/login/checkBox-1.png')}
                  style={styles.checkBoxImage} resizeMode="stretch"/>
              </TouchableOpacity>
              <Text style={[styles.checkboxText, this.state.buttonDynamicStyle, {flex: 3}]}>IM NOT A ROBOT</Text>
            </View>
            <View style={styles.checkboxView}>
              <TouchableOpacity onPress={this.termPress} style={{flex: 1, marginLeft: 20}}>
                <Image
                  source={this.state.termCBPress ? require('../assets/login/checkBox.png') : require('../assets/login/checkBox-1.png')}
                  style={styles.checkBoxImage} resizeMode="stretch"/>
              </TouchableOpacity>
              <Text style={[styles.checkboxText, this.state.buttonDynamicStyle, {flex: 3}]}>TERMS & CONDITION</Text>
            </View>
          </ImageBackground>
          <TouchableOpacity onPress={this.confirmPress}>
            <ImageBackground source={require('../assets/login/button.png')}
                             style={[styles.confirmButton, styles.passwordInput]} resizeMode="stretch">
              <Text style={[styles.confirmText, this.state.buttonDynamicStyle]}>CONFIRM</Text>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  screen: {
    marginTop: 20
  },
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
  content: {
    width: screenWidth * 4.5 / 5,
    height: screenHeight * 4.5 / 5,
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textInput: {
    width: screenWidth - 120,
    height: 40,
  },
  loginInput: {
    backgroundColor: 'transparent',
    width: screenWidth - 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20
  },
  placeHolder: {
    fontSize: normalize(22),
    color: '#fab523'
  },
  titleText: {
    marginTop: 20,
    fontSize: normalize(22),
    color: '#fab523',
    fontWeight: 'bold'
  },
  checkboxBG: {
    backgroundColor: 'transparent',
    width: screenWidth - 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20
  },
  checkboxView: {
    flexDirection: 'row',
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkBoxImage: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  checkboxText: {
    fontSize: normalize(14),
    color: '#fab523'
  },
  confirmButton: {
    width: screenWidth / 1.5,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  confirmText: {
    fontSize: normalize(18),
    color: '#352927',
    fontWeight: 'bold'
  },
  lockImage: {
    width: 15,
    height: 20,
    marginLeft: 20,
    marginRight: 10
  }
});
