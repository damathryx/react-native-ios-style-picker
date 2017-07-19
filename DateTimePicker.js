import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import Picker from './Picker';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import moment from 'moment';
import _ from 'lodash';

const DATE_FORMAT = 'ddd MMM D';

// checkIfToday = (date) => {
//   return moment().isSame(moment(date), 'day');
// }

// getDays = (dateSelected, min, max) => {
//   const now = moment();
//   var minDate = moment(min);
//   var maxDate = moment(max);
//   if (!minDate.isValid()) {
//     throw new Error('minDate is not a valid date string');
//   } else if (!maxDate.isValid()) {
//     throw new Error('maxDate is not a valid date string');
//   } else if (minDate.isAfter(maxDate)) {
//     throw new Error('maxDate should be after minDate');
//   }
//   const days = [];
//   var stopChecking = false;
//   var l = 0;
//   var def = 0;
//   for (var i = minDate; maxDate.isAfter(minDate); minDate.add(1, 'day')) {
//     var label = minDate.format(DATE_FORMAT);
//     const date = minDate.toDate();
//     if (dateSelected.isSame(minDate, 'day')) {
//       def = l;
//     }
//     if (checkIfToday(date) && !stopChecking) {
//       label = 'Today';
//       stopChecking = true;
//     }
//     l++;
//     days.push({ date, label, });
//   }
//   return { days, def };
// }
export default class DateTimePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    const dateSelected = moment(props.date).isValid() ? moment(props.date) : moment();
    // const dates = getDays(dateSelected, props.minDate, props.maxDate);
    this.state = {
      ...props,
    };
  }

  render() {
    const {
      // daysList,
      date,
      // daySelected,
    } = this.state;
    // console.log(daySelected);
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
