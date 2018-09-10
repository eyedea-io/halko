import * as React from 'react'
import { render } from 'react-dom'

import { Editor, Renderer } from './halko'
import { HalkoTextBlock } from './halko-plugin-text'
import { HalkoImageBlock } from './halko-plugin-image'

import './index.css'

const PLUGINS: any = [
  HalkoTextBlock,
  [HalkoImageBlock, {
    handleUpload: async (file, {onUploadProgress}) => {
      const formData = new FormData()
      formData.append('file', file)

      await new Promise(resolve => setTimeout(resolve, 1000))
      onUploadProgress({total: 2000, loaded: 500})
      await new Promise(resolve => setTimeout(resolve, 1000))
      onUploadProgress({total: 2000, loaded: 1000})
      await new Promise(resolve => setTimeout(resolve, 1000))
      onUploadProgress({total: 2000, loaded: 1500})
      await new Promise(resolve => setTimeout(resolve, 1000))
      onUploadProgress({total: 2000, loaded: 2000})

      // const url = await axios.post('syncano upload endpoint', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   onUploadProgress
      // })
      // return url

      return `https://i.imgur.com/LoudX6o.jpg`
    }
  }]
]

class App extends React.Component<{}, {value: any}> {
  state = {
    value: [
      {block: 'text', data: 'Initial data of block number 1'},
      {block: 'image', data: 'https://placekitten.com/800/600'},
      {block: 'image', data: ''},
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
