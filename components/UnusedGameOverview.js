import React from 'react';
import {
  StyleSheet,
  Text, ScrollView,
  Image,
  View, ImageBackground,
} from 'react-native';

const InputView = ((props) =>
    <ImageBackground source={require("../assets/Overview/input.png")} resizeMode={"stretch"}
                     style={styles.inputBackground}>
      <View style={styles.inputHeading}>
        <Text style={[styles.inputTitle, props.btnStyle]}>{props.heading}</Text>
      </View>
      <View style={styles.inputNumberView}>
        <Text style={[styles.inputNumber, props.btnStyle]}>{props.number}</Text>
      </View>
      <View style={{flex: 1.5, alignItems: 'center', flexDirection: "row", justifyContent: 'space-around',}}>
        <Image source={require("../assets/Overview/sender.png")} style={styles.inputImages}/>
        <Image source={require("../assets/Overview/message.png")} style={styles.inputImages}/>
      </View>
    </ImageBackground>
);

export default class GameOverview extends React.Component {
  render() {
    return (
      <ScrollView style={styles.screen}>
        <ImageBackground source={require("../assets/edit/header.png")} resizeMode={"stretch"} style={styles.header}>
          <View style={[styles.headerChild]}>
            <ImageBackground source={require("../assets/Overview/menuBackground.png")} style={styles.diamondBoxImage}>
              <Image source={require("../assets/Overview/menu.png")} style={styles.menuImage}/>
            </ImageBackground>
          </View>
          <View style={styles.headerTextView}>
            <Text style={[styles.title]}>BOBBER SONT 142</Text>
            <Text style={[styles.address]}>PUBLIC ADDRESS: OX.......</Text>
            <Text style={[styles.info]}>More Profile Info</Text>
          </View>
          <View style={[styles.settingImageView]}>
            <Image source={require("../assets/edit/settingButton.png")} style={styles.settingImage}/>
          </View>
        </ImageBackground>
        <ImageBackground source={require("../assets/Overview/gamesBackground.png")} resizeMode={"stretch"}
                         style={styles.gamesBackground}>
          <View style={styles.gameTextView}>
            <Text style={[styles.gamesText]}>GAMES</Text>
          </View>
          <View style={styles.gamesViewImages}>
            <Image source={require("../assets/edit/imageHolder.png")} style={styles.gamesImage}/>
            <Image source={require("../assets/edit/imageHolder.png")} style={styles.gamesImage}/>
            <Image source={require("../assets/edit/imageHolder.png")} style={styles.gamesImage}/>
          </View>
          <View style={styles.gamesViewDots}>
            <Image source={require("../assets/Overview/dot.png")} style={styles.dotImage}/>
            <Image source={require("../assets/Overview/colordot.png")} style={styles.dotImage}/>
            <Image source={require("../assets/Overview/dot.png")} style={styles.dotImage}/>
          </View>
        </ImageBackground>
        <ImageBackground source={require("../assets/Overview/balanceBackground.png")} resizeMode={"stretch"}
                         style={styles.balanceBackground}>
          <View style={styles.gameTextView}>
            <Text style={[styles.gamesText]}>BALANCES</Text>
          </View>
          <View style={styles.balanceInputView}>
            <InputView heading={'Eath'} number={'300'} btnStyle={{fontFamily: 'riffic-free-bold'}}/>
            <InputView heading={'Snake'} number={'300'} btnStyle={{fontFamily: 'riffic-free-bold'}}/>
            <InputView heading={'GRBL'} number={'100,04,0123'} btnStyle={{fontFamily: 'riffic-free-bold'}}/>
          </View>
        </ImageBackground>
        <ImageBackground source={require("../assets/Overview/HistoryBG.png")} resizeMode={"stretch"}
                         style={styles.HistoryBG}>
          <View style={styles.gameTextView}>
            <Text style={[styles.gamesText]}>HISTORY</Text>
          </View>
          <View style={styles.balanceInputView}>
            <ImageBackground source={require("../assets/Overview/historyInput.png")} resizeMode={"stretch"}
                             style={styles.historyInput}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <Image source={require("../assets/Overview/send.png")} style={styles.historyImage}/>
                <Text style={[styles.sendText]}>SEND</Text>
                <Text style={[styles.date]}>15/2/2014</Text>
              </View>
              <View style={styles.borderView}>
                <Image source={require("../assets/Overview/historyBorder.png")} style={styles.borderStyle}/>
              </View>
              <View style={styles.historyRightView}>
                <View style={styles.historyTopText}>
                  <Text style={[styles.gamesText]}>0.1050</Text>
                  <Image source={require("../assets/Overview/diamond.png")} style={styles.diamondImage}/>
                  <Text style={[styles.gamesText]}>SENT</Text>
                </View>
                <Text style={[styles.historyText]}>stan@smith@gmail.com</Text>
              </View>
            </ImageBackground>
            <ImageBackground source={require("../assets/Overview/historyInput.png")} resizeMode={"stretch"}
                             style={styles.historyInput}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <Image source={require("../assets/Overview/arrow.png")} style={styles.historyImage}/>
                <Text style={[styles.receiveText]}>RECEIVE</Text>
                <Text style={[styles.date]}>15/2/2014</Text>
              </View>
              <View style={styles.borderView}>
                <Image source={require("../assets/Overview/historyBorder.png")} style={styles.borderStyle}/>
              </View>
              <View style={styles.historyRightView}>
                <View style={styles.historyTopText}>
                  <Text style={[styles.gamesText]}>0.1050</Text>
                  <Image source={require("../assets/Overview/diamond.png")} style={styles.diamondImage}/>
                  <Text style={[styles.gamesText]}>RECEIVED</Text>
                </View>
                <Text style={[styles.historyText]}>stan@smith@gmail.com</Text>
              </View>
            </ImageBackground>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

let screenWidth = require('Dimensions').get('window').width;
let screenHeight = require('Dimensions').get('window').height;
let titleBarHeight = screenWidth * .757 / 3.6;
let styles = StyleSheet.create({
  screen: {backgroundColor: "#51403D", height: "100%", width: "100%"},
  header: {height: screenHeight / 9, width: screenWidth, flexDirection: "row",},
  headerChild: {flex: 1,},
  settingImageView: {flex: 1, justifyContent: 'center'},
  headerTextView: {flex: 4, justifyContent: "center"},
  menuImage: {height: "35%", width: '30%', resizeMode: 'contain'},
  settingImage: {height: "80%", width: "90%", resizeMode: "stretch"},
  title: {fontSize: 15, color: "#000000", fontFamily: 'riffic-free-bold'},
  address: {fontSize: 12, color: "#3B2811", fontFamily: 'riffic-free-bold'},
  info: {color: '#A35625', fontSize: 10, fontWeight: '600',},
  diamondBoxImage: {height: "94%", width: "90%", resizeMode: "stretch", justifyContent: "center", alignItems: 'center'},
  gamesBackground: {height: screenHeight / 3.5, marginHorizontal: '5%', marginTop: '2%',},
  gamesText: {fontSize: 18, color: "#F7B829", fontFamily: 'riffic-free-bold'},
  gamesViewImages: {flex: 3, flexDirection: 'row', justifyContent: "space-around", alignItems: 'center',},
  balanceInputView: {flex: 4, justifyContent: "space-around", alignItems: 'center',},
  gameTextView: {flex: 1, justifyContent: 'center', alignItems: 'center',},
  gamesViewDots: {flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'},
  dotImage: {height: '30%', width: "3%", resizeMode: 'stretch', marginHorizontal: '1%'},
  gamesImage: {height: "80 %", width: "26%", resizeMode: "stretch"},
  balanceBackground: {height: screenHeight / 2.5, marginHorizontal: '5%', marginTop: '2%',},
  inputBackground: {height: "26%", width: "90%", flexDirection: "row"},
  inputTitle: {color: "#886B67", fontSize: 16},
  inputHeading: {flex: 1.3, alignItems: 'flex-end', justifyContent: 'center'},
  inputNumber: {color: "#FFB61E", fontSize: 15, paddingRight: '3%',},
  inputNumberView: {flex: 2.7, alignItems: 'flex-end', justifyContent: 'center'},
  inputImages: {height: '75%', width: '41%', resizeMode: 'stretch'},
  HistoryBG: {height: screenHeight / 2.5, marginHorizontal: '5%', marginVertical: '5%',},
  historyInput: {height: "35%", width: "90%", flexDirection: "row"},
  historyImage: {height: '35%', width: '30%', resizeMode: "stretch"},
  receiveText: {color: "#2BB436", fontSize: 9, fontFamily: 'riffic-free-bold'},
  sendText: {color: "#FFB61E", fontSize: 9, fontFamily: 'riffic-free-bold'},
  date: {color: "#8C6D4A", fontSize: 6, fontFamily: 'riffic-free-bold'},
  borderStyle: {height: '70%', width: '20%', resizeMode: 'stretch'},
  borderView: {flex: .3, alignItems: 'center', justifyContent: 'center',},
  diamondImage: {height: '94%', width: '5%', resizeMode: 'stretch', marginHorizontal: '1%'},
  historyText: {fontSize: 12, color: "#F7B829", textAlign: 'center', fontFamily: 'riffic-free-bold'},
  historyTopText: {flexDirection: 'row', justifyContent: 'center'},
  historyRightView: {flex: 4, justifyContent: 'center', alignItems: 'center',},

});
