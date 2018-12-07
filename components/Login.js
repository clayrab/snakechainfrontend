import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {context} from "../utils/Context.js";
import Loading from './Loading.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "clayrab",
      pw: "asdf",
      loading: false,
    };
    this.sendLoginCreds = this.sendLoginCreds.bind(this);
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
          <Text>Login...</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(username) => this.setState({username: username})}
            value={this.state.username}
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(pw) => this.setState({pw: pw})}
            value={this.state.pw}
          />
            <TouchableOpacity onPress={this.sendLoginCreds}>
              <Text style={styles.blueLinkButton}>Go</Text>
            </TouchableOpacity>
        </SafeAreaView>
      );
    }
  }
}
let screenWidth = require('Dimensions').get('window').width;
let titleBarHeight = screenWidth*.757/3.6;
let styles = StyleSheet.create({
  screen: {
  },
  blueLinkButton: {
    color: "#00f",
  }
});
//
//
// export let logOut = async () => {
//   try{
//     var result = await removeItemValue("jwt");
//     return result;
//   } catch(error){
//     console.log(error);
//     throw error;
//   }
// };
//
// export let isAuthenticated = async () => {
//   try{
//     var jwtToken = await getFromAsyncStore("jwt")
//     // if (jwtToken == null) {
//     //   return false;
//     // }
//     var response = await fetch(`${context.host}/secure`,{
//       headers: {
//         "Authorization": "JWT " + jwtToken,
//       }
//     });
//     if (response.status !== 200) {
//       if (response.status === 401) {
//         return false;
//       } else {
//         throw "Looks like there was a problem. Status Code: " + response.status;
//       }
//     } else {
//       return true;
//     }
//     //return result;
//   } catch(error){
//     console.log(error);
//     throw error;
//   }
// };
