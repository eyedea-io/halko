import * as React from 'react'
import { EditorPlugin } from './plugin'
import { Toolbar } from './toolbar'
import { Layout } from './styled'
import { EntityList } from './entity-list'
import { Entity } from './entity'
import { EditorApi } from './api'
import { Block } from './block'

export {Block, Entity, EditorApi}

interface Props {
  plugins: EditorPlugin[]
  onInit: (api: EditorApi) => void
  onChange: (api: EditorApi) => void
}

interface State {
  entities: Entity[]
}

export class Editor extends React.Component<Props, State> {
  state: State = {
    entities: []
  }

  componentDidMount() {
    if (this.props.onInit) {
      this.props.onInit(this.api)
    }
  }

  render() {
    return (
      <Layout>
        <EntityList entities={this.state.entities} />
        <Toolbar blocks={this.blocks} createEntity={this.createEntity} />
      </Layout>
    )
  }

  private triggerOnChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.api)
    }
  }

  private createEntity = (block: Block) => {
    const entity = new Entity(this.api, {block})
    const changeState = (state: State) => ({
      entities: state.entities.concat([entity])
    })

    this.setState(changeState, this.triggerOnChange)

    return entity
  }

  private updateEntity = (entity: Entity) => {
    const state = {
      entities: this.state.entities.map(item => item.id === entity.id ? entity : item)
    }

    this.setState(state, this.triggerOnChange)

    return entity
  }

  private removeEntity = (entity: Entity) => {
    const state = {
      entities: this.state.entities.filter(item => item.id !== entity.id)
    }

    this.setState(state, this.triggerOnChange)
  }

  private getEntities = () => {
    return this.state.entities
  }

  private getContent = () => {
    return this.state.entities.map(item => ({
      block: item.block.id,
      data: item.data
    }))
  }

  private get api(): EditorApi {
    return {
      getContent: this.getContent,
      getEntities: this.getEntities,
      createEntity: this.createEntity,
      removeEntity: this.removeEntity,
      updateEntity: this.updateEntity
    }
  }

  private get blocks() {
    return this.props.plugins.map(plugin => plugin(this.api))
  }
}
