import * as React from 'react'
import {Entity} from '../entity'
import {ChevronDown, ChevronUp, RemoveIcon} from './icons'
import {TooltipInner, TooltipItem, TooltipWrapper} from './styled'

interface Props {
  entity: Entity
  config: any
}

export class Tooltip extends React.PureComponent<Props> {
  render() {
    const {entity} = this.props

    return (
      <TooltipWrapper>
        <TooltipInner>
          {entity.canBeMovedDown && (
            <TooltipItem onClick={entity.moveDown}>
              <ChevronDown />
            </TooltipItem>
          )}
          {entity.canBeMovedUp && (
            <TooltipItem onClick={entity.moveUp}>
              <ChevronUp />
            </TooltipItem>
          )}
          <TooltipItem onClick={entity.remove}>
            <RemoveIcon />
          </TooltipItem>
        </TooltipInner>
        {/* {blocks.map(item => (
          <ToolbarItem
            key={item.title}
            title={item.title}
            onClick={() => createEntity(item)}
          >
            {item.label}
          </ToolbarItem>
        ))} */}
      </TooltipWrapper>
    )
  }
}
