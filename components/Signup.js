import React from 'react';
import {
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  AsyncStorage
} from 'react-native';
import {normalize} from '../utils/FontNormalizer.js';
import {context} from "../utils/Context";
import Loading from "./Loading";

import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
const siteKey = '6LermbUUAAAAAA7uTrIT9AFrW2mtYhQvxKNrThoL';
const baseUrl = 'http://claytonrabenda.com/';

let loginDefault = 'Username';
let passwordPlaceDefault = 'Password';
let repasswordPlaceDefault = 'Re-enter password';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      //signedUp: false,
      loginPlaceHolder: loginDefault,
      passwordPlaceHolder: passwordPlaceDefault,
      repasswordPlaceHolder: repasswordPlaceDefault,
      termCBPress: true,
      securePassword: false,
      securerePassword: false,
    }
  }
  onMessage = async(event) => {
    const {loginPlaceHolder, passwordPlaceHolder, termCBPress} = this.state;
    if (event && event.nativeEvent.data) {
       if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
         this.captchaForm.hide();
         alert("Problem validating user captcha.")
         return;
       } else {
         if(this.validateForm() === null) {
           this.captchaForm.hide();
           try {
             this.setState( { loading: true } );
             const data = { username: loginPlaceHolder, pw: passwordPlaceHolder, "g-recaptcha-response": event.nativeEvent.data };
             const response = await fetch(`${context.host}:${context.port}/createLocalUser`, {
               method: "POST", // *GET, POST, PUT, DELETE, etc.
               body: JSON.stringify(data), // body data type must match "Content-Type" header
               headers: {
                 "Content-Type": "application/json; charset=utf-8",
                 //application/x-www-form-urlencoded on Postman...
               },
             });
             const resp = await response.json();
             if(resp.error) {
               if(resp.error === "Object already exists!") {
                alert("Username already taken");
               } else {
                alert(resp.error);
               }
             } else if(!resp.token) {
               alert("Unknown error occured");
             } else {
               await AsyncStorage.setItem("LAST_REGISTERED", loginPlaceHolder);
               this.props.loggedIn(resp.token);
             }
             //this.setState({signedUp: true});
           } catch (error) {
             console.log(error);
             alert(error);
           } finally {
             this.setState({loading: false});
           }
         }
       }
     }
  };
  validateForm = () => {
    const {loginPlaceHolder, passwordPlaceHolder, repasswordPlaceHolder, termCBPress} = this.state;
    if (loginPlaceHolder == loginDefault || loginPlaceHolder == "") {
      return "Please enter a user name";
    } else if (passwordPlaceHolder == passwordPlaceDefault || passwordPlaceHolder == "" || repasswordPlaceHolder == repasswordPlaceDefault || repasswordPlaceHolder == "") {
      return "Please enter password and confirmation password";
    } else if (passwordPlaceHolder != repasswordPlaceHolder) {
      return "Passwords don't match";
    } else if (termCBPress) {
      return "Please accept terms and conditions";
    } else {
      return null;
    }
    return "Unknown form validation error";
  }
  confirmPress = async () => {
    let error = this.validateForm();
    if (error === null){
      this.captchaForm.show();
    } else {
      alert(error);
    }
  }

  loginFocus = () => {
    if (this.state.loginPlaceHolder === loginDefault) {
      this.setState({loginPlaceHolder: ''});
    }
  }

  loginChangeText = (value) => {
    this.setState({loginPlaceHolder: value});
  }

  loginBlur = () => {
    if (this.state.loginPlaceHolder === "") {
      this.setState({loginPlaceHolder: loginDefault});
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
    if (this.state.passwordPlaceHolder === passwordPlaceDefault) {
      this.setState({passwordPlaceHolder: '', securePassword: true});
    }
  }
  repasswordFocus = () => {
    if (this.state.repasswordPlaceHolder === repasswordPlaceDefault) {
      this.setState({repasswordPlaceHolder: '', securerePassword: true});
    }
  }
  passwordBlur = () => {
    if (this.state.passwordPlaceHolder === "") {
      this.setState({passwordPlaceHolder: passwordPlaceDefault, securePassword: false});
    }
  }
  repasswordBlur = () => {
    if (this.state.repasswordPlaceHolder === "") {
      this.setState({repasswordPlaceHolder: repasswordPlaceDefault, securerePassword: false});
    }
  }

  termPress = () => {
    this.setState({termCBPress: !this.state.termCBPress});
  }

  goBack = () => {
    //this.setState({signedUp: false});
    //this.props.onLogin();
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading></Loading>
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.content} source={require('../assets/pauseoverlay/BackgroundBrown.png')}
                         resizeMode={'stretch'}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}}>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={this.props.onLogin} style={styles.backButtonTouchable}>
                <ImageBackground source={require('../assets/backbutton.png')} style={styles.backButtonIcon}/>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.titleText]}>
                SIGN-UP
              </Text>
            </View>
            <View style={{flex: 1}}/>
          </View>
          <ImageBackground source={require('../assets/signup/textBox.png')} style={styles.loginInput}
                           resizeMode="stretch">
            <Image source={require('../assets/signup/phoneIcon.png')} style={styles.lockImage} resizeMode="stretch"/>
            <TextInput style={styles.textInput} underlineColorAndroid="transparent" onFocus={this.loginFocus}
                       onChangeText={this.loginChangeText} onBlur={this.loginBlur}>
              <Text style={[styles.placeHolder]}>{this.state.loginPlaceHolder}</Text>
            </TextInput>
          </ImageBackground>
          <ImageBackground source={require('../assets/signup/textBox.png')} style={styles.loginInput}
                           resizeMode="stretch">
            <Image source={require('../assets/login/passwordIcon.png')} style={styles.lockImage} resizeMode="stretch"/>
            <TextInput style={styles.textInput} underlineColorAndroid="transparent"
                       secureTextEntry={this.state.securePassword} onFocus={this.passwordFocus}
                       onChangeText={this.passwordChangeText} onBlur={this.passwordBlur}>
              <Text style={[styles.placeHolder]}>{this.state.passwordPlaceHolder}</Text>
            </TextInput>
          </ImageBackground>
          <ImageBackground source={require('../assets/signup/textBox.png')} style={styles.loginInput}
                           resizeMode="stretch">
            <Image source={require('../assets/login/passwordIcon.png')} style={styles.lockImage} resizeMode="stretch"/>
            <TextInput style={styles.textInput} underlineColorAndroid="transparent"
                       secureTextEntry={this.state.securerePassword} onFocus={this.repasswordFocus}
                       onChangeText={this.repasswordChangeText} onBlur={this.repasswordBlur}>
              <Text
                style={[styles.placeHolder]}>{this.state.repasswordPlaceHolder}</Text>
            </TextInput>
          </ImageBackground>
          <ImageBackground source={require('../assets/signup/checkBoxBG.png')} style={styles.checkboxBG}
                           resizeMode="stretch">

            {/*<View style={styles.checkboxView}>
              <TouchableOpacity onPress={this.robotPress} style={{flex: 1, marginLeft: 20}}>
                <Image
                  source={this.state.robotCBPress ? require('../assets/login/checkBox.png') : require('../assets/login/checkBox-1.png')}
                  style={styles.checkBoxImage} resizeMode="stretch"/>
              </TouchableOpacity>

              <Button
                 onPress={() => {
                     this.captchaForm.show();
                 }}
                 title='Click'
                 style={{ width: 120, backgroundColor: 'darkviolet' }}
                 textColor='#fff'
             />
            </View>*/}
            <View style={styles.checkboxView}>
              <TouchableOpacity onPress={this.termPress} style={{flex: 1, marginLeft: 20}}>
                <Image
                  source={this.state.termCBPress ? require('../assets/login/checkBox.png') : require('../assets/login/checkBox-1.png')}
                  style={styles.checkBoxImage} resizeMode="stretch"/>
              </TouchableOpacity>
              <Text style={[styles.checkboxText, {flex: 3}]}>TERMS & CONDITION</Text>
            </View>
          </ImageBackground>
          <TouchableOpacity onPress={this.confirmPress}>
            <ImageBackground source={require('../assets/login/button.png')}
                             style={[styles.confirmButton, styles.passwordInput]} resizeMode="stretch">
              <Text style={[styles.confirmText]}>CONFIRM</Text>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
        <ConfirmGoogleCaptcha
            ref={_ref => this.captchaForm = _ref}
            siteKey={siteKey}
            baseUrl={baseUrl}
            languageCode='en'
            onMessage={this.onMessage}
        />
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
    color: '#fab523',
    fontFamily: 'riffic-free-bold'
  },
  titleText: {
    marginTop: 20,
    fontSize: normalize(22),
    color: '#fab523',
    fontWeight: 'bold',
    fontFamily: 'riffic-free-bold'
  },
  checkboxBG: {
    backgroundColor: 'transparent',
    width: screenWidth - 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20
  },
  checkboxView: {
    flexDirection: 'row',
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
    color: '#fab523',
    fontFamily: 'riffic-free-bold'
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
    fontWeight: 'bold',
    fontFamily: 'riffic-free-bold'
  },
  lockImage: {
    width: 15,
    height: 20,
    marginLeft: 20,
    marginRight: 10
  },
  backButtonTouchable: {},
  backButtonIcon: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.08,
    resizeMode: 'contain',
    tintColor: '#FFFFFF'
    // aspectRatio: 512 / 392,
    // width: "100%",
  },
});
