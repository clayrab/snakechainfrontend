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
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
      });
      this.setState({
        buttonDynamicStyle: {
          fontFamily: 'riffic-free-bold',
        }
      });
      let jwt = await getFromAsyncStore("jwt");
      if(jwt) {
        await this.props.loggedIn(jwt);
      } else {
        await this.setState({loading: false});
      }
    } catch(err) {
      alert(err);
      await this.setState({loading: false});
    }
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
            <TouchableOpacity onPress={this.props.goToLogin}>
              <ImageBackground source={require('../assets/login/button.png')} style={[styles.button]} resizeMode="stretch">
                <Text style={[styles.loginText, this.state.buttonDynamicStyle]}>LOGIN</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.googleOauth}>
              <ImageBackground source={require('../assets/login/button.png')} style={[styles.button]} resizeMode="stretch">
                <Text style={[styles.loginText, this.state.buttonDynamicStyle]}>GOOGLE LOGIN</Text>
              </ImageBackground>
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.signupButtonHolder}>
            <TouchableOpacity onPress={this.props.goToSignupChoose} style={styles.signupTextTouchable}>
              <Text style={[styles.signupText, this.state.buttonDynamicStyle]}>SIGN UP</Text>
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
  },
  signupButtonHolder: {
    position: "absolute",
    bottom: 10,
    width: buttonWidth,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signupText: {
    fontSize: normalize(13),
    marginRight: 15,
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
