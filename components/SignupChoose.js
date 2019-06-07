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

import ScreenView from '../components/ScreenView.js';
import {context} from "../utils/Context.js";
import Loading from './Loading.js';
import {normalize} from '../utils/FontNormalizer.js';
import {doGoogleOauth} from '../utils/Oauth.js';

let loginPlaceHolder = 'Login/Phone';
let passwordPlaceHolder = 'Password';
let easterEggCount = 0;
export default class SignupChoose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDynamicStyle: {},
      loading: false,
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
  googleOauth = async() => {
    this.setState({loading: true});
    try {
      let resp = await doGoogleOauth(true);
      if(!resp.error && resp.token){
        await this.props.loggedIn(resp.token);
      } else {
        await this.setState({loading: false});
        if(resp.error === "Object already exists!") {
          alert("User already exists!");
        } else if(!resp.token) {
          console.log(resp);
          alert("There was a problem authenticating with the server.");
        } else {
          alert("Unknown error\n" + resp.error);
        }
      }
    } catch (err){
      await this.setState({loading: false});
      alert(err);
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading></Loading>
      );
    } else {
      return (
        <ScreenView style={styles.screen}>
          <ImageBackground source={require('../assets/login/background.png')} style={styles.backgroundImage}
                           resizeMode="stretch"
                           onClick={this.easterEgg}>
            <TouchableOpacity
              onPress={this.googleOauth}>
              <ImageBackground source={require('../assets/login/button.png')}
                               style={[styles.button]} resizeMode="stretch">
                <Text style={[styles.loginText, this.state.buttonDynamicStyle]}>GOOGLE SIGN UP</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.goToSignup}>
              <ImageBackground source={require('../assets/login/button.png')}
                               style={[styles.button]} resizeMode="stretch">
                <Text style={[styles.loginText, this.state.buttonDynamicStyle]}>BASIC SIGN UP</Text>
              </ImageBackground>
            </TouchableOpacity>
          </ImageBackground>
        </ScreenView>
      );
    }
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  screen: {
    //marginTop: 20,
  },
  backgroundImage: {
    paddingTop: 250,
    width: screenWidth,
    height: screenHeight,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: screenWidth / 1.5,
    height: 60,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: normalize(18),
    color: '#352927',
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
