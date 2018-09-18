import {Block} from './block'
import {Entity} from './entity'

export interface EditorApi {
  getContent: () => any
  getEntities: () => Entity[]
  setTooltipVisibility: (visible: boolean) => void
  moveEntity: (entity: Entity, newIndex: number) => void
  // createEntity: (block: Block) => Entity
  updateEntity: (entity: Entity) => Entity
  removeEntity: (entity: Entity) => void
}
