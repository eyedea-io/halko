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

  private createEntity = (block: Block) => {
    const entity = new Entity(this.api, {block})

    this.setState((state: State) => ({
      entities: state.entities.concat([entity])
    }))

    return entity
  }

  private updateEntity = (entity: Entity) => {
    this.setState({
      entities: this.state.entities.map(item => item.id === entity.id ? entity : item)
    })

    return entity
  }

  private removeEntity = (entity: Entity) => {
    this.setState({
      entities: this.state.entities.filter(item => item.id !== entity.id)
    })
  }

  private getEntities = () => {
    return this.state.entities
  }

  private get api(): EditorApi {
    return {
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
