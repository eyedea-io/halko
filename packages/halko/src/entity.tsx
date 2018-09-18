import * as React from 'react'
import {EditorApi} from './api'
import {Block} from './block'

interface Props {
  api: EditorApi
  config: any
  entity: any
}

export class Entity extends React.Component<Props, any> {
  api: EditorApi
  block: Block
  ref: React.RefObject<HTMLElement>

  constructor(props: any) {
    super(props)

    this.api = props.api
    this.id = Math.random().toString(32),
    this.data = props.options.block.data
    this.block = props.options.block
    this.ref = React.createRef()
  }

  get isInline() { return this.block.isInline }
  get isBlock() { return this.block.isBlock }
  get isLeaf() { return this.block.isLeaf }
  get canBeMovedUp() { return !!this.getSiblings().prev }
  get canBeMovedDown() { return !!this.getSiblings().next }

  moveUp = () => {
    const entities = this.api.getEntities()
    const entityIndex = entities.findIndex(item => item.id === this.id)

    this.api.moveEntity(this, entityIndex - 1)
  }

  moveDown = () => {
    const entities = this.api.getEntities()
    const entityIndex = entities.findIndex(item => item.id === this.id)

    this.api.moveEntity(this, entityIndex + 1)
  }

  getSiblings = () => {
    const entities = this.api.getEntities()
    const entityIndex = entities.findIndex(item => item.id === this.id)

    return {
      prev: entities[entityIndex - 1],
      next: entities[entityIndex + 1],
    }
  }

  isSameType = (entity: Entity) => {
    return this.block.id === entity.block.id
  }

  update = (newData: any) => {
    // this.data = newData
    this.api.updateEntity(this)
  }

  remove = () => {
    this.api.removeEntity(this)
  }
}
