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

import { context } from "../utils/Context.js";
import { normalize } from '../utils/FontNormalizer.js';
import { doGoogleOauth, sendGoogleToken } from '../utils/Oauth.js';

let loginPlaceHolder = 'Login/Phone';
let passwordPlaceHolder = 'Password';
let easterEggCount = 0;
export default class LoginChoose extends React.Component {
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
      let token = await doGoogleOauth(false);
      if(token) {
        await this.setState({loading: false});
        this.props.loggedIn(token);
      } else {
        await this.setState({loading: false});
        alert("Unknown error");
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
      sendGoogleToken("eyJhbGciOiJSUzI1NiIsImtpZCI6IjJjM2ZhYzE2YjczZmM4NDhkNDI2ZDVhMjI1YWM4MmJjMWMwMmFlZmQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MjA1MDM0MDM1MDEtdjQ2djVrazJnZzBwNzJpNm9pMGQyZThvbm0wMXA2YTkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MjA1MDM0MDM1MDEtdjQ2djVrazJnZzBwNzJpNm9pMGQyZThvbm0wMXA2YTkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgzNzU1NDY0MTk1NzcyNDg1MTgiLCJlbWFpbCI6ImNsYXl0b25yYWJlbmRhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVmtyX1REaUlCX2VlZERCc1lDcXYxQSIsIm5vbmNlIjoiN21TczlrXzNldlNFVl9EeFExT21GUmprZEpKdjNmNEwzT3ZGSFpBNWI1QSIsIm5hbWUiOiJDbGF5dG9uIFJhYmVuZGEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1SVGVuWl9GbHJNWS9BQUFBQUFBQUFBSS9BQUFBQUFBQUJ4VS81WkpidXNCM0pPYy9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQ2xheXRvbiIsImZhbWlseV9uYW1lIjoiUmFiZW5kYSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTU4NTEwNTA2LCJleHAiOjE1NTg1MTQxMDZ9.aJhCDRIvpBkUFfu4MDPDg9m4QP3RYiuSoOIJq1dKzfX3AlrdnM9ws2Z5hlfl-R2DdNefXU83YEmrLIOWMp99jvtsU110Sp9qtaUQNl6e5y4GlHSPQs-LFRvx3Z82i6MsBnmERo3DkbQkBE5icgr5WMFZkD4-Qm25GPddseelf2z-ABTtBgiY1x1ZCtkF1jOq7aXRtKBzZory9qeRQlPm8n8qB8SEvXoFiAwGhbO7Bi3kgMiNnJPHP47TZnrX-Dp1gh5Ae-_A8XUSi42cxPp1NG45Y7A2BHZOyi3PAdtju2U3pRKEiTx6PuPHwBOVLkJ7aBYoJFoEC9EdGYZ4GMasCg")
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
                           resizeMode="stretch">
                           <TouchableOpacity
                             onPress={this.easterEgg}
                             style={{height: 100, width: 100, position: "absolute", left: 0}}
                           >
                           </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.goToLogin}>
              <ImageBackground source={require('../assets/login/button.png')}
                               style={[styles.button]} res  izeMode="stretch">
                <Text style={[styles.loginText, this.state.buttonDynamicStyle]}>LOGIN</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.googleOauth}>
              <ImageBackground source={require('../assets/login/button.png')}
                               style={[styles.button]} resizeMode="stretch">
                <Text style={[styles.loginText, this.state.buttonDynamicStyle]}>GOOGLE LOGIN</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.goToSignupChoose}>
              <ImageBackground source={require('../assets/login/button.png')}
                               style={[styles.button]} resizeMode="stretch">
                <Text style={[styles.loginText, this.state.buttonDynamicStyle]}>SIGN UP</Text>
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
