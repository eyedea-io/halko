import * as React from 'react'
import { render } from 'react-dom'

import { Editor } from './halko'
import { HalkoTextBlock } from './halko-plugin-text'
import { HalkoImageBlock } from './halko-plugin-image'

import './index.css'

const App = () => (
  <Editor 
    plugins={[HalkoTextBlock, HalkoImageBlock]} 
    onInit={(api) => {
      api.createEntity(HalkoTextBlock(api))
    }}
  />
)

render(<App />, document.getElementById('root'))
