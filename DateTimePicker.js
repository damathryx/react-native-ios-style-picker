import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import moment from 'moment';

export default class DateTimePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    const dateSelected = moment(props.date).isValid() ? moment(props.date) : moment();
    this.state = {
      ...props,
    };
  }

  render() {
    const {
      date,
    } = this.state;
    return (
      <View style={[{ flexDirection: 'row' }, this.state.style]}>
        <DatePicker
          style={this.state.timePickerStyle}
          date={this.state.date}
          dayPickerStyle={this.state.dayPickerStyle}
          monthPickerStyle={this.state.monthPickerStyle}
          yearPickerStyle={this.state.yearPickerStyle}
          dayPickerItemStyle={this.state.dayPickerItemStyle}
          monthPickerItemStyle={this.state.monthPickerItemStyle}
          yearPickerItemStyle={this.state.yearPickerItemStyle}
          atmospheric={this.state.atmospheric}
          indicator={this.state.indicator}
          minuteInterval={this.state.minuteInterval}
          indicatorSize={this.state.indicatorSize}
          indicatorColor={this.state.indicatorColor}
          onDateChange={(date) => {
            this.props.onDateChange(date)
            this.setState({
              date,
            });
          }}
        />
        <TimePicker
          style={this.state.timePickerStyle}
          date={this.state.date}
          isPeriodCapitalized={this.state.isPeriodCapitalized}
          periodPickerStyle={this.state.periodPickerStyle}
          minutePickerStyle={this.state.minutePickerStyle}
          hourPickerStyle={this.state.hourPickerStyle}
          periodPickerItemStyle={this.state.periodPickerItemStyle}
          minutePickerItemStyle={this.state.minutePickerItemStyle}
          hourPickerItemStyle={this.state.hourPickerItemStyle}
          atmospheric={this.state.atmospheric}
          indicator={this.state.indicator}
          minuteInterval={this.state.minuteInterval}
          indicatorSize={this.state.indicatorSize}
          indicatorColor={this.state.indicatorColor}
          onDateChange={(date) => {
            this.props.onDateChange(date)
            this.setState({
              date,
            });
          }}
        />
      </View>
    );
  }
}

currentYear = moment({ year: moment().year(), month: moment().month(), day: 15, hour: 0, minute: 0, ms: 0 });
minYear = currentYear.month() - 1;
maxYear = currentYear.year() + 1;

DateTimePickerComponent.defaultProps = {
  minDate: currentYear.set('month', minYear).toDate(),
  maxDate: currentYear.set('year', maxYear).toDate(),
  date: new Date(),
  onDateChange: () => {},
  minuteInterval: 30,
  isPeriodCapitalized: true,
  indicator: true,
  indicatorColor: '#ebebeb',
  indicatorSize: 1,
  curved: true,
  atmospheric: true,
  cyclic: true,
};

DateTimePickerComponent.propTypes = {
  date: React.PropTypes.object.isRequired,
  onDateChange: React.PropTypes.func,
  minuteInterval: React.PropTypes.number,
  isPeriodCapitalized: React.PropTypes.bool,
  indicator: React.PropTypes.bool,
  indicatorSize: React.PropTypes.number,
  indicatorColor: React.PropTypes.string,
  curved: React.PropTypes.bool,
  atmospheric: React.PropTypes.bool,
  cyclic: React.PropTypes.bool,
};
