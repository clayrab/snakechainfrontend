
import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

export default class MineOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicStyle: {},
      loading: false,
      ethBal: -1,
      snekBal: -1,
      haul: -1,
      //mineImg: mineImages[0],
      minePercent: 0,
    };
  }
  async componentDidMount(){
    await Font.loadAsync({
      'riffic-free-bold': require('../assets/fonts/RifficFree-Bold.ttf'),
    });
    this.setState({dynamicStyle: {
      fontFamily: 'riffic-free-bold',
    }});
  }
  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
              <Image style={styles.closeButtonImage} source={require('../assets/closebutton_bad.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  async componentDidMount(){
    // try{
    //   this.setState({loading: true});
    //   let jwt = await getFromAsyncStore("jwt");
    //   fetch(`${context.host}/getbalances`, {
    //     method: "GET", // *GET, POST, PUT, DELETE, etc.
    //     headers: {
    //         "Content-Type": "application/json; charset=utf-8",
    //         "Authorization": "JWT " + jwt,
    //         //application/x-www-form-urlencoded on Postman... hmmm
    //     },
    //   }).then(async(response) => {
    //     var resp = await response.json();
    //     if(resp.error){
    //       alert(resp.error);
    //       this.setState({loading: false});
    //     }else if(resp) {
    //     }
    //   });
    // } catch(err) {
    //
    // }
  }

}
let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
var styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor:  'rgba(0,0,0,0.6)',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor:  'rgba(0,0,0,1.0)',
    width: screenWidth*4/5,
    height: screenHeight*4/5,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  }
});
