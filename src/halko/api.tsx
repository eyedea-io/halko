import { Entity } from './entity'
import { Block } from '.'

export interface EditorApi {
  getContent: () => any
  getEntities: () => Entity[]
  moveEntity: (entity: Entity, newIndex: number) => void
  createEntity: (block: Block) => Entity
  updateEntity: (entity: Entity) => Entity
  removeEntity: (entity: Entity) => void
}
