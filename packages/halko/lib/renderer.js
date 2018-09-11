function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
export class Renderer extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "renderBlock", (blockName, data) => {
      const block = this.blocks.find(item => item.id === blockName);

      if (block && block.renderer) {
        return React.createElement(block.renderer, {
          key: Math.random().toString(32),
          data: data
        });
      }

      return null;
    });
  }

  render() {
    return React.createElement("div", null, this.props.value.map(item => this.renderBlock(item.block, item.data)));
  }

  get blocks() {
    return this.props.plugins.map(plugin => Array.isArray(plugin) ? plugin[0]() : plugin());
  }

}