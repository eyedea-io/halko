/* tslint:disable max-line-length */
import {Block, EditorApi, Entity} from '@halko/editor'
import * as React from 'react'
import {ImageDropArea, ImageInput, ImagePreview, ImageRender, ImageWrapper, ProgressBar, ProgressBarFill} from './styled'

interface Config {
  handleUpload?: (file: File, config: {
    onUploadProgress: (progressEvent: ProgressEvent) => void
  }) => string
}

interface Props {
  api: EditorApi
  entity: Entity
  config?: Config
}

interface State {
  previewUrl: string
  isDropZoneActive: boolean
  uploadProgress: number
}

class ImageBlock extends React.Component<Props, State> {
  config: Config = {}

  state = {
    previewUrl: '',
    isDropZoneActive: false,
    uploadProgress: -1,
  }

  componentDidMount() {
    this.config = this.props.config || {}
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
                width: `${this.state.uploadProgress}%`,
              }}
            />
          </ProgressBar>
        </ImageWrapper>
      )
    }

    return (
      <ImageDropArea
        onDragOver={this.handleDragEnter}
        onDragEnd={this.handleDragExit}
        onDragExit={this.handleDragExit}
        onDragLeave={this.handleDragExit}
        onDrop={this.handleDrop}
        isActive={this.state.isDropZoneActive}
      >
        <svg width="55" height="36" viewBox="0 0 55 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.0171 33.488H34.376C34.0114 33.488 33.6617 33.341 33.4038 33.0793C33.146 32.8176 33.0011 32.4627 33.0011 32.0926C33.0011 31.7225 33.146 31.3675 33.4038 31.1058C33.6617 30.8441 34.0114 30.6971 34.376 30.6971H44.0171C48.5571 30.6971 52.2501 26.9489 52.2501 22.3412C52.2488 20.9985 51.929 19.6759 51.3177 18.4851C50.7065 17.2944 49.8218 16.2705 48.7384 15.4999C47.655 14.7294 46.4048 14.2349 45.0934 14.0582C43.7819 13.8815 42.4479 14.0278 41.2039 14.4848C40.9129 14.5915 40.5949 14.5955 40.3014 14.496C40.0078 14.3966 39.7559 14.1996 39.5864 13.9368C39.4169 13.674 39.3397 13.3609 39.3672 13.0481C39.3948 12.7353 39.5255 12.441 39.7383 12.213C40.4762 11.4204 40.9694 10.4261 41.1573 9.35249C41.3452 8.27889 41.2194 7.17296 40.7955 6.17101C40.3716 5.16906 39.6682 4.3149 38.7718 3.71379C37.8754 3.11267 36.8253 2.7909 35.751 2.78811C33.9856 2.78811 32.3714 3.61701 31.3237 5.0599C30.6956 5.92225 30.327 6.95069 30.2622 8.02105C30.2434 8.30932 30.137 8.58459 29.9577 8.809C29.7784 9.03341 29.5351 9.19595 29.2611 9.27427C28.987 9.35259 28.6959 9.34284 28.4275 9.24637C28.1592 9.1499 27.9269 8.97143 27.7626 8.73552L27.7489 8.71598C26.4783 6.88623 24.7932 5.39299 22.8355 4.36189C20.8778 3.3308 18.7048 2.79202 16.4992 2.7909C8.9178 2.7909 2.74986 9.05089 2.74986 16.7454C2.74986 24.4399 8.9178 30.6999 16.4992 30.6999H23.3738C23.7385 30.6999 24.0882 30.8469 24.3461 31.1086C24.6039 31.3703 24.7488 31.7253 24.7488 32.0953C24.7488 32.4654 24.6039 32.8204 24.3461 33.0821C24.0882 33.3438 23.7385 33.4908 23.3738 33.4908H16.4992C7.40263 33.4908 0 25.9777 0 16.7454C0 7.5131 7.40263 0 16.4992 0C20.9072 0 25.1255 1.79455 28.2163 4.95385C29.0992 2.99273 30.693 1.45255 32.6662 0.653685C34.6395 -0.145176 36.8402 -0.14121 38.8106 0.664758C40.781 1.47073 42.3694 3.01665 43.2454 4.98093C44.1214 6.94522 44.2176 9.17665 43.5138 11.211C44.9965 11.144 46.4772 11.3823 47.8668 11.9115C49.2563 12.4407 50.5259 13.2499 51.5991 14.2903C52.6723 15.3308 53.5269 16.581 54.1114 17.9655C54.6959 19.3501 54.9981 20.8404 55 22.3467C54.9964 25.3019 53.8381 28.135 51.7792 30.2247C49.7202 32.3143 46.9288 33.4899 44.0171 33.4936V33.488Z" fill="#E5E5E5"/>
          <path d="M35.3491 25.2438L29.8494 19.662C29.5915 19.4004 29.2419 19.2535 28.8773 19.2535C28.5127 19.2535 28.1631 19.4004 27.9052 19.662L22.4055 25.2438C22.155 25.507 22.0165 25.8595 22.0196 26.2254C22.0227 26.5913 22.1673 26.9413 22.4222 27.2C22.6772 27.4587 23.022 27.6055 23.3825 27.6087C23.743 27.6119 24.0903 27.4712 24.3496 27.217L27.501 24.0186V34.6045C27.501 34.9746 27.6458 35.3296 27.9037 35.5913C28.1615 35.853 28.5113 36 28.8759 36C29.2406 36 29.5903 35.853 29.8481 35.5913C30.106 35.3296 30.2508 34.9746 30.2508 34.6045V24.0186L33.4022 27.217C33.5295 27.3476 33.6811 27.4513 33.8482 27.5221C34.0153 27.5929 34.1946 27.6293 34.3756 27.6293C34.5567 27.6293 34.736 27.5929 34.9031 27.5221C35.0701 27.4513 35.2217 27.3476 35.3491 27.217C35.6069 26.9553 35.7517 26.6005 35.7517 26.2304C35.7517 25.8604 35.6069 25.5055 35.3491 25.2438Z" fill="#E5E5E5"/>
        </svg>

        <div>
          Drop your image here or <a>click here</a> to browse disc.
        </div>
        <ImageInput innerRef={entity.ref} onChange={this.handleChange} />
      </ImageDropArea>
    )
  }

  private handleDragEnter = (event: React.DragEvent) => {
    this.setState({isDropZoneActive: true})
    event.preventDefault()
  }

  private handleDragExit = (event: React.DragEvent) => {
    this.setState({isDropZoneActive: false})
    event.preventDefault()
  }

  private handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()

    this.upload(event.dataTransfer.files)
  }

  private upload = async (files: FileList) => {
    const {handleUpload} = this.config

    if (files && files[0]) {
      const reader = new FileReader()

      reader.onload = (event: any) => {
        this.setState({previewUrl: event.target && event.target.result})
      }

      reader.readAsDataURL(files[0])
    }

    if (typeof handleUpload === 'function' && files) {
      this.setState({uploadProgress: 0})

      const url = await handleUpload(files[0], {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)

          this.setState({uploadProgress})
        },
      })

      this.props.entity.updateData(url)
    }
  }

  private handleChange = async (e: any) => {
    const {files} = e.currentTarget

    this.upload(files)
  }

  get isProgressBarHidden() {
    return this.state.uploadProgress === 0 || this.state.uploadProgress === 100
  }
}

const ImageBlockRenderer = ({data}: any) => data ? (
  <ImageRender src={data} alt=""/>
) : null

export const Image = (api?: EditorApi, config?: any): Block => ({
  id: 'image',
  label: 'Image',
  title: 'Add image from disc',
  data: '',
  isLeaf: true,
  config,
  component: ImageBlock,
  renderer: ImageBlockRenderer,
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
