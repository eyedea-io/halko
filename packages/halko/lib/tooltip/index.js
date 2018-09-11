import * as React from 'react';
import { TooltipWrapper, TooltipInner, TooltipItem } from './styled';
import { RemoveIcon, ChevronUp, ChevronDown } from './icons';
export class Tooltip extends React.Component {
  render() {
    const {
      entity
    } = this.props;
    return React.createElement(TooltipWrapper, null, React.createElement(TooltipInner, null, entity.canBeMovedDown && React.createElement(TooltipItem, {
      onClick: entity.moveDown
    }, React.createElement(ChevronDown, null)), entity.canBeMovedUp && React.createElement(TooltipItem, {
      onClick: entity.moveUp
    }, React.createElement(ChevronUp, null)), React.createElement(TooltipItem, {
      onClick: entity.remove
    }, React.createElement(RemoveIcon, null))));
  }

}