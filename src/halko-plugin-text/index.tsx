import * as React from 'react'
import { EditorApi, Block, Entity } from 'halko'
import { EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import { EditorWrapper } from './styled'
import { Parser as HtmlToReactParser } from 'html-to-react'
import './toolbar.css'

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

  constructor(props: Props) {
    super(props)
    this.inlineToolbarPlugin = createInlineToolbarPlugin()
  }

  handleChange = (editorState: EditorState) => {
    this.setState({editorState})

    const html = stateToHTML(editorState.getCurrentContent())
    const selection = editorState.getSelection()
    const showTooltip = selection.getAnchorOffset() === selection.getFocusOffset()

    this.props.entity.setTooltipVisibility(showTooltip)
    this.props.entity.updateData(html)
  }

  render() {
    return (
      <EditorWrapper>
        <Editor
          editorState={this.state.editorState}
          onChange={this.handleChange}
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
const TextBlockRenderer = ({data}) => htmlToReactParser.parse(data) || null

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
