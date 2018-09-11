function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { Toolbar } from './toolbar';
import { Layout } from './styled';
import { EntityList } from './entity-list';
import { Entity } from './entity';
export class Editor extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      showTooltip: true,
      wasInitialised: false,
      entities: []
    });

    _defineProperty(this, "setInitialValue", async initialValue => {
      initialValue.forEach(item => {
        const entity = this.createEntityByBlockName(item.block);
        entity.updateData(item.data);
      });
    });

    _defineProperty(this, "setTooltipVisibility", async visible => {
      this.setState({
        showTooltip: visible
      });
    });

    _defineProperty(this, "triggerOnChange", () => {
      if (this.props.onChange && this.state.wasInitialised) {
        this.props.onChange(this.api);
      }
    });

    _defineProperty(this, "createEntityByBlockName", (blockName, data) => {
      const block = this.blocks.find(item => item.id === blockName);

      if (block) {
        return this.createEntity(block);
      } else {
        throw new Error(`Invalid block: ${blockName}`);
      }
    });

    _defineProperty(this, "createEntity", block => {
      const entity = new Entity(this.api, {
        block
      });

      const changeState = state => ({
        entities: state.entities.concat([entity])
      });

      this.setState(changeState, this.triggerOnChange);
      return entity;
    });

    _defineProperty(this, "updateEntity", entity => {
      const changeState = state => ({
        entities: state.entities.map(item => item.id === entity.id ? entity : item)
      });

      this.setState(changeState, this.triggerOnChange);
      return entity;
    });

    _defineProperty(this, "removeEntity", entity => {
      const changeState = state => ({
        entities: state.entities.filter(item => item.id !== entity.id)
      });

      this.setState(changeState, this.triggerOnChange);
    });

    _defineProperty(this, "getEntities", () => {
      return this.state.entities;
    });

    _defineProperty(this, "moveEntity", (entity, newIndex) => {
      if (newIndex > this.state.entities.length) {
        return;
      }

      const currentIndex = this.state.entities.findIndex(item => item.id === entity.id);
      const {
        entities
      } = this.state;
      entities.splice(currentIndex, 1);
      entities.splice(newIndex, 0, entity);
      this.setState({
        entities
      });
    });

    _defineProperty(this, "getContent", () => {
      return this.state.entities.map(item => ({
        block: item.block.id,
        data: item.data
      }));
    });
  }

  async componentDidMount() {
    if (this.props.initialValue) {
      await this.setInitialValue(this.props.initialValue);
    }

    this.setState({
      wasInitialised: true
    });

    if (this.props.onInit) {
      this.props.onInit(this.api);
    }
  }

  render() {
    return React.createElement(Layout, null, React.createElement(EntityList, {
      entities: this.state.entities,
      showTooltip: this.state.showTooltip
    }), React.createElement(Toolbar, {
      blocks: this.blocks,
      createEntity: this.createEntity
    }));
  }

  get api() {
    return {
      getContent: this.getContent,
      getEntities: this.getEntities,
      createEntity: this.createEntity,
      removeEntity: this.removeEntity,
      updateEntity: this.updateEntity,
      setTooltipVisibility: this.setTooltipVisibility,
      moveEntity: this.moveEntity
    };
  }

  get blocks() {
    return this.props.plugins.map(plugin => {
      if (Array.isArray(plugin)) {
        return plugin[0](this.api, plugin[1]);
      }

      return plugin(this.api);
    });
  }

}