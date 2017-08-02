/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import Picker, { DatePicker } from 'react-native-ios-style-picker';

export default class iOSPickerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'Anna',
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Picker
          selectedValue={this.state.selectedValue}
          style={{width: 150, height: 180}}
          itemStyle={{ color: '#000' }}
          onValueChange={(value) => {
            this.setState({
              selectedValue: value,
            });

          }}
        >
          {['Justine', 'Carol', 'Anna', 'Sean'].map((text, key) =>
            <Picker.Item label={text} value={text} key={key} />
          )}
        </Picker>
        <DatePicker
          mode="time"
          date={new Date()}
          onDateChange={(date) => {
            console.log(date);
          }}
        />
        <DatePicker mode="datetime" date={new Date()} />
        <DatePicker mode="date" date={new Date()} />
      </View>
    );
  }
}


AppRegistry.registerComponent('iOSPickerExample', () => iOSPickerExample);
