import * as React from 'react'
import { Entity } from './entity'

export interface Props {
  entities: Entity[]
}

export class EntityList extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.entities.map(item => (
          <item.block.component key={item.id} entity={item} />
        ))}
      </div>
    )
  }
}