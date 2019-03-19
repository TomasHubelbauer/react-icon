import React, { Component } from 'react';
import Icon from './Icon';

export default class App extends Component {
  render() {
    return (
      <div>
        <Icon plus />
        <Icon minus />
        <Icon plus inCircle />
        <Icon minus inCircle />
        <Icon calendar date={new Date().getDate()} />
      </div>
    );
  }
}
