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

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPlaceHolder: 'Login/Phone',
      passwordPlaceHolder: '',
      remember: true
    };
    this.sendLoginCreds = this.sendLoginCreds.bind(this);
  }
  async componentDidMount(){
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    styles.buttonText = {
      fontFamily: 'riffic-free-bold'
    }
  }

  loginFocus = () => {
    this.setState({loginPlaceHolder: ''});
  }

  loginChangeText = (value) => {
    this.setState({loginPlaceHolder: value});
  }

  loginBlur = () => {
    this.setState({loginPlaceHolder: 'Login/Phone'});
  }

  passwordChange = (value) => {
    this.setState({passwordPlaceHolder: value});
  }

  rememberPress = () => {
    this.setState({ remember: !this.state.remember })
  }
  async sendLoginCreds() {
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
          <ImageBackground source={require('../assets/login/background.png')} style={styles.backgroundImage} resizeMode="stretch">
            <View style={[styles.halfView, styles.topView]}>
              <ImageBackground source={require('../assets/login/textBox.png')} style={styles.loginInput} resizeMode="stretch">
                <TextInput style={styles.textInput} underlineColorAndroid="transparent" onFocus={this.loginFocus} onChangeText={this.loginChangeText} onBlur={this.loginBlur}>
                  <Text style={[styles.placeHolder, styles.buttonText]}>{this.state.loginPlaceHolder}</Text>
                </TextInput>
              </ImageBackground>
            </View>
            <View style={[styles.halfView, styles.bottomView]}>
              <ImageBackground source={require('../assets/login/textBox.png')} style={[styles.loginInput, styles.passwordInput]} resizeMode="stretch">
                <Image source={require('../assets/login/passwordIcon.png')} style={styles.lockImage} resizeMode="stretch"/>
                <TextInput style={styles.textInput} underlineColorAndroid="transparent" secureTextEntry={true} onChangeText={this.passwordChange} value={this.state.passwordPlaceHolder}/>
              </ImageBackground>
              <TouchableOpacity onPress={this.loginPress}>
                <ImageBackground source={require('../assets/login/button.png')} style={[styles.loginButton, styles.passwordInput]} resizeMode="stretch">
                  <Text style={[styles.loginText, styles.buttonText]}>LOGIN</Text>
                </ImageBackground>
              </TouchableOpacity>
              <View style={styles.rememberView}>
                <TouchableOpacity onPress={this.rememberPress}>
                  <Image source={ this.state.remember ? require('../assets/login/checkBox.png') : require('../assets/login/checkBox-1.png')} style={styles.checkBoxImage} resizeMode="stretch"/>
                </TouchableOpacity>
                <Text style={[styles.checkboxText, styles.buttonText]}>Remember me</Text>
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
    marginLeft: 20
  },
  loginInput: {
    backgroundColor: 'transparent',
    width: screenWidth - 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  placeHolder: {
    fontSize: 24,
    color: '#fab523'
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
