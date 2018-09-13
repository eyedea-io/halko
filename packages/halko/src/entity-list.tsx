import * as React from 'react'
import {Entity} from './entity'
import {Tooltip} from './tooltip'
import {TooltipContainer} from './tooltip/styled'

export interface Props {
  entities: Entity[]
  showTooltip: boolean
}

export class EntityList extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.entities.map(item => (
          <TooltipContainer key={item.id}>
            {this.props.showTooltip && (
              <Tooltip entity={item} config={item.block.config} />
            )}
            <item.block.component entity={item} config={item.block.config} />
          </TooltipContainer>
        ))}
      </div>
    )
  }
}
