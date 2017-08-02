import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import Picker from './Picker';
import moment from 'moment';
import _ from 'lodash';

getHours = () => {
  return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
}

getMinutes = (minuteInterval) => {
  const minutes = _.range(0,60);
  return _.filter(minutes, minute => { return minute % minuteInterval === 0 })
}

getPeriods = (isPeriodCapitalized) => {
  if (isPeriodCapitalized) {
    return ['AM', 'PM'];
  }

  return ['am', 'pm'];
}
getNewMinuteSelectedByNewMinuteInterval = (minute, minuteInterval) => {
  const minuteModulus = (minute % minuteInterval);
  if ( minuteModulus !== 0) {
    minute = minute - minuteModulus;
  }
  return minute;
}
export default class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    const {
      date,
      is24Hrs,
      minuteInterval,
      isPeriodCapitalized
    } = props;
    const hour = moment(date).hours();
    let minute = moment(date).minutes();
    this.state = {
      ...props,
      date,
      periodSelected: parseInt(hour / 12),
      hourSelected: hour,
      minuteSelected: getNewMinuteSelectedByNewMinuteInterval(minute, minuteInterval),
      hoursList: getHours(),
      minutesList: getMinutes(minuteInterval),
      periodsList: getPeriods(isPeriodCapitalized),
    };
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.date !== this.props.date) {
      this.setState({
        backgroundUpdate: true,
        date: nextProps.date,
      });
    }
    if (!nextState.backgroundUpdate && (nextState.hourSelected !== this.state.hourSelected)) {
      const isNewHourSelectedMorning = nextState.hourSelected - 12 < 0;
      const isCurrentHourSelectMorning = this.state.hourSelected - 12 < 0;
      if (isNewHourSelectedMorning !== isCurrentHourSelectMorning) {
        this.setState({
          periodSelected:  isNewHourSelectedMorning ? 0 : 1,
          backgroundUpdate: true,
        });
      }
    }
  }
  _onDateChange = (date, hourSelected, minuteSelected) => {
    const momentDate = moment(date);
    momentDate.hour(hourSelected);
    momentDate.minute(minuteSelected);
    this.props.onDateChange(momentDate.toDate());
  }
  _onMinuteValueChange = (minuteSelected) => {
    this._onDateChange(this.state.date, this.state.hourSelected, minuteSelected);
    this.setState({
      minuteSelected,
      backgroundUpdate: false,
    })
  }
  _onHourValueChange = (hourSelected) => {
    this._onDateChange(this.state.date, hourSelected, this.state.minuteSelected);
    this.setState({
      hourSelected,
      backgroundUpdate: false,
    });
  }
  //Change hour value when period is changed
  _onPeriodValueChange = (periodSelected) => {
    const hourSelected = this.state.hourSelected - (periodSelected === 0 ? 12 : -12);
    this.setState({
      periodSelected,
      hourSelected,
      backgroundUpdate: true,
    })
    this._onDateChange(this.state.date, hourSelected, this.state.minuteSelected);
  }
  render() {
    const {
      date,
      hoursList,
      minutesList,
      periodsList
    } = this.state;
    return (
      <View style={[{ flexDirection: 'row' }, this.state.style]}>
        <Picker
          style={[{ width: 40, height: 170 }, this.state.hourPickerStyle]}
          selectedValue={this.state.hourSelected}
          itemStyle={this.state.hourPickerItemStyle}
          curved={this.state.curved}
          cyclic={this.state.cyclic}
          atmospheric={this.state.atmospheric}
          indicator={this.state.indicator}
          indicatorSize={this.state.indicatorSize}
          indicatorColor={this.state.indicatorColor}
          onValueChange={this._onHourValueChange}>
          {hoursList.map((value, i) => {
            return (
              <Picker.Item label={`${value}`} value={i} key={"hoursList"+i}/>
            );
          })}
        </Picker>
        <Picker
          style={[{ width: 40, height: 170 }, this.state.minutePickerStyle]}
          selectedValue={this.state.minuteSelected}
          itemStyle={this.state.minutePickerItemStyle}
          curved={this.state.curved}
          cyclic={this.state.cyclic}
          atmospheric={this.state.atmospheric}
          indicator={this.state.indicator}
          indicatorSize={this.state.indicatorSize}
          indicatorColor={this.state.indicatorColor}
          onValueChange={this._onMinuteValueChange}>
          {minutesList.map((value, i) => {
            const label = value.toString().length === 1 ? `0${value}` : `${value}`;
            return (
              <Picker.Item label={label} value={value} key={"minutesList"+i}/>
            )
          })}
        </Picker>
        <Picker
          style={[{ width: 40, height: 170 }, this.state.periodPickerStyle]}
          selectedValue={this.state.periodSelected}
          itemStyle={this.state.periodPickerItemStyle}
          atmospheric={this.state.atmospheric}
          cyclic={false}
          indicator={this.state.indicator}
          indicatorSize={this.state.indicatorSize}
          indicatorColor={this.state.indicatorColor}
          onValueChange={this._onPeriodValueChange}>
          {periodsList.map((value, i) => (
            <Picker.Item label={`${value}`} value={i} key={"periodsList"+i}/>
          ))}
        </Picker>
      </View>
    );
  }
}

TimePicker.defaultProps = {
  date: new Date(),
  onDateChange: () => {},
  minuteInterval: 30,
  isPeriodCapitalized: true,
  style: {},
  periodPickerStyle: {},
  minutePickerStyle: {},
  hourPickerStyle: {},
  periodPickerItemStyle: { color:"black", fontSize:18 },
  minutePickerItemStyle: { color:"black", fontSize:18 },
  hourPickerItemStyle: { color:"black", fontSize:18 },
  indicator: true,
  indicatorColor: '#ebebeb',
  indicatorSize: 1,
  curved: true,
  atmospheric: true,
  cyclic: true,
  is24Hrs: false,
};

TimePicker.propTypes = {
  date: React.PropTypes.object.isRequired,
  onDateChange: React.PropTypes.func,
  minuteInterval: React.PropTypes.number,
  isPeriodCapitalized: React.PropTypes.bool,
  style: React.PropTypes.object,
  periodPickerStyle: React.PropTypes.object,
  minutePickerStyle: React.PropTypes.object,
  hourPickerStyle: React.PropTypes.object,
  periodPickerItemStyle: React.PropTypes.object,
  minutePickerItemStyle: React.PropTypes.object,
  hourPickerItemStyle: React.PropTypes.object,
  indicator: React.PropTypes.bool,
  indicatorSize: React.PropTypes.number,
  indicatorColor: React.PropTypes.string,
  curved: React.PropTypes.bool,
  atmospheric: React.PropTypes.bool,
  cyclic: React.PropTypes.bool,
  is24Hrs: React.PropTypes.bool,
};
