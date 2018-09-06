import * as React from 'react'
import { render } from 'react-dom'

import { Editor, Renderer } from './halko'
import { HalkoTextBlock } from './halko-plugin-text'
import { HalkoImageBlock } from './halko-plugin-image'

import './index.css'

const PLUGINS = [HalkoTextBlock, HalkoImageBlock]

class App extends React.Component<{}, {value: any}> {
  state = {
    value: [
      {block: 'text', data: 'Initial data of block number 1'},
      {block: 'text', data: 'Another text block with data'},
      {block: 'text', data: ''},
      {block: 'text', data: 'Block after an empty block'},
    ]
  }

  render() {
    return (
      <div>
        <h1>Editor: </h1>

        <Editor
          initialValue={this.state.value}
          plugins={PLUGINS}
          onInit={api => {
            api.createEntity(HalkoTextBlock(api))
          }}
          onChange={api => {
            this.setState({value: api.getContent()})
          }}
        />

        <h1>Renderer: </h1>
        <Renderer value={this.state.value} plugins={PLUGINS} />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
