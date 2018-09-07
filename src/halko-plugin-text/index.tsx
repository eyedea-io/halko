import * as React from 'react'
import { EditorApi, Block, Entity } from 'halko'
import { TextArea } from './styled'
import * as autosize from 'autosize'

const KEY_CODES = {
  backspace: 8,
  delete: 46,
  up: 38,
  down: 40,
}

class TextBlock extends React.Component<{
  entity: Entity
}> {
  componentDidMount() {
    autosize(this.props.entity.ref.current as Element)
  }

  render() {
    const {entity} = this.props

    return (
      <TextArea
        placeholder="Type here..."
        value={entity.data}
        autoFocus={true}
        rows={1}
        innerRef={entity.ref}
        onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
          entity.updateData(e.currentTarget.value)
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          const {prev, next} = entity.getSiblings()

          // Remove current node if it's empty and backspace was pressed
          if (e.keyCode === KEY_CODES.backspace &&  e.currentTarget.value === '') {
            if (prev) { prev.focus() }
            entity.remove()
            e.preventDefault()
          }
          if (e.keyCode === KEY_CODES.down && e.currentTarget.value === '') {
            if (next) { next.focus() }
            e.preventDefault()
          }
          if (e.keyCode === KEY_CODES.up && e.currentTarget.value === '') {
            if (prev) { prev.focus() }
            e.preventDefault()
          }
        }}
        onKeyUp={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          const {next} = entity.getSiblings()

          // Remove next node on delete
          if (e.keyCode === KEY_CODES.delete && next && next.isLeaf) {
            if (next) { next.focus() }
            next.remove()
            e.preventDefault()
          }
        }}
      />
    )
  }
}

const TextBlockRenderer = ({data}) => (
  <p>{data}</p>
)

export const HalkoTextBlock = (api: EditorApi): Block => ({
  id: 'text',
  label: 'text',
  title: 'Add rich text block',
  isLeaf: false,
  data: '',
  component: TextBlock,
  renderer: TextBlockRenderer
})
