import * as React from 'react';
import { Tooltip } from './tooltip';
import { TooltipContainer } from './tooltip/styled';
export class EntityList extends React.Component {
  render() {
    return React.createElement("div", null, this.props.entities.map(item => React.createElement(TooltipContainer, {
      key: item.id
    }, this.props.showTooltip && React.createElement(Tooltip, {
      entity: item,
      config: item.block.config
    }), React.createElement(item.block.component, {
      entity: item,
      config: item.block.config
    }))));
  }

}