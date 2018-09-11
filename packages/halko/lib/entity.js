function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
export class Entity {
  constructor(api, options) {
    _defineProperty(this, "api", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "block", void 0);

    _defineProperty(this, "ref", void 0);

    _defineProperty(this, "updateData", newData => {
      this.data = newData;
      this.api.updateEntity(this);
    });

    _defineProperty(this, "setTooltipVisibility", visible => {
      this.api.setTooltipVisibility(visible);
    });

    _defineProperty(this, "moveUp", () => {
      const entities = this.api.getEntities();
      const entityIndex = entities.findIndex(item => item.id === this.id);
      this.api.moveEntity(this, entityIndex - 1);
    });

    _defineProperty(this, "moveDown", () => {
      const entities = this.api.getEntities();
      const entityIndex = entities.findIndex(item => item.id === this.id);
      this.api.moveEntity(this, entityIndex + 1);
    });

    _defineProperty(this, "getSiblings", () => {
      const entities = this.api.getEntities();
      const entityIndex = entities.findIndex(item => item.id === this.id);
      return {
        prev: entities[entityIndex - 1],
        next: entities[entityIndex + 1]
      };
    });

    _defineProperty(this, "isSameType", entity => {
      return this.block.id === entity.block.id;
    });

    _defineProperty(this, "remove", () => {
      this.api.removeEntity(this);
    });

    _defineProperty(this, "focus", () => {
      if (this.ref.current) {
        this.ref.current.focus();
      }
    });

    this.api = api;
    this.id = Math.random().toString(32), this.data = options.block.data;
    this.block = options.block;
    this.ref = React.createRef();
  }

  get isInline() {
    return this.block.isInline;
  }

  get isBlock() {
    return this.block.isBlock;
  }

  get isLeaf() {
    return this.block.isLeaf;
  }

  get canBeMovedUp() {
    return !!this.getSiblings().prev;
  }

  get canBeMovedDown() {
    return !!this.getSiblings().next;
  }

}