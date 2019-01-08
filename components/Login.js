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
import SafeAreaView from 'react-native-safe-area-view';
import { Font } from 'expo';
import {context} from "../utils/Context.js";
import Loading from './Loading.js';

let loginPlaceHolder = 'Login/Phone';
let passwordPlaceHolder = 'Password';
let easterEggCount = 0;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginPlaceHolder: true,
      showPasswordPlaceHolder: true,
      remember: true,
      buttonDynamicStyle: {},
      username: "",
      pw: "",
      usernameRender: loginPlaceHolder,
      passwordRender: passwordPlaceHolder,
      loading: false,
    };
    // this.sendLoginCreds = this.sendLoginCreds.bind(this);
    // this.easterEgg = this.easterEgg.bind(this);
  }
  async componentDidMount(){
    console.log("component did mount")
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({buttonDynamicStyle: {
      fontFamily: 'riffic-free-bold',
    }});
    // styles.buttonText = {
    //   fontFamily: 'riffic-free-bold'
    // };
    //rerender();
  }

  // rerender = () => {
  //   this.setState({rerender: !this.state.rerender}); // trick react into rerunning render function
  // }
  setLoginRenderState = () => {
    if(this.state.showLoginPlaceHolder) {
      this.setState({usernameRender: loginPlaceHolder});
    } else {
      this.setState({usernameRender: this.state.username});
    }
  }
  setPasswordRenderState = () => {
    if(this.state.showPasswordPlaceHolder) {
      this.setState({passwordRender: passwordPlaceHolder});
    } else {
      this.setState({passwordRender: this.state.pw});
    }
  }
  loginFocus = async() => {
    await this.setState({showLoginPlaceHolder: false});
    this.setLoginRenderState();
    //this.setState({loginPlaceHolder: ''});
  }
  passwordFocus = async() => {
    await this.setState({showPasswordPlaceHolder: false});
    this.setPasswordRenderState();
    //this.setState({loginPlaceHolder: ''});
  }
  loginChange= async(value) => {
    await this.setState({username: value});
  }
  passwordChange= async(value) => {
    await this.setState({pw: value});
  }
  easterEgg = async() => {
    console.log("easteregg")
    easterEggCount = easterEggCount + 1;
    if(easterEggCount > 5) {
      await this.setState({
        username: "clayrab",
        pw: "asdf",
        showLoginPlaceHolder: false,
        showPasswordPlaceHolder: false,
      });
      this.setLoginRenderState();
      this.setPasswordRenderState();
    }
  }
  // loginChangeText = (value) => {
  //   // not really necessary,
  //   if(!this.state.showLoginPlaceHolder) {
  //     this.setState({username: value});
  //   }
  // }

  // loginBlur = () => {
  //   this.setState({loginPlaceHolder: 'Login/Phone'});
  // }

  // passwordChange = (value) => {
  //   this.setState({passwordPlaceHolder: value});
  // }

  rememberPress = () => {
    this.setState({ remember: !this.state.remember })
    this.easterEgg();
  }
  sendLoginCreds = async() => {
    console.log("sendLoginCreds");
    try{
      this.setState({loading: true});
      var data = { user: this.state.username, pw: this.state.pw };
      var response = await fetch(`${context.host}/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            //application/x-www-form-urlencoded on Postman... hmmm
        },
      });
      var resp = await response.json();
      if(resp.error){
        alert(resp.error);
        this.setState({loading: false});
      }else if(resp.token) {
        this.props.loggedIn(resp.token);
      }
    } catch(error){
      alert(error);
      this.setState({loading: false});
    }
  }
  render() {
    if(this.state.loading) {
      return (
        <Loading></Loading>
      );
    } else {
      return (
        <SafeAreaView style={styles.screen}>
          <ImageBackground source={require('../assets/login/background.png')} style={styles.backgroundImage} resizeMode="stretch"
            onClick={this.easterEgg}>
            <View style={[styles.halfView, styles.topView]}>
              <ImageBackground source={require('../assets/login/textBox.png')} style={styles.loginInput} resizeMode="stretch">
                <TextInput style={[styles.textInput, this.state.buttonDynamicStyle]} underlineColorAndroid="transparent" autoCapitalize={false}
                  onFocus={this.loginFocus}
                  onChangeText={this.loginChange}
                  value={this.state.usernameRender}>
                </TextInput>
              </ImageBackground>
            </View>
            <View style={[styles.halfView, styles.bottomView]}>
              <ImageBackground source={require('../assets/login/textBox.png')} style={[styles.loginInput, styles.passwordInput]} resizeMode="stretch">
                <Image source={require('../assets/login/passwordIcon.png')} style={styles.lockImage} resizeMode="stretch"/>
                <TextInput style={[styles.textInput, this.state.buttonDynamicStyle]} underlineColorAndroid="transparent" secureTextEntry={true} autoCapitalize={false}
                  onFocus={this.passwordFocus}
                  onChangeText={this.passwordChange}
                  value={this.state.passwordRender}/>
              </ImageBackground>
              <TouchableOpacity
                onPress={this.sendLoginCreds}>
                <ImageBackground source={require('../assets/login/button.png')} style={[styles.loginButton, styles.passwordInput]} resizeMode="stretch">
                  <Text style={[styles.loginText, this.state.buttonDynamicStyle]}>LOGIN</Text>
                </ImageBackground>
              </TouchableOpacity>
              <View style={styles.rememberView}>
                <TouchableOpacity onPress={this.rememberPress}>
                  <Image source={ this.state.remember ? require('../assets/login/checkBox.png') : require('../assets/login/checkBox-1.png')} style={styles.checkBoxImage} resizeMode="stretch"/>
                </TouchableOpacity>
                <Text style={[styles.checkboxText, this.state.buttonDynamicStyle]}>Remember me</Text>
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      );
    }
  }
}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let styles = StyleSheet.create({
  screen: {
    marginTop: 20
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
    flexDirection: 'column'
  },
  halfView: {
    flex: 1,
  },
  topView: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  bottomView: {
    alignItems: 'center'
  },
  textInput: {
    width: screenWidth - 80,
    height: 40,
    marginLeft: 20,
    fontSize: 24,
    color: '#fab523'
  },
  loginInput: {
    backgroundColor: 'transparent',
    width: screenWidth - 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  lockImage: {
    width: 20,
    height: 20,
    marginLeft: 40
  },
  passwordInput: {
    marginTop: 20
  },
  loginButton: {
    width: screenWidth / 1.5,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    fontSize: 20,
    color: '#352927'
  },
  rememberView: {
    flexDirection: 'row',
    marginTop: 10
  },
  checkBoxImage: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  checkboxText: {
    fontSize: 16,
    color: '#352927'
  },
});
