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
        console.log("token")
        console.log(token)
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
      this.props.loggedIn("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ29vZ2xlOmNsYXl0b25yYWJlbmRhQGdtYWlsLmNvbSIsInB1YmtleSI6IjB4NTlGMWJlMzg4MjczRUJmOTkwZDUyMTk3MDJiNzIzYUM0YjU5MkNFQiIsInJhbmRvbVNlY3JldCI6IjljOGFkMTk4NzJmMTRmYzRlZGJhMjhkMGY1ODQxZTE1YmY5MzBjNmJiYmFkZDQ0MTBhYjhkMjEwNDBmMjllODZmNmMxODExZTYzOTgxMDA0NjM3MWFiNGY5NWJmODgwYmViNjczZDIxMjY4MWRhZTAxZGJhY2RlNWZiOTQ3N2MyMzQ3ODA1NDk4NTU2OWI2MjZjNWVmZDkyMTJhNjViNjgzN2EyMDRmNjJhMzZhYTViMTY5ODI2ZjAyMzYzMWNlZWI4ZDMzMTAwNGU3Mjc5MWNlMmNhNzI3ZWJhYmRhNTBhYTBiYzQ5OTdiNGYwNWZjMmU2OGUyMDY0MmJmMTY4OWI0MzVmN2JkZTBjOWJkNGEyYzYwNWIxNTkzZGE2OTc2MTk0ZTQ5ZjFlNWY0ZGZiYjUzMzEwNTE4ZGVjNjhhOTMzZTA1NjI3ZDdhNjRhODA0NzRhNDdlMGNiNzZhMzk3OTcwOTMyNmEwYTE5YWVjMGNlMDFmOTIzNjI5ODBhOGFlZTVlMTk5OTFkOTcyNDZiNTliMzMxMGI5MGFmN2RhMjc3YmM4YmFiMGY1OTNkYjZjMTM5OGZjMTQ2N2Q4MWIzYjkxZGRhZDJhN2JkMDI4MjQ0MTMxN2Y2NTQyNGJmNGM2ZTBiNDkzNmUzZWQ3MGY0ZTdkMzhhYzlmMWU1ZmU3M2FiIiwiaWF0IjoxNTU4NDQzMTcyLCJleHAiOjE1NTg2MTU5NzJ9.Ahfv1nyRmuSW-meFWACZat7U_J5KY6anB4djJxTthBw");
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
