import * as React from 'react'
import { render } from 'react-dom'

import { Editor } from '@halko/editor'
import { Image } from '@halko/plugin-image'
// import { Text } from '@halko/plugin-text'

import '../node_modules/@halko/plugin-text/lib/plugin.css'
import './index.css'

const PLUGINS: any = [
  // Text,
  [Image, {
    handleUpload: async (file: File, {onUploadProgress}: any) => {
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
  public state = {
    value: [
      // {plugin: 'text', data: 'Initial data of block number 1'},
      {plugin: 'image', data: {src: 'https://placekitten.com/800/600'}},
      // {plugin: 'image', data: ''},
      // {plugin: 'text', data: 'Another text block with data'},
      // {plugin: 'text', data: ''},
      // {plugin: 'text', data: 'Block after an empty block'},
    ]
  }

  public render() {
    return (
      <div>
        <h1>Editor: </h1>

        <Editor
          initialValue={this.state.value}
          plugins={PLUGINS}
          onInit={this.handleInit}
          onChange={this.handleChange}
        />

        {/* <h1>Renderer: </h1>
        <Renderer value={this.state.value} plugins={PLUGINS} /> */}
      </div>
    )
  }

  private handleInit = (api: any) => {
    // api.createEntity(Text(api))
  }

  private handleChange = (api: any) => {
    this.setState({value: api.getContent()})

    // tslint:disable-next-line:no-console
    // console.log(this.state.value)
  }
}

render(<App />, document.getElementById('root'))
