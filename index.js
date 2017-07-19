import React from 'react';

import {
	PickerIOS,
	Platform,
	DatePickerIOS,
} from 'react-native';

import PickerAndroid from './Picker.android.js'
import DatePickerAndroid from './DatePickerAndroid';

const Picker = (Platform.OS === 'ios' ? PickerIOS : PickerAndroid);
export const DatePicker = (Platform.OS === 'ios' ? DatePickerIOS : DatePickerAndroid);
export default Picker;
