import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

export default class SelectLevel extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){

  }
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Text>Select Level</Text>
        <TouchableOpacity style={styles.playButton} onPress={this.props.onSelectLevelPlayPress}>
          <Text>Go</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}
let screenWidth = require('Dimensions').get('window').width;
let titleBarHeight = screenWidth*.757/3.6;
let styles = StyleSheet.create({
  screen: {
  },
  playButton: {
    backgroundColor: "#F00",
    marginTop: 100,
    width: "50%",
  }
});
