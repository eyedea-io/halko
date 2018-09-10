import * as React from 'react'
import { EditorApi, Block, Entity } from 'halko'
import { ImageInput, ImagePreview, ImageWrapper, ProgressBar, ProgressBarFill, Image } from './styled'

interface Config {
  handleUpload?: (file: File, {}: {
    onUploadProgress: (progressEvent: ProgressEvent) => void
  }) => string
}

interface Props {
  entity: Entity
  config: Config
}

interface State {
  previewUrl: string
  uploadProgress: number
}

class ImageBlock extends React.Component<Props, State> {
  config: Config

  state = {
    previewUrl: '',
    uploadProgress: -1
  }

  componentDidMount() {
    this.config = this.props.config || {}
  }

  handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.currentTarget
    const {handleUpload} = this.config

    if (files && files[0]) {
      var reader = new FileReader()

      reader.onload = (event: any) => {
        this.setState({previewUrl: event.target && event.target.result})
      }

      reader.readAsDataURL(files[0])
    }

    if (typeof handleUpload === 'function' && files) {
      const url = await handleUpload(files[0], {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)

          this.setState({uploadProgress})
        }
      })

      this.props.entity.updateData(url)
    }
  }

  render() {
    const {previewUrl} = this.state
    const {entity} = this.props
    const url = entity.data || previewUrl

    if (url) {
      return (
        <ImageWrapper>
          <ImagePreview innerRef={entity.ref} src={url} />

          <ProgressBar progress={this.state.uploadProgress}>
            <ProgressBarFill
              style={{
                width: `${this.state.uploadProgress}%`
              }}
            />
          </ProgressBar>
        </ImageWrapper>
      )
    }

    return (
      <ImageInput innerRef={entity.ref} onChange={this.handleChange} />
    )
  }

  get isProgressBarHidden() {
    return this.state.uploadProgress === 0 || this.state.uploadProgress === 100
  }
}

const ImageBlockRenderer = ({data}) => (
  <Image src={data} alt=""/>
)

export const HalkoImageBlock = (api?: EditorApi, config?: any): Block => ({
  id: 'image',
  label: 'Image',
  title: 'Add image from disc',
  data: '',
  isLeaf: true,
  config,
  component: ImageBlock,
  renderer: ImageBlockRenderer
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
