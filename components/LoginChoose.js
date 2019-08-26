import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Platform
} from 'react-native';
import { AppAuth, Constants, Font} from 'expo';

import Loading from './Loading.js';
import ScreenView from '../components/ScreenView.js';

import { getFromAsyncStore } from "../utils/AsyncStore.js";
import { context, switchHost, QA, QA2, QA2v6 } from "../utils/Context.js";
import { normalize } from '../utils/FontNormalizer.js';
import { doGoogleOauth, sendGoogleToken } from '../utils/Oauth.js';

let loginPlaceHolder = 'Login/Phone';
let passwordPlaceHolder = 'Password';
let easterEggCount = 0;
export default class LoginChoose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  async componentDidMount() {
    console.log("LoginChoose componentDidMount")
  }

  googleOauth = async() => {
    this.setState({loading: true});
    try {
      let resp = await doGoogleOauth(false);
      if(!resp.error && resp.token){
        this.props.loggedIn(resp.token);
      } else {
        await this.setState({loading: false});
        if(resp.error) {
          if(resp.error.startsWith("Object not found in model")) {
            alert("No user by that username found.")
          } else {
            alert("Unknown error\n" + resp.error)
          }
        } else if(!resp.token) {
          console.log(resp)
          alert("There was a problem authenticating with the server.");
        }
      }
    } catch (err){
      await this.setState({loading: false});
      if(!err.toString().endsWith("User cancelled.")){
        alert(err);
      }
    }
  }

  easterEgg = async () => {
    console.log("easteregg")
    easterEggCount = easterEggCount + 1;
    if (easterEggCount >= 5) {
      if(easterEggCount%3 == 0) {
        alert("QA");
        switchHost(QA);
      } else if(easterEggCount%3 == 1) {
        alert("QA2");
        switchHost(QA2);
      } else if(easterEggCount%3 == 2) {
        alert("QA2v6");
        switchHost(QA2v6);
      }
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    } else {
      return (
        <ScreenView style={styles.screen}>
          <ImageBackground source={require('../assets/login/background.png')} style={styles.backgroundImage}
                           resizeMode="stretch">
                           <TouchableOpacity
                             onPress={this.easterEgg}
                             style={{height: 100, width: 100, position: "absolute", left: 0}}/>
            <TouchableOpacity onPress={this.props.goToLogin}>
              <ImageBackground source={require('../assets/login/button.png')} style={[styles.button]} resizeMode="stretch">
                <Text style={[styles.loginText]}>LOGIN</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.googleOauth}>
              <ImageBackground source={require('../assets/login/button.png')} style={[styles.button]} resizeMode="stretch">
                <Text style={[styles.loginText]}>GOOGLE LOGIN</Text>
              </ImageBackground>
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.signupButtonHolder}>
            <TouchableOpacity onPress={this.props.goToSignupChoose} style={styles.signupTextTouchable}>
              <Text style={[styles.signupText]}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </ScreenView>
      );
    }
  }
}

let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let buttonWidth = screenWidth / 1.5;
let styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  backgroundImage: {
    paddingTop: 250,
    width: screenWidth,
    height: screenHeight,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: buttonWidth,
    height: 60,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: normalize(18),
    color: '#352927',
    fontFamily: 'riffic-free-bold'
  },
  signupButtonHolder: {
    position: "absolute",
    bottom: 100,
    width: buttonWidth,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signupText: {
    fontSize: normalize(13),
    marginRight: 15,
    fontFamily: 'riffic-free-bold'
  },
  rememberView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  checkBoxImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  checkboxText: {
    fontSize: normalize(14),
    color: '#352927',
  },
});
