import * as React from 'react'
import { EditorPlugin } from './plugin'

interface Props {
  plugins: EditorPlugin[]
  value: {
    block: string
    data: any
  }[]
}

export class Renderer extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.value.map(item => (
          this.renderBlock(item.block, item.data)
        ))}
      </div>
    )
  }

  private renderBlock = (blockName: string, data: any) => {
    const block = this.blocks.find(item => item.id === blockName)

    if (block && block.renderer) {
      return <block.renderer key={Math.random().toString(32)} data={data} />
    }

    return null
  }

  private get blocks() {
    return this.props.plugins.map(plugin => plugin())
  }
}
