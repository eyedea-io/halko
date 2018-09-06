import * as React from 'react'
import { EditorApi, Block, Entity } from 'halko'
import { ImageInput, ImagePreview } from './styled'

interface Props {
  entity: Entity
}

interface State {
  previewUrl: string
}

class ImageBlock extends React.Component<Props, State> {
  state = {
    previewUrl: ''
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.currentTarget

    if (files && files[0]) {
      var reader = new FileReader()
  
      reader.onload = (event: any) => {
        this.setState({previewUrl: event.target && event.target.result})
      }
  
      reader.readAsDataURL(files[0])
    }
  }

  render() {
    const {previewUrl} = this.state
    const {entity} = this.props

    if (previewUrl) {
      return (
        <ImagePreview 
          innerRef={entity.ref} 
          src={previewUrl}
        />
      )
    }

    return (
      <ImageInput
        innerRef={entity.ref}
        onChange={this.handleChange} 
      />
    )
  }
}

export const HalkoImageBlock = (api: EditorApi): Block => ({
  id: 'image',
  label: 'Image',
  title: 'Add image from disc',
  data: '',
  isLeaf: true,
  component: ImageBlock
})

/* <Image 
  src="http://via.placeholder.com/350x150"
  innerRef={entity.ref}
  onKeyDown={(e: React.KeyboardEvent<HTMLImageElement>) => {
    const {prev, next} = entity.getSiblings()

    if (e.keyCode === KEY_CODES.backspace) {
      if (prev) { prev.focus() }
      if (!prev && next) { next.focus() }
      entity.remove()
      e.preventDefault()
    }
    if (e.keyCode === KEY_CODES.down) {
      if (next) { next.focus() }
      e.preventDefault()
    }
    if (e.keyCode === KEY_CODES.up) {
      if (prev) { prev.focus() }
      e.preventDefault()
    }
    if (e.keyCode === KEY_CODES.delete) {
      if (next) { next.focus() }
      if (!next && prev) { prev.focus() }
      entity.remove()
      e.preventDefault()
    }
  }}
  /> */