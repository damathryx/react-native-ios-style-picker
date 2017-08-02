import React, { Component } from 'react';

import {
  View,
  ColorPropType,
  ViewPropTypes,
  requireNativeComponent,
} from 'react-native';

import PropTypes from 'prop-types';

class Item extends Component {
  static propTypes = {
    value: PropTypes.any, // string or integer basically
    label: PropTypes.string,
  }

  render() {
    // These items don't get rendered directly.
    return null;
  }
}

export default class WheelCurvedPicker extends Component {
  constructor(props) {
    super(props);
    this.state = this._stateFromProps(this.props);
  }

  static Item = Item;

  static propTypes = {
    ...ViewPropTypes,
  data: PropTypes.array,
  textColor: ColorPropType,
  textSize: PropTypes.number,
  itemStyle: PropTypes.object,
  itemSpace: PropTypes.number,
  onValueChange: PropTypes.func,
  selectedValue: PropTypes.any,
  selectedIndex: PropTypes.number,
  cyclic: PropTypes.bool,
  curved: PropTypes.bool,
  atmospheric: PropTypes.bool,
  indicator: PropTypes.bool,
  indicatorColor: ColorPropType,
  indicatorSize: PropTypes.number,
}

static defaultProps = {
  itemStyle : { color: 'white', fontSize:26 },
  itemSpace: 20,
  indicatorColor: '#ebebeb',
  cyclic: true,
  curved: true,
  atmospheric: true,
}

componentWillReceiveProps(nextProps) {
  this.setState(this._stateFromProps(nextProps));
}

_stateFromProps = (props) => {
  var selectedIndex = 0;
  var items = [];
  React.Children.forEach(props.children, function (child, index) {
    if (child.props.value === props.selectedValue) {
      selectedIndex = index;
    }
    items.push({value: child.props.value, label: child.props.label});
  });

  var textSize = props.itemStyle.fontSize;
  var textColor = props.itemStyle.color;

  return {selectedIndex, items, textSize, textColor};
}

_onValueChange = (e: Event) => {
  if (this.props.onValueChange) {
    this.props.onValueChange(e.nativeEvent.data);
  }
}

render() {
  return <WheelCurvedPickerNative
  selectedIndex={parseInt(this.state.selectedIndex, 10)}
  {...this.props}
  onValueChange={this._onValueChange}
  data={this.state.items}
  textColor={this.state.textColor}
  textSize={this.state.textSize} />;
}

}

var WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPicker);