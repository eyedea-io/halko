import { Entity } from './entity'
import { Block } from '.'

export interface EditorApi {
  getContent: () => any
  getEntities: () => Entity[]
  createEntity: (block: Block) => Entity
  updateEntity: (entity: Entity) => Entity
  removeEntity: (entity: Entity) => void
}
