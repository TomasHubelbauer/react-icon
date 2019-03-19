import React, { Component } from "react";

type SignIconProps = { inCircle?: true; };
type PlusIconProps = { plus: true; } & SignIconProps;
type MinusIconProps = { minus: true; } & SignIconProps;
type CalendarIconProps = { calendar: true; date: number; };

type IconProps =
  | PlusIconProps
  | MinusIconProps
  | CalendarIconProps
  ;

export default class Icon extends Component<IconProps> {
  render() {
    if (this.isPlus(this.props)) {
      return (
        <svg height="16" width="16">
          <line x1="1" x2="15" y1="8" y2="8" stroke="black" />
          <line x1="8" x2="8" y1="1" y2="15" stroke="black" />
          {this.props.inCircle && <circle cx="8" cy="8" r="7" stroke="black" fill="none" />}
        </svg>
      );
    };

    if (this.isMinus(this.props)) {
      return (
        <svg height="16" width="16">
          <line x1="1" x2="15" y1="8" y2="8" stroke="black" />
          {this.props.inCircle && <circle cx="8" cy="8" r="7" stroke="black" fill="none" />}
        </svg>
      );
    };

    if (this.isCalendar) {
      return (
        <svg height="16" width="16">
          <polyline points="1,4 4,4 4,1 5,4 12,4 12,1 13,4 15,4 15,15 1,15 1,4" stroke="black" fill="none" />
          <text x="8" y="13" fontSize="9" textAnchor="middle">{this.props.date}</text>
        </svg>
      );
    }
  }

  private isPlus(props: IconProps): props is PlusIconProps {
    return (props as PlusIconProps).plus === true;
  }

  private isMinus(props: IconProps): props is MinusIconProps {
    return (props as MinusIconProps).minus === true;
  }

  private isCalendar(props: IconProps): props is CalendarIconProps {
    return (props as CalendarIconProps).calendar === true;
  }
}
