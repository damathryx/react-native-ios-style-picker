/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Picker from 'react-native-ios-style-picker';

export default class iOSPickerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 24,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker
          selectedIndex={this.state.value}
          selectedValue={this.state.value}
          style={{width: 150, height: 180}}
          itemStyle={{ color: '#000' }}
          onValueChange={(value, index) => {
            console.log(value,index);
            this.setState({
              value,
            });

          }}
        >
          {['1','2','3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'].map((text, key) =>
            <Picker.Item label={text} value={key} key={key} />
          )}
        </Picker>
        <Picker
          selectedIndex={this.state.value}
          selectedValue={this.state.value}
          style={{width: 150, height: 180}}
          itemStyle={{ color: '#000' }}
          onValueChange={(value, index) => {
            console.log(value,index);
            this.setState({
              value,
            });

          }}
        >
          {['1','2','3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'].map((text, key) =>
            <Picker.Item label={text} value={key} key={key} />
          )}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('iOSPickerExample', () => iOSPickerExample);
