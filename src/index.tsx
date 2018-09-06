import * as React from 'react'
import { render } from 'react-dom'

import { Editor } from './halko'
import { HalkoTextBlock } from './halko-plugin-text'
import { HalkoImageBlock } from './halko-plugin-image'

import './index.css'

const App = () => (
  <Editor 
    initialValue={[
      {block: 'text', data: 'Initial data of block number 1'},
      {block: 'text', data: 'Another text block with data'},
      {block: 'text', data: ''},
      {block: 'text', data: 'Block after an empty block'},
    ]}
    plugins={[HalkoTextBlock, HalkoImageBlock]} 
    onInit={api => {
      api.createEntity(HalkoTextBlock(api))
    }}
    onChange={api => {
      console.warn(api.getContent())
    }}
  />
)

render(<App />, document.getElementById('root'))
