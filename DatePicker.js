
import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import PropTypes from 'prop-types';
import Picker from './Picker';
import moment from 'moment';
import _ from 'lodash';

getNumberOfDaysInMonth = (date) => {
  return date.daysInMonth();
}

getDaysInMonth = (date) => {
  const numberOfDays = getNumberOfDaysInMonth(date);
  const days = _.range(1, numberOfDays + 1);
  return days;
}

getYearList = (min, max) => {
  const now = moment();
  var minDate = moment(min);
  var maxDate = moment(max);
  if (!minDate.isValid()) {
    throw new Error('minDate is not a valid date string');
  } else if (!maxDate.isValid()) {
    throw new Error('maxDate is not a valid date string');
  } else if (minDate.isAfter(maxDate)) {
    throw new Error('maxDate should be after minDate');
  }
  return _.range(minDate.year(), maxDate.year());
}

export default class DatePickerComponent extends Component {
  constructor(props) {
    super(props);
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const yearList = getYearList(props.minDate, props.maxDate);
    const dateSelected = moment(props.date).isValid() ? moment(props.date) : moment();
    const yearSelected = dateSelected.year();
    const monthSelected = dateSelected.month();
    const daySelected = dateSelected.date();
    const hourSelected = dateSelected.hour();
    const minuteSelected = dateSelected.minute();
    const daysList = getDaysInMonth(dateSelected);
    this.state = {
      ...props,
      dateSelected,
      daysList,
      daySelected,
      monthList,
      monthSelected,
      yearList,
      yearSelected,
      hourSelected,
      minuteSelected,
    };
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.date !== this.props.date) {
      const dateSelected = moment(nextProps.date).isValid ? moment(nextProps.date) : moment();
      const yearSelected = dateSelected.year();
      const monthSelected = dateSelected.month();
      const daySelected = dateSelected.date();
      const hourSelected = dateSelected.hour();
      const minuteSelected = dateSelected.minute();
      const daysList = getDaysInMonth(dateSelected);
      this.setState({
        ...nextProps,
        dateSelected,
        daysList,
        daySelected,
        monthSelected,
        yearSelected,
        hourSelected,
        minuteSelected,
      });
    }
  }
  _onMonthValueChange = (monthSelected) => {
    const {
      yearSelected,
      hourSelected,
      minuteSelected,
    } = this.state;
    let { daySelected } = this.state;
    let date = moment({ year: yearSelected, month: monthSelected, day: daySelected, hour: hourSelected, minute: minuteSelected });
    while (!date.isValid()) {
      daySelected--;
      date = moment({ year: yearSelected, month: monthSelected, day: daySelected, hour: hourSelected, minute: minuteSelected });
    }
    const daysList = getDaysInMonth(date);
    this.props.onDateChange(date.toDate());
    this.setState({
      monthSelected,
      daysList,
      daySelected
    });
  }
  _onDayValueChange = (daySelected) => {
    const {
      yearSelected,
      monthSelected,
      hourSelected,
      minuteSelected,
    } = this.state;
    let date = moment({ year: yearSelected, month: monthSelected, day: daySelected, hour: hourSelected, minute: minuteSelected });
    this.props.onDateChange(date.toDate());
    this.setState({ daySelected })
  }
  _onYearValueChange = (yearSelected) => {
    const {
      monthSelected,
      hourSelected,
      minuteSelected,
    } = this.state;
    let { daySelected } = this.state;
    let date = moment({ year: yearSelected, month: monthSelected, day: daySelected, hour: hourSelected, minute: minuteSelected });
    while (!date.isValid()) {
      daySelected--;
      date = moment({ year: yearSelected, month: monthSelected, day: daySelected, hour: hourSelected, minute: minuteSelected });
    }
    const daysList = getDaysInMonth(date);
    this.props.onDateChange(date.toDate());
    this.setState({
      yearSelected,
      daysList,
      daySelected
    })
  }
  render() {
    const {
      yearList,
      yearSelected,
      monthList,
      monthSelected,
      daysList,
      hourSelected,
      minuteSelected,
    } = this.state;
    let { daySelected } = this.state;
    return (
      <View style={[{ flexDirection: 'row' }, this.state.style]}>
        <Picker
          style={{ width: 100, height: 170 }}
          selectedValue={monthSelected}
          itemStyle={this.state.monthPickerItemStyle}
          curved={this.state.curved}
          cyclic={this.state.cyclic}
          atmospheric={this.state.atmospheric}
          indicator={this.state.indicator}
          indicatorSize={this.state.indicatorSize}
          indicatorColor={this.state.indicatorColor}
          onValueChange={this._onMonthValueChange}>
          {monthList.map((value, i) => (
            <Picker.Item label={value} value={i} key={"monthList"+value}/>
          ))}
        </Picker>
        <Picker
          style={{width: 40, height: 170}}
          selectedValue={daySelected}
          itemStyle={this.state.dayPickerItemStyle}
          curved={this.state.curved}
          cyclic={this.state.cyclic}
          atmospheric={this.state.atmospheric}
          indicator={this.state.indicator}
          indicatorSize={this.state.indicatorSize}
          indicatorColor={this.state.indicatorColor}
          onValueChange={this._onDayValueChange}>
          {daysList.map((value, i) => (
            <Picker.Item label={`${value}`} value={value} key={"daysList"+value}/>
          ))}
        </Picker>
        <Picker
          style={{width: 75, height: 170}}
          selectedValue={yearSelected}
          itemStyle={this.state.yearPickerItemStyle}
          curved={this.state.curved}
          cyclic={this.state.cyclic}
          atmospheric={this.state.atmospheric}
          indicator={this.state.indicator}
          indicatorSize={this.state.indicatorSize}
          indicatorColor={this.state.indicatorColor}
          onValueChange={this._onYearValueChange}>
          {yearList.map((value, i) => (
            <Picker.Item label={`${value}`} value={value} key={"yearList"+value}/>
          ))}
        </Picker>
      </View>
    );
  }
}

const currentYear = moment({ year: moment().year(), month: moment().month(), day: 15 });
const minYear = currentYear.year() - 5;
const maxYear = currentYear.year() + 5;

DatePickerComponent.defaultProps = {
  minDate: currentYear.set('year', minYear).toDate(),
  maxDate: currentYear.set('year', maxYear).toDate(),
  date: new Date(),
  onDateChange: () => {},
  style: {},
  yearPickerStyle: {},
  monthPickerStyle: {},
  dayPickerStyle: {},
  yearPickerItemStyle: { color:"black", fontSize:18 },
  monthPickerItemStyle: { color:"black", fontSize:18 },
  dayPickerItemStyle: { color:"black", fontSize:18 },
  indicator: true,
  indicatorColor: '#ebebeb',
  indicatorSize: 1,
  curved: true,
  atmospheric: true,
  cyclic: true,
};
DatePickerComponent.propTypes = {
  date: PropTypes.object,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  onDateChange: PropTypes.func,
  style: PropTypes.object,
  yearPickerItemStyle: PropTypes.object,
  monthPickerStyle: PropTypes.object,
  yearPickerItemStyle: PropTypes.object,
  monthPickerStyle: PropTypes.object,
  indicator: PropTypes.bool,
  indicatorSize: PropTypes.number,
  indicatorColor: PropTypes.string,
  curved: PropTypes.bool,
  atmospheric: PropTypes.bool,
  cyclic: PropTypes.bool,
};
