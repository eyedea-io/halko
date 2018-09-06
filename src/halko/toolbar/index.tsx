import * as React from 'react'
import { ToolbarInner, ToolbarItem } from './styled'
import { Block } from '../block'

interface Props {
  blocks: Block[]
  createEntity: (block: Block) => void
}

export class Toolbar extends React.Component<Props> {
  render() {
    const {blocks, createEntity} = this.props

    if (blocks.length === 0) {
      return null
    }

    return (
      <ToolbarInner>
        {blocks.map(item => (
          <ToolbarItem
            key={item.title}
            title={item.title}
            onClick={() => createEntity(item)}
          >
            {item.label}
          </ToolbarItem>
        ))}
      </ToolbarInner>
    )
  }
}
