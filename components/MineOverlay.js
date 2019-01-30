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
            <ImageBackground source={require('../assets/mineoverlay/background.png')} style={styles.backgroundImage} resizeMode={'stretch'}>
              <TouchableOpacity style={styles.closeButton} onPress={this.props.closeOverlay}>
                <Image style={styles.closeButtonImage} source={require('../assets/closebutton_bad.png')} resizeMode={'stretch'} />
              </TouchableOpacity>
              <View style={styles.textView}>
                <Text style={[styles.buttonText, styles.headerSC]}>ARE YOU SURE YOU</Text>
                <Text style={[styles.buttonText, styles.headerSC]}> WANT TO PROCEED?</Text>
              </View>
              <View style={styles.buttonsView}>
                <TouchableOpacity>
                  <ImageBackground source={require('../assets/mineoverlay/yesButton.png')} style={styles.buttonImage} resizeMode={'stretch'}>
                    <Image style={styles.tickIcon} source={require('../assets/mineoverlay/yesIcon.png')} resizeMode={'stretch'} />
                    <Text style={[styles.buttonText, styles.yesButton]}>YES</Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                  <ImageBackground source={require('../assets/mineoverlay/noButton.png')} style={styles.buttonImage} resizeMode={'stretch'}>
                    <Image style={styles.tickIcon} source={require('../assets/mineoverlay/noIcon.png')} resizeMode={'stretch'} />
                    <Text style={[styles.buttonText, styles.noButton]}>NO</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </ImageBackground>
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
    //backgroundColor:  'rgba(0,0,0,1.0)',
    width: screenWidth*4/5,
    height: screenHeight*4/5,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  closeButtonImage: {
    width: 40,
    height: 60
  },
  backgroundImage: {
    width: '100%',
    height: screenHeight / 3
  },
  buttonImage: {
    width: 100,
    height: 40,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerSC: {
    color: '#C6891E',
    fontSize: 26,
    fontWeight: 'bold'
  },
  tickIcon: {
    width: 15,
    height: 15
  },
  yesButton: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5
  },
  noButton: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5
  }
});
