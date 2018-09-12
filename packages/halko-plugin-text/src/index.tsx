import * as React from 'react'
import { EditorApi, Block, Entity } from '@halko/editor'
import { EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import { EditorWrapper } from './styled'
const Editor = require('draft-js-plugins-editor').default
const createInlineToolbarPlugin = require('draft-js-inline-toolbar-plugin').default
const HtmlToReactParser = require('html-to-react').Parser

interface Props {
  entity: Entity
}

class TextBlock extends React.Component<Props> {
  state = {
    editorState: EditorState.createWithContent(
      stateFromHTML(this.props.entity.data)
    ),
  }
  inlineToolbarPlugin: any
  editor: React.RefObject<HTMLInputElement>

  constructor(props: Props) {
    super(props)
    this.editor = React.createRef();
    this.inlineToolbarPlugin = createInlineToolbarPlugin()
  }

  componentDidMount() {
    if (this.editor.current !== null) {
      this.editor.current.focus()
    }
  }

  handleChange = (editorState: EditorState) => {
    this.setState({editorState})

    const html = stateToHTML(editorState.getCurrentContent())
    const selection = editorState.getSelection()
    const showTooltip = selection.getAnchorOffset() === selection.getFocusOffset()

    this.props.entity.setTooltipVisibility(showTooltip)
    this.props.entity.updateData(html)
  }

  showTooltip = () => {
    this.props.entity.setTooltipVisibility(true)
  }

  render() {
    return (
      <EditorWrapper>
        <Editor
          ref={this.editor}
          editorState={this.state.editorState}
          onChange={this.handleChange}
          onBlur={this.showTooltip}
          plugins={[this.inlineToolbarPlugin]}
        />

        {this.inlineToolbarPlugin && (
          <this.inlineToolbarPlugin.InlineToolbar />
        )}
      </EditorWrapper>
    )
  }
}

const htmlToReactParser = new HtmlToReactParser()
const TextBlockRenderer = ({data}: any) => htmlToReactParser.parse(data) || null

export const HalkoTextBlock = (api: EditorApi, config?: any): Block => ({
  id: 'text',
  label: 'text',
  title: 'Add rich text block',
  isLeaf: false,
  data: '',
  config,
  component: TextBlock,
  renderer: TextBlockRenderer
})
