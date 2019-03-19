import React, { Component } from 'react';
import Icon from './Icon';

export default class App extends Component {
  render() {
    return (
      <div>
        <p>
          This is a demonstration of a project idea described in
          <a href="https://github.com/TomasHubelbauer/react-icon-component-idea">https://github.com/TomasHubelbauer/react-icon-component-idea</a>
        </p>
        <Icon plus />
        <Icon minus />
        <Icon plus inCircle />
        <Icon minus inCircle />
        <Icon calendar date={new Date().getDate()} />
      </div>
    );
  }
}
