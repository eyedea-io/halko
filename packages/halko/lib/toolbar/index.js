import * as React from 'react';
import { ToolbarInner, ToolbarItem } from './styled';
export class Toolbar extends React.Component {
  render() {
    const {
      blocks,
      createEntity
    } = this.props;

    if (blocks.length === 0) {
      return null;
    }

    return React.createElement(ToolbarInner, null, blocks.map(item => React.createElement(ToolbarItem, {
      key: item.title,
      title: item.title,
      onClick: () => createEntity(item)
    }, item.label)));
  }

}