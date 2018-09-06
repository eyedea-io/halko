import * as React from 'react'
import { EditorApi } from './api'
import { Block } from './block'

export class Entity {
  api: EditorApi
  id: string
  data: any
  block: Block
  ref: React.RefObject<HTMLElement>

  constructor(api: EditorApi, options: {
    block: Block
  }) {
    this.api = api
    this.id = Math.random().toString(32),
    this.data = options.block.data
    this.block = options.block
    this.ref = React.createRef()
  }

  get isInline() { return this.block.isInline }
  get isBlock() { return this.block.isBlock }
  get isLeaf() { return this.block.isLeaf }

  updateData = (newData: any) => {
    this.data = newData
    this.api.updateEntity(this)
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

  remove = () => {
    this.api.removeEntity(this)
  }

  focus = () => {
    if (this.ref.current) {
      this.ref.current.focus()
    }
  }
}
